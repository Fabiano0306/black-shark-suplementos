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

  // 🔧 URL automática (detecta ambiente)
  const API_URL =
    import.meta.env.MODE === 'production'
      ? 'https://black-shark-frete.onrender.com' // altere quando subir o server
      : 'http://localhost:3000';

  const handleCalcularFrete = async () => {
    if (!cep || cep.length < 8) {
      toast.error('Digite um CEP válido!');
      return;
    }

    setLoadingFrete(true);
    try {
      const res = await fetch(`${API_URL}/calcular-frete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cepDestino: cep }),
      });

      if (!res.ok) throw new Error('Erro ao calcular frete');
      const data = await res.json();

      if (data && Array.isArray(data) && data.length > 0) {
        const sedex = data.find((s) => s.Codigo === '04014');
        const pac = data.find((s) => s.Codigo === '04510');

        const valorSedex = parseFloat((sedex?.Valor || '9999').replace(',', '.'));
        const valorPac = parseFloat((pac?.Valor || '9999').replace(',', '.'));

        const melhor = valorSedex < valorPac ? sedex : pac;

        setFrete({
          servico: melhor?.Codigo === '04014' ? 'SEDEX' : 'PAC',
          valor: melhor?.Valor || '0,00',
          prazo: melhor?.PrazoEntrega || '—',
        });
        toast.success('Frete calculado com sucesso!');
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

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) {
      toast.error('Seu carrinho está vazio!');
      return;
    }

    if (!customerName.trim()) {
      toast.error('Por favor, digite seu nome completo');
      return;
    }

    let message = '🦈 *Novo Pedido — BLACK SHARK SUPLEMENTOS*\n\n📦 *Itens:*\n';

    cart.forEach((item) => {
      message += `• ${item.name} — ${item.quantity}x R$ ${item.price.toFixed(2)}\n`;
    });

    message += `\n💰 *Subtotal:* R$ ${totalPrice.toFixed(2)}\n`;

    if (deliveryType === 'entrega' && frete) {
      message += `🚚 *Frete (${frete.servico}):* R$ ${frete.valor}\n`;
      const totalComFrete =
        parseFloat(totalPrice.toFixed(2)) + parseFloat(frete.valor.replace(',', '.'));
      message += `💵 *Total com frete:* R$ ${totalComFrete.toFixed(2)}\n`;
    }

    message += `\n🏁 *Entrega:* ${deliveryType === 'retirada' ? 'Retirada na loja' : 'Entrega'}\n`;
    message += `💳 *Pagamento:* ${
      paymentMethod === 'pix' ? 'PIX' : paymentMethod === 'debito' ? 'Débito' : 'Crédito'
    }\n`;
    message += `👤 *Cliente:* ${customerName}\n`;
    if (cep) message += `📍 *CEP:* ${cep}\n`;
    message += '\nEnviado via site oficial Black Shark.';

    const phoneNumber = '5547991906158';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
    toast.success('Redirecionando para WhatsApp...');
  };

  if (cart.length === 0) {
    return (
      <section id="carrinho" className="py-20 bg-shark-gray-dark">
        <div className="container mx-auto px-4 text-center">
          <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-shark-gray-light" />
          <h2 className="section-title mb-6">SEU CARRINHO</h2>
          <p className="text-shark-gray-light text-lg mb-8">
            Seu carrinho está vazio. Adicione produtos para continuar!
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('produtos');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-shark"
          >
            Ver Produtos
          </button>
        </div>
      </section>
    );
  }

  const valorFrete = frete ? parseFloat(frete.valor.replace(',', '.')) : 0;
  const totalFinal =
    deliveryType === 'entrega' && frete
      ? (totalPrice + valorFrete).toFixed(2)
      : totalPrice.toFixed(2);

  return (
    <section id="carrinho" className="py-20 bg-shark-gray-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-center mb-12">SEU CARRINHO</h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Itens do Carrinho */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="product-card p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                >
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-shark-white mb-1 line-clamp-2">{item.name}</h3>
                    <p className="text-shark-gray-light text-sm">R$ {item.price.toFixed(2)} cada</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-shark-gray hover:bg-shark-gray-light rounded transition-colors"
                    >
                      <Minus className="w-4 h-4 text-shark-white" />
                    </button>
                    <span className="text-shark-white font-bold w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-shark-gray hover:bg-shark-gray-light rounded transition-colors"
                    >
                      <Plus className="w-4 h-4 text-shark-white" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 w-8 h-8 flex items-center justify-center bg-destructive hover:bg-destructive/80 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-shark-white" />
                    </button>
                  </div>

                  <div className="text-right sm:ml-4">
                    <p className="text-sm text-shark-gray-light">Subtotal</p>
                    <p className="text-xl font-bold text-shark-white">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              <button onClick={clearCart} className="btn-shark-outline w-full">
                Limpar Carrinho
              </button>
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <div className="product-card p-6 sticky top-24">
                <h3 className="text-xl font-bold text-shark-white mb-6">Resumo do Pedido</h3>

                <div className="space-y-4 mb-6">
                  {/* Nome */}
                  <div>
                    <label className="block text-shark-gray-light text-sm mb-2">
                      Seu Nome Completo
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Digite seu nome"
                      className="w-full px-4 py-2 bg-shark-gray-dark border border-shark-gray rounded-lg text-shark-white placeholder:text-shark-gray-light focus:outline-none focus:border-shark-white transition-colors"
                    />
                  </div>

                  {/* Tipo de Entrega */}
                  <div>
                    <label className="block text-shark-gray-light text-sm mb-2">
                      Tipo de Entrega
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryType === 'retirada'}
                          onChange={() => setDeliveryType('retirada')}
                          className="w-4 h-4"
                        />
                        <span className="text-shark-white">Retirada na loja</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryType === 'entrega'}
                          onChange={() => setDeliveryType('entrega')}
                          className="w-4 h-4"
                        />
                        <span className="text-shark-white">Entrega</span>
                      </label>
                    </div>
                  </div>

                  {/* Campo de CEP e Frete */}
                  {deliveryType === 'entrega' && (
                    <div className="animate-fade-in">
                      <label className="block text-shark-gray-light text-sm mb-2">
                        CEP para entrega
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={cep}
                          onChange={(e) => setCep(e.target.value)}
                          placeholder="Digite seu CEP"
                          className="flex-1 px-4 py-2 bg-shark-gray-dark border border-shark-gray rounded-lg text-shark-white placeholder:text-shark-gray-light focus:outline-none focus:border-shark-white transition-colors"
                        />
                        <button
                          onClick={handleCalcularFrete}
                          disabled={loadingFrete}
                          className="btn-shark px-4 py-2"
                        >
                          {loadingFrete ? 'Calculando...' : 'Calcular'}
                        </button>
                      </div>

                      {frete && (
                        <div className="mt-3 text-shark-gray-light text-sm">
                          <p>
                            🚚 <strong>{frete.servico}</strong>: R$ {frete.valor} —{' '}
                            {frete.prazo} dias úteis
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Pagamento */}
                  <div>
                    <label className="block text-shark-gray-light text-sm mb-2">
                      Forma de Pagamento
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'pix'}
                          onChange={() => setPaymentMethod('pix')}
                          className="w-4 h-4"
                        />
                        <span className="text-shark-white">PIX</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'debito'}
                          onChange={() => setPaymentMethod('debito')}
                          className="w-4 h-4"
                        />
                        <span className="text-shark-white">Débito</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'credito'}
                          onChange={() => setPaymentMethod('credito')}
                          className="w-4 h-4"
                        />
                        <span className="text-shark-white">Crédito</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Totais */}
                <div className="border-t border-shark-gray pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-shark-gray-light">Subtotal</span>
                    <span className="text-shark-white">R$ {totalPrice.toFixed(2)}</span>
                  </div>

                  {deliveryType === 'entrega' && frete && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-shark-gray-light">Frete</span>
                      <span className="text-shark-white">R$ {frete.valor}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-shark-white">Total</span>
                    <span className="text-shark-white">R$ {totalFinal}</span>
                  </div>
                </div>

                <button onClick={handleWhatsAppOrder} className="btn-shark w-full text-lg py-4">
                  Finalizar via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
