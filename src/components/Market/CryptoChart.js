'use client'

import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import styles from './Market.module.css'

const currencyFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 2,
})

const panelVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
  },
}

const buildChartData = (coin) => {
  const prices = coin?.sparkline_in_7d?.price ?? []

  return prices.map((price, index) => ({
    label: index % 24 === 0 ? `Day ${Math.floor(index / 24) + 1}` : '',
    price,
  }))
}

const CryptoChart = ({ coin }) => {
  if (!coin) {
    return (
      <motion.section className={styles.chartPanel} variants={panelVariants}>
        <div>
          <p className={styles.eyebrow}>Selected asset</p>
          <h2>Choose a coin</h2>
          <p className={styles.chartHint}>Select a row from the market table to view a larger 7-day price chart.</p>
        </div>
      </motion.section>
    )
  }

  const chartData = buildChartData(coin)
  const isPositive = (coin.price_change_percentage_24h ?? 0) >= 0

  return (
    <motion.section className={styles.chartPanel} variants={panelVariants}>
      <div className={styles.chartHeader}>
        <div className={styles.selectedCoin}>
          <img src={coin.image} alt={`${coin.name} logo`} />
          <div>
            <p className={styles.eyebrow}>Selected asset</p>
            <h2>{coin.name}</h2>
            <span>{coin.symbol.toUpperCase()} 7-day sparkline</span>
          </div>
        </div>

        <div className={styles.selectedStats}>
          <strong>{currencyFormatter.format(coin.current_price ?? 0)}</strong>
          <span className={isPositive ? styles.positive : styles.negative}>
            {isPositive ? '+' : ''}
            {(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
          </span>
        </div>
      </div>

      <div className={styles.largeChart}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 16, right: 12, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="marketChartFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={isPositive ? '#16a34a' : '#dc2626'} stopOpacity={0.32} />
                <stop offset="100%" stopColor={isPositive ? '#16a34a' : '#dc2626'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" strokeDasharray="4 6" vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: 'var(--secondary-text)', fontSize: 12 }} />
            <YAxis
              width={72}
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--secondary-text)', fontSize: 12 }}
              tickFormatter={(value) => currencyFormatter.format(value)}
              domain={['dataMin', 'dataMax']}
            />
            <Tooltip
              cursor={{ stroke: 'var(--border-strong)' }}
              formatter={(value) => [currencyFormatter.format(value), 'Price']}
              contentStyle={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 8,
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={isPositive ? '#16a34a' : '#dc2626'}
              strokeWidth={3}
              fill="url(#marketChartFill)"
              animationDuration={700}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  )
}

export default CryptoChart
