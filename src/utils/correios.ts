export async function calcularFrete(cepDestino: string, produtos: any[]) {
  const produtosFormatados = produtos.map((p) => ({
    id: p.id,
    valor: p.price,
    peso: p.weight,
    largura: p.width,
    altura: p.height,
    comprimento: p.length,
    quantidade: p.quantity || 1,
  }));

  const res = await fetch("http://localhost:3000/calcular-frete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cepDestino,
      produtos: produtosFormatados,
    }),
  });

  if (!res.ok) throw new Error("Erro ao calcular frete");

  const data = await res.json();
  return data;
}
