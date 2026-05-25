'use client'

import { motion } from 'framer-motion'
import styles from './Market.module.css'

const currencyFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 2,
})

const compactFormatter = new Intl.NumberFormat('en-GB', {
  notation: 'compact',
  maximumFractionDigits: 2,
})

const numberFormatter = new Intl.NumberFormat('en-GB', {
  maximumFractionDigits: 0,
})

const sortLabels = {
  current_price: 'Price',
  price_change_percentage_24h: '24h',
  market_cap: 'Market cap',
  total_volume: 'Volume',
}

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
  },
}

const Sparkline = ({ coin }) => {
  const prices = coin.sparkline_in_7d?.price ?? []
  const values = prices.filter((value) => Number.isFinite(value))

  if (values.length < 2) {
    return <span className={styles.noSparkline}>No chart</span>
  }

  const width = 120
  const height = 40
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const step = width / (values.length - 1)
  const points = values
    .map((value, index) => {
      const x = index * step
      const y = height - ((value - min) / range) * height
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')

  const isPositive = (coin.price_change_percentage_24h ?? 0) >= 0

  return (
    <svg className={isPositive ? styles.sparkPositive : styles.sparkNegative} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${coin.name} 7-day price sparkline`}>
      <polyline points={points} />
    </svg>
  )
}

const SortButton = ({ activeSort, field, onSort }) => {
  const isActive = activeSort.field === field
  const direction = isActive && activeSort.direction === 'asc' ? 'asc' : 'desc'

  return (
    <button type="button" onClick={() => onSort(field)} className={`${styles.sortButton} ${isActive ? styles.activeSort : ''}`}>
      <span>{sortLabels[field]}</span>
      <span aria-hidden="true">{isActive && direction === 'asc' ? '\u2191' : '\u2193'}</span>
    </button>
  )
}

const CryptoTable = ({ activeSort, coins, onSelectCoin, onSort, selectedCoinId }) => {
  return (
    <motion.div className={styles.tablePanel} variants={rowVariants}>
      <div className={styles.tableScroll}>
        <table className={styles.cryptoTable}>
          <thead>
            <tr>
              <th>Asset</th>
              <th>
                <SortButton activeSort={activeSort} field="current_price" onSort={onSort} />
              </th>
              <th>
                <SortButton activeSort={activeSort} field="price_change_percentage_24h" onSort={onSort} />
              </th>
              <th>
                <SortButton activeSort={activeSort} field="market_cap" onSort={onSort} />
              </th>
              <th>
                <SortButton activeSort={activeSort} field="total_volume" onSort={onSort} />
              </th>
              <th>Supply</th>
              <th>7D</th>
            </tr>
          </thead>
          <motion.tbody initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.018 } } }}>
            {coins.map((coin) => {
              const change = coin.price_change_percentage_24h ?? 0
              const isSelected = selectedCoinId === coin.id

              return (
                <motion.tr
                  key={coin.id}
                  className={isSelected ? styles.selectedRow : ''}
                  onClick={() => onSelectCoin(coin)}
                  tabIndex={0}
                  variants={rowVariants}
                  whileHover={{ backgroundColor: 'var(--surface-muted)' }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      onSelectCoin(coin)
                    }
                  }}
                >
                  <td>
                    <div className={styles.assetCell}>
                      <img src={coin.image} alt={`${coin.name} logo`} />
                      <div>
                        <strong>{coin.name}</strong>
                        <span>{coin.symbol.toUpperCase()}</span>
                      </div>
                    </div>
                  </td>
                  <td>{currencyFormatter.format(coin.current_price ?? 0)}</td>
                  <td>
                    <span className={change >= 0 ? styles.positive : styles.negative}>
                      {change >= 0 ? '+' : ''}
                      {change.toFixed(2)}%
                    </span>
                  </td>
                  <td>{currencyFormatter.format(coin.market_cap ?? 0)}</td>
                  <td>{currencyFormatter.format(coin.total_volume ?? 0)}</td>
                  <td>{compactFormatter.format(coin.circulating_supply ?? 0)} {coin.symbol.toUpperCase()}</td>
                  <td>
                    <Sparkline coin={coin} />
                  </td>
                </motion.tr>
              )
            })}
          </motion.tbody>
        </table>
      </div>

      <motion.div className={styles.mobileCards} initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.035 } } }}>
        {coins.map((coin) => {
          const change = coin.price_change_percentage_24h ?? 0
          const isSelected = selectedCoinId === coin.id

          return (
            <motion.button
              type="button"
              key={coin.id}
              className={`${styles.mobileCard} ${isSelected ? styles.selectedMobileCard : ''}`}
              onClick={() => onSelectCoin(coin)}
              variants={rowVariants}
              whileTap={{ scale: 0.99 }}
            >
              <div className={styles.assetCell}>
                <img src={coin.image} alt={`${coin.name} logo`} />
                <div>
                  <strong>{coin.name}</strong>
                  <span>{coin.symbol.toUpperCase()}</span>
                </div>
              </div>
              <Sparkline coin={coin} />
              <div className={styles.mobileStats}>
                <span>{currencyFormatter.format(coin.current_price ?? 0)}</span>
                <em className={change >= 0 ? styles.positive : styles.negative}>
                  {change >= 0 ? '+' : ''}
                  {change.toFixed(2)}%
                </em>
              </div>
              <small>Market cap {currencyFormatter.format(coin.market_cap ?? 0)} · Supply {numberFormatter.format(coin.circulating_supply ?? 0)}</small>
            </motion.button>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

export default CryptoTable
