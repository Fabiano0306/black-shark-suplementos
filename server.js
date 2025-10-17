import express from "express";
import cors from "cors";
import { calcularPrecoPrazo } from "correios-brasil";

const app = express();
app.use(express.json());
app.use(cors());

// ✅ ROTA DE FRETE
app.post("/calcular-frete", async (req, res) => {
  const { cepDestino } = req.body;

  if (!cepDestino) {
    return res.status(400).json({ erro: "CEP de destino obrigatório!" });
  }

  const args = {
    sCepOrigem: "12071350", // CEP da loja (sem hífen)
    sCepDestino: cepDestino,
    nVlPeso: "1",
    nCdFormato: "1",
    nVlComprimento: "20",
    nVlAltura: "10",
    nVlLargura: "15",
    // ✅ Correção principal — precisa ser string, não array
    nCdServico: "04014,04510", // SEDEX e PAC
    nVlDiametro: "0",
  };

  try {
    console.log("📦 Calculando frete com:", args);
    const resultado = await calcularPrecoPrazo(args);
    console.log("✅ Resultado Correios:", resultado);
    return res.json(resultado);
  } catch (error) {
    console.error("❌ Erro no cálculo de frete:", error);
    return res.status(500).json({
      erro: "Erro ao calcular frete",
      detalhes: error.message || error,
    });
  }
});

// 🚀 Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server rodando em http://localhost:${PORT}`);
});
