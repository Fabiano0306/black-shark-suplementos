export async function calcularFrete(cepDestino: string) {
  const res = await fetch("http://localhost:3000/calcular-frete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cepDestino }),
  });

  if (!res.ok) throw new Error("Erro ao calcular frete");

  const data = await res.json();
  return data;
}
