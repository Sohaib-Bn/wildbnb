export async function getConvertedCurrency(to) {
  const apiKey = "15685204f9aa84577958faa9";

  if (to === "USD") return 1;

  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/${to}`
  );

  if (!res.ok) {
    throw new Error("There was an error while converting currencie");
  }

  const data = await res.json();

  return data["conversion_rate"];
}
