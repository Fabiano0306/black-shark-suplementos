import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { toast } from 'sonner';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [deliveryType, setDeliveryType] = useState<'retirada' | 'entrega'>('retirada');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'debito' | 'credito'>('pix');
  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState<{ servico: string; valor: string; prazo: string } | null>(null);
  const [loadingFrete, setLoadingFrete] = useState(false);
  const [endereco, setEndereco] = useState<{ logradouro: string; bairro: string; localidade: string; uf: string } | null>(null);
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [editandoEndereco, setEditandoEndereco] = useState(false);

  const API_URL =
    import.meta.env.MODE === 'production'
      ? 'https://black-shark-frete.onrender.com'
      : 'http://localhost:3000';

  const handleCartChange = () => {
    if (frete) {
      setFrete(null);
      setEndereco(null);
      setNumero('');
      setComplemento('');
      toast.info('Como você alterou o carrinho, é necessário recalcular o frete.');
    }
  };

  const handleCepChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const masked = cleaned.replace(/^(\d{5})(\d{0,3})$/, (_, p1, p2) =>
      p2 ? `${p1}-${p2}` : p1
    );
    setCep(masked);
  };

  const buscarEndereco = async (cep: string) => {
    try {
      const apenasNumeros = cep.replace(/\D/g, '');
      const res = await fetch(`https://viacep.com.br/ws/${apenasNumeros}/json/`);
      const data = await res.json();
      if (data.erro) {
        toast.error('CEP não encontrado.');
        setEndereco(null);
      } else {
        setEndereco({
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
        });
      }
    } catch {
      toast.error('Erro ao buscar endereço.');
      setEndereco(null);
    }
  };

  const handleCalcularFrete = async () => {
    const apenasNumeros = cep.replace(/\D/g, '');
    if (!apenasNumeros || apenasNumeros.length !== 8) {
      toast.error('Digite um CEP válido (formato XXXXX-XXX).');
      return;
    }

    if (cart.length === 0) {
      toast.error('Carrinho vazio!');
      return;
    }

    setLoadingFrete(true);
    try {
      const res = await fetch(`${API_URL}/calcular-frete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cepDestino: apenasNumeros,
          produtos: cart.map((item) => ({
            id: item.id,
            nome: item.name,
            quantidade: item.quantity,
            peso: item.weight || 0.5,
            largura: item.width || 15,
            altura: item.height || 10,
            comprimento: item.length || 20,
            valor: item.price,
          })),
        }),
      });

      if (!res.ok) throw new Error('Erro ao calcular frete');
      const data = await res.json();
      const fretes = data.fretes;

      if (Array.isArray(fretes) && fretes.length > 0) {
        const fretesValidos = fretes.filter((f) => f.valor && !f.erro);

        if (fretesValidos.length === 0) {
          toast.error('Nenhum serviço de frete disponível para este CEP.');
          return;
        }

        const melhor = fretesValidos.reduce((menor, atual) => {
          const valorMenor = parseFloat(menor.valor.replace(/[R$\s]/g, '').replace(',', '.'));
          const valorAtual = parseFloat(atual.valor.replace(/[R$\s]/g, '').replace(',', '.'));
          return valorAtual < valorMenor ? atual : menor;
        });

        setFrete({
          servico: melhor.servico,
          valor: melhor.valor.replace('R$ ', ''),
          prazo: melhor.prazo,
        });

        toast.success(`Frete ${melhor.servico}: ${melhor.valor} — ${melhor.prazo}`);
        await buscarEndereco(apenasNumeros);
      } else {
        toast.error('Não foi possível calcular o frete.');
      }
    } catch (error) {
      console.error('Erro ao calcular frete:', error);
      toast.error('Erro ao calcular o frete.');
    } finally {
      setLoadingFrete(false);
    }
  };

  const handleSalvarEndereco = () => {
    if (!endereco?.logradouro.trim() || !endereco.localidade.trim()) {
      toast.error('Preencha corretamente o endereço.');
      return;
    }
    setEditandoEndereco(false);
    toast.success('Endereço atualizado com sucesso!');
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return toast.error('Seu carrinho está vazio!');
    if (!customerName.trim()) return toast.error('Por favor, digite seu nome completo');

    if (deliveryType === 'entrega') {
      const apenasNumeros = cep.replace(/\D/g, '');
      if (!apenasNumeros || apenasNumeros.length !== 8)
        return toast.error('Informe um CEP válido.');
      if (!frete) return toast.error('Calcule o frete antes de finalizar.');
      if (!numero.trim()) return toast.error('Informe o número da residência.');
      if (!endereco) return toast.error('Endereço incompleto. Calcule o frete novamente.');
    }

    let msg = '🦈 *Novo Pedido — BLACK SHARK SUPLEMENTOS*\n\n📦 *Itens:*\n';
    cart.forEach((i) => (msg += `• ${i.name} — ${i.quantity}x R$ ${i.price.toFixed(2)}\n`));

    msg += `\n💰 *Subtotal:* R$ ${totalPrice.toFixed(2)}\n`;
    if (deliveryType === 'entrega' && frete) {
      msg += `🚚 *Frete (${frete.servico}):* R$ ${frete.valor}\n`;
      const total = parseFloat(totalPrice.toFixed(2)) + parseFloat(frete.valor.replace(',', '.'));
      msg += `💵 *Total com frete:* R$ ${total.toFixed(2)}\n`;
    }

    if (endereco) {
      msg += `\n📍 *Endereço:* ${endereco.logradouro}, ${numero || 's/n'} - ${endereco.bairro}, ${endereco.localidade}-${endereco.uf}\n`;
      if (complemento) msg += `🏢 *Complemento:* ${complemento}\n`;
    }

    msg += `\n🏁 *Entrega:* ${deliveryType === 'retirada' ? 'Retirada na loja' : 'Entrega'}\n`;
    msg += `💳 *Pagamento:* ${paymentMethod === 'pix' ? 'PIX' : paymentMethod === 'debito' ? 'Débito' : 'Crédito'}\n`;
    msg += `👤 *Cliente:* ${customerName}\n`;
    if (cep) msg += `📮 *CEP:* ${cep}\n`;
    msg += '\nEnviado via site oficial Black Shark Suplementos.';

    window.open(`https://wa.me/5547991906158?text=${encodeURIComponent(msg)}`, '_blank');
    toast.success('Redirecionando para WhatsApp...');
  };

  if (cart.length === 0)
    return (
      <section id="carrinho" className="py-20 bg-shark-gray-dark text-center">
        <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-shark-gray-light" />
        <h2 className="section-title mb-6">SEU CARRINHO</h2>
        <p className="text-shark-gray-light text-lg mb-8">
          Seu carrinho está vazio. Adicione produtos para continuar!
        </p>
      </section>
    );

  const valorFrete = frete ? parseFloat(frete.valor.replace(',', '.')) : 0;
  const totalFinal =
    deliveryType === 'entrega' && frete
      ? (totalPrice + valorFrete).toFixed(2)
      : totalPrice.toFixed(2);

  return (
    <section id="carrinho" className="py-20 bg-shark-gray-dark">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="section-title text-center mb-12">SEU CARRINHO</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Itens */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="product-card p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full overflow-hidden"
              >
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
                <div className="flex-1">
                  <h3 className="font-bold text-shark-white mb-1">{item.name}</h3>
                  <p className="text-shark-gray-light text-sm">R$ {item.price.toFixed(2)} cada</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      updateQuantity(item.id, -1);
                      handleCartChange();
                    }}
                    className="w-8 h-8 flex items-center justify-center bg-shark-gray hover:bg-shark-gray-light rounded transition-colors"
                  >
                    <Minus className="w-4 h-4 text-shark-white" />
                  </button>
                  <span className="text-shark-white font-bold w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => {
                      updateQuantity(item.id, 1);
                      handleCartChange();
                    }}
                    className="w-8 h-8 flex items-center justify-center bg-shark-gray hover:bg-shark-gray-light rounded transition-colors"
                  >
                    <Plus className="w-4 h-4 text-shark-white" />
                  </button>
                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      handleCartChange();
                    }}
                    className="w-8 h-8 flex items-center justify-center bg-destructive hover:bg-destructive/80 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-shark-white" />
                  </button>
                </div>
              </div>
            ))}
            <button onClick={clearCart} className="btn-shark-outline w-full">
              Limpar Carrinho
            </button>
          </div>

          {/* Resumo */}
            <div className="lg:col-span-1">
            <div
              className="product-card p-6 transform-none hover:scale-100 active:scale-100 focus:scale-100"
              style={{ transform: 'none' }}
            >
              <h3 className="text-xl font-bold text-shark-white mb-6">Resumo do Pedido</h3>

              <input
                type="text"
                placeholder="Seu nome completo"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2 mb-4 bg-shark-gray-dark border border-shark-gray rounded-lg text-shark-white placeholder:text-shark-gray-light focus:outline-none focus:border-shark-white transition-colors"
              />

              {/* Entrega */}
              <div className="mb-6">
                <label className="block text-sm text-shark-gray-light mb-2">Tipo de entrega</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      checked={deliveryType === 'retirada'}
                      onChange={() => setDeliveryType('retirada')}
                      className="w-4 h-4"
                    />
                    <span className="text-shark-white">Retirada na loja</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      checked={deliveryType === 'entrega'}
                      onChange={() => setDeliveryType('entrega')}
                      className="w-4 h-4"
                    />
                    <span className="text-shark-white">Entrega</span>
                  </label>
                </div>
              </div>

              {/* CEP */}
{deliveryType === 'entrega' && (
  <>
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-3">
      <input
        type="text"
        value={cep}
        onChange={(e) => handleCepChange(e.target.value)}
        placeholder="Digite seu CEP"
        className="w-full sm:flex-1 h-12 px-4 bg-shark-gray-dark border border-shark-gray rounded-lg text-shark-white placeholder:text-shark-gray-light focus:outline-none focus:border-shark-white transition-colors"
        maxLength={9}
      />
      <button
        onClick={handleCalcularFrete}
        disabled={loadingFrete}
        className={`w-full sm:w-auto h-12 mt-2 sm:mt-0 px-6 rounded-lg flex items-center justify-center font-semibold transition-colors ${
          loadingFrete
            ? 'bg-gray-600 text-gray-300'
            : 'bg-[#e50914] hover:bg-[#b40810] text-white'
        }`}
      >
        {loadingFrete ? '...' : 'Calcular'}
      </button>
    </div>

    {frete && (
      <p className="text-sm text-shark-gray-light mb-2">
        🚚 <strong>{frete.servico}</strong>: R$ {frete.valor} — {frete.prazo}
      </p>
    )}

    {endereco && (
      <div className="bg-shark-gray-dark border border-shark-gray p-3 rounded-lg text-sm text-shark-gray-light mt-2 space-y-2">
        {!editandoEndereco ? (
          <>
            <div className="text-sm text-shark-gray-light break-words">
              <p>📍 {endereco.logradouro}, {endereco.bairro}</p>
              <p>{endereco.localidade}/{endereco.uf}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <input
                type="text"
                placeholder="Número"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="w-full sm:w-[35%] h-10 px-3 bg-shark-gray-dark border border-shark-gray rounded-lg text-shark-white placeholder:text-shark-gray-light focus:outline-none focus:border-shark-white transition-colors"
              />
              <input
                type="text"
                placeholder="Complemento"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
                className="w-full sm:flex-1 h-10 px-3 bg-shark-gray-dark border border-shark-gray rounded-lg text-shark-white placeholder:text-shark-gray-light focus:outline-none focus:border-shark-white transition-colors"
              />
            </div>

            <button
              onClick={() => setEditandoEndereco(true)}
              className="text-white text-sm mt-2"
            >
              📍 Corrigir Endereço
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={endereco.logradouro}
              onChange={(e) =>
                setEndereco((prev) => ({ ...prev, logradouro: e.target.value }))
              }
              className="w-full px-4 py-2 bg-shark-gray-dark border border-shark-gray rounded-lg text-shark-white"
              placeholder="Rua / Logradouro"
            />
            <input
              type="text"
              value={endereco.bairro}
              onChange={(e) =>
                setEndereco((prev) => ({ ...prev, bairro: e.target.value }))
              }
              className="w-full px-4 py-2 bg-shark-gray-dark border border-shark-gray rounded-lg text-shark-white"
              placeholder="Bairro"
            />
            <div className="flex flex-col">
              <input
                type="text"
                value={endereco.localidade}
                onChange={(e) =>
                  setEndereco((prev) => ({ ...prev, localidade: e.target.value }))
                }
                className="px-4 py-2 bg-shark-gray-dark border border-shark-gray rounded-lg text-shark-white"
                placeholder="Cidade"
              />
              <input
                type="text"
                value={endereco.uf}
                onChange={(e) =>
                  setEndereco((prev) => ({ ...prev, uf: e.target.value }))
                }
                className="w-16 mt-2 px-4 py-2 bg-shark-gray-dark border border-shark-gray rounded-lg text-shark-white"
                placeholder="UF"
              />
            </div>
            <button onClick={handleSalvarEndereco} className="btn-shark w-full mt-2">
              Salvar Endereço
            </button>
          </>
        )}
      </div>
    )}
  </>
)}




              {/* Pagamento */}
              <div className="mt-6">
                <label className="block text-sm text-shark-gray-light mb-2">Forma de pagamento</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full px-4 py-2 bg-shark-gray-dark border border-shark-gray rounded-lg text-shark-white focus:outline-none focus:border-shark-white transition-colors"
                >
                  <option value="pix">PIX</option>
                  <option value="debito">Cartão Débito</option>
                  <option value="credito">Cartão Crédito</option>
                </select>
              </div>

              {/* Totais */}
              <div className="mt-6 text-shark-white">
                <p className="flex justify-between mb-1">
                  <span>Subtotal:</span> <span>R$ {totalPrice.toFixed(2)}</span>
                </p>
                {frete && (
                  <p className="flex justify-between mb-1 text-shark-gray-light">
                    <span>Frete:</span> <span>R$ {frete.valor}</span>
                  </p>
                )}
                <p className="flex justify-between text-lg font-bold mt-2">
                  <span>Total:</span> <span>R$ {totalFinal}</span>
                </p>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                className="btn-shark w-full mt-6"
              >
                Finalizar Pedido no WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
