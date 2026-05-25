const COINGECKO_MARKETS_URL = 'https://api.coingecko.com/api/v3/coins/markets'

export const fetchCryptoMarkets = async () => {
  const params = new URLSearchParams({
    vs_currency: 'gbp',
    order: 'market_cap_desc',
    per_page: '100',
    page: '1',
    sparkline: 'true',
    price_change_percentage: '24h',
  })

  const response = await fetch(`${COINGECKO_MARKETS_URL}?${params.toString()}`, {
    headers: {
      accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`CoinGecko request failed with status ${response.status}`)
  }

  return response.json()
}
