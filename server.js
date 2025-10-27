// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

// 🔐 Carrega variáveis do .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ⚙️ Configurações vindas do .env
const TOKEN = process.env.MELHOR_ENVIO_TOKEN;
const CEP_ORIGEM = process.env.CEP_ORIGEM || '89140000';
const URL = 'https://www.melhorenvio.com.br/api/v2/me/shipment/calculate';

// 🧮 Função auxiliar para consolidar produtos em um único pacote
function calcularPacote(produtos) {
  // Soma o peso total (em kg)
  const pesoTotal = produtos.reduce(
    (total, p) =>
      total +
      (p.peso || p.weight || 0.5) * (p.quantidade || p.quantity || 1),
    0
  );

  // Calcula o volume total em cm³ (largura × altura × comprimento × quantidade)
  const volumeTotal = produtos.reduce(
    (total, p) =>
      total +
      ((p.largura || p.width || 15) *
        (p.altura || p.height || 10) *
        (p.comprimento || p.length || 20) *
        (p.quantidade || p.quantity || 1)),
    0
  );

  // Converte volume total em um cubo equivalente (para simular o pacote)
  const lado = Math.cbrt(volumeTotal);

  // Define dimensões mínimas exigidas pelo Melhor Envio
  const largura = Math.max(11, Math.round(lado));
  const altura = Math.max(2, Math.round(lado));
  const comprimento = Math.max(16, Math.round(lado));

  return {
    peso: parseFloat(pesoTotal.toFixed(2)),
    largura,
    altura,
    comprimento,
  };
}


// 🚚 Endpoint de cálculo de frete
app.post('/calcular-frete', async (req, res) => {
  try {
    const { cepDestino, produtos } = req.body;

    if (!cepDestino || !Array.isArray(produtos) || produtos.length === 0) {
      return res.status(400).json({ error: 'CEP e produtos são obrigatórios' });
    }

    // Consolida todos os produtos do carrinho
    const pacote = calcularPacote(produtos);

    const body = {
  from: { postal_code: CEP_ORIGEM },
  to: { postal_code: cepDestino },
  products: produtos.map((p) => ({
    id: p.id || 'produto',
    width: p.largura || p.width || 15,
    height: p.altura || p.height || 10,
    length: p.comprimento || p.length || 20,
    weight: p.peso || p.weight || 0.5,
    quantity: p.quantidade || p.quantity || 1,
    insurance_value: p.valor || p.price || 0,
    format: 1,
  })),
  options: {
    receipt: false,
    own_hand: false,
  },
  services: '1,2,3,4,9', // PAC, SEDEX, Jadlog, Azul Cargo, etc.
}; 

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error('❌ Erro na resposta da API:', data);
      return res.status(400).json({ error: 'Resposta inválida do Melhor Envio', data });
    }

    console.log('📦 Dados retornados da API Melhor Envio:', JSON.stringify(data, null, 2));

    // Mapeia os resultados para o frontend
    const fretes = data.map((item) => ({
      servico: item.name,
      valor: `R$ ${parseFloat(item.price).toFixed(2).replace('.', ',')}`,
      prazo: `${item.delivery_time} dias úteis`,
      empresa: item.company?.name || 'Transportadora',
    }));

    return res.json({ fretes });
  } catch (error) {
    console.error('❌ Erro ao calcular frete:', error);
    res.status(500).json({ error: 'Erro interno no cálculo de frete' });
  }
});

// 🚀 Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server rodando em http://localhost:${PORT}`));