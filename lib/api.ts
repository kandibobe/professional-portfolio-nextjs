export async function fetchCryptoPrices() {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd", {
      next: { revalidate: 30 } // Cache for 30 seconds
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    return null;
  }
}
