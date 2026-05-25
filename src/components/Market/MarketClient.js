'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import CryptoChart from './CryptoChart'
import CryptoTable from './CryptoTable'
import SearchBar from './SearchBar'
import { fetchCryptoMarkets } from '../../lib/cryptoApi'
import styles from './Market.module.css'

const DEFAULT_SORT = {
  field: 'market_cap',
  direction: 'desc',
}

const sortableFields = new Set(['current_price', 'price_change_percentage_24h', 'market_cap', 'total_volume'])

const pageVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
}

const panelVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
  },
}

const MarketClient = () => {
  const [coins, setCoins] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [sort, setSort] = useState(DEFAULT_SORT)
  const shouldReduceMotion = useReducedMotion()

  const loadMarkets = useCallback(async () => {
    setError('')
    setIsLoading(true)

    try {
      const marketData = await fetchCryptoMarkets()
      setCoins(marketData)

      // Keep the selected chart stable after refresh if that coin still exists.
      setSelectedCoin((current) => {
        if (!current) {
          return marketData[0] ?? null
        }

        return marketData.find((coin) => coin.id === current.id) ?? marketData[0] ?? null
      })
    } catch (requestError) {
      setError(requestError.message || 'Unable to load market data.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMarkets()
  }, [loadMarkets])

  const filteredCoins = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    const filtered = normalizedQuery
      ? coins.filter((coin) => {
          return coin.name.toLowerCase().includes(normalizedQuery) || coin.symbol.toLowerCase().includes(normalizedQuery)
        })
      : coins

    if (!sortableFields.has(sort.field)) {
      return filtered
    }

    return [...filtered].sort((firstCoin, secondCoin) => {
      const firstValue = firstCoin[sort.field] ?? 0
      const secondValue = secondCoin[sort.field] ?? 0
      const direction = sort.direction === 'asc' ? 1 : -1

      return (firstValue - secondValue) * direction
    })
  }, [coins, query, sort])

  const handleSort = (field) => {
    setSort((current) => {
      if (current.field === field) {
        return {
          field,
          direction: current.direction === 'asc' ? 'desc' : 'asc',
        }
      }

      return {
        field,
        direction: 'desc',
      }
    })
  }

  return (
    <motion.section
      className={styles.marketPage}
      variants={pageVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="show"
    >
      <motion.div className={styles.hero} variants={panelVariants}>
        <div>
          <p className={styles.eyebrow}>Live markets</p>
          <h1>Crypto Market</h1>
          <p>Track live prices, liquidity, supply, and short-term movement from CoinGecko&apos;s public market endpoint.</p>
        </div>
        <div className={styles.heroStat}>
          <span>Data source</span>
          <strong>CoinGecko</strong>
        </div>
      </motion.div>

      <motion.div variants={panelVariants}>
        <SearchBar
          isRefreshing={isLoading}
          onRefresh={loadMarkets}
          query={query}
          resultCount={filteredCoins.length}
          setQuery={setQuery}
        />
      </motion.div>

      {error && (
        <motion.div className={styles.errorBox} role="alert" variants={panelVariants}>
          <strong>Market data unavailable</strong>
          <p>{error}</p>
          <button type="button" onClick={loadMarkets}>Try again</button>
        </motion.div>
      )}

      {isLoading && !coins.length ? (
        <motion.div className={styles.loadingGrid} aria-label="Loading market data" variants={panelVariants}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div className={styles.skeletonRow} key={index} />
          ))}
        </motion.div>
      ) : (
        <>
          <CryptoChart coin={selectedCoin} />
          <CryptoTable
            activeSort={sort}
            coins={filteredCoins}
            onSelectCoin={setSelectedCoin}
            onSort={handleSort}
            selectedCoinId={selectedCoin?.id}
          />
        </>
      )}
    </motion.section>
  )
}

export default MarketClient
