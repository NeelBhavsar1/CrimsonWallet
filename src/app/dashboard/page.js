'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import styles from './page.module.css'

const timeFrames = [
  { label: 'Today', value: '+\u00a31,846.22', change: '+1.51%' },
  { label: '7 days', value: '+\u00a39,732.48', change: '+8.04%' },
  { label: '30 days', value: '+\u00a322,418.90', change: '+18.63%' },
]

const holdings = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '/crypto/bitcoin.svg',
    invested: '\u00a358,430.00',
    coins: '0.902 BTC',
    change: '+4.8%',
    graph: '12,46 44,38 76,42 108,24 140,30 172,16 204,20',
  },
  {
    name: 'Litecoin',
    symbol: 'LTC',
    icon: '/crypto/litecoin.svg',
    invested: '\u00a312,760.00',
    coins: '167.4 LTC',
    change: '+2.1%',
    graph: '12,38 44,34 76,40 108,36 140,22 172,28 204,18',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    icon: '/crypto/ethereum.svg',
    invested: '\u00a339,820.00',
    coins: '10.7 ETH',
    change: '+6.4%',
    graph: '12,44 44,32 76,36 108,20 140,26 172,14 204,18',
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    icon: '/crypto/solana.svg',
    invested: '\u00a318,990.00',
    coins: '108.1 SOL',
    change: '+9.7%',
    graph: '12,48 44,42 76,28 108,34 140,18 172,22 204,10',
  },
]

const performancePoints = '16,194 78,176 140,182 202,146 264,154 326,118 388,126 450,84 512,96 574,58 636,66 698,34'
const performanceArea = `16,230 ${performancePoints} 698,230`

const pageVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const panelVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
}

const DashboardPage = () => {
  const shouldReduceMotion = useReducedMotion()
  const hoverMotion = shouldReduceMotion ? undefined : { y: -3 }
  const tapMotion = shouldReduceMotion ? undefined : { scale: 0.99 }

  return (
    <motion.section
      className={styles.dashboard}
      variants={pageVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="show"
    >
      <motion.div className={styles.balancePanel} variants={panelVariants}>
        <div className={styles.balanceCopy}>
          <p className={styles.eyebrow}>Portfolio overview</p>
          <h1>Total Balance</h1>
          <p className={styles.balanceValue}>{'\u00a3120,457.36'}</p>
        </div>

        <div className={styles.profitGrid} aria-label="Portfolio profit by time period">
          {timeFrames.map((frame) => (
            <motion.div className={styles.profitCard} key={frame.label} variants={cardVariants} whileHover={hoverMotion} whileTap={tapMotion}>
              <span>{frame.label}</span>
              <strong>{frame.value}</strong>
              <small>{frame.change}</small>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div className={styles.sectionHeader} variants={panelVariants}>
        <div>
          <p className={styles.eyebrow}>Holdings</p>
          <h2>Invested cryptocurrencies</h2>
        </div>
        <span>4 assets</span>
      </motion.div>

      <motion.div className={styles.holdingsGrid} variants={pageVariants}>
        {holdings.map((coin) => (
          <motion.article className={styles.coinCard} key={coin.symbol} variants={cardVariants} whileHover={hoverMotion} whileTap={tapMotion}>
            <div className={styles.coinHeader}>
              <Image src={coin.icon} alt={`${coin.name} logo`} width={42} height={42} />
              <div>
                <h3>{coin.name}</h3>
                <p>{coin.symbol}</p>
              </div>
            </div>

            <svg className={styles.sparkline} viewBox="0 0 216 60" role="img" aria-label={`${coin.name} value trend`}>
              <defs>
                <linearGradient id={`${coin.symbol}-gradient`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polyline className={styles.sparkFill} points={`12,58 ${coin.graph} 204,58`} fill={`url(#${coin.symbol}-gradient)`} />
              <polyline className={styles.sparkLine} points={coin.graph} />
            </svg>

            <div className={styles.coinFooter}>
              <div>
                <span>Invested</span>
                <strong>{coin.invested}</strong>
              </div>
              <div>
                <span>Holding</span>
                <strong>{coin.coins}</strong>
              </div>
              <em>{coin.change}</em>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.section className={styles.performancePanel} aria-labelledby="performance-heading" variants={panelVariants}>
        <div className={styles.performanceHeader}>
          <div>
            <p className={styles.eyebrow}>Performance</p>
            <h2 id="performance-heading">Portfolio performance</h2>
          </div>
          <div className={styles.chartStats}>
            <span>30D return</span>
            <strong>+18.63%</strong>
          </div>
        </div>

        <div className={styles.chartFrame}>
          <div className={styles.yAxis} aria-hidden="true">
            <span>{'\u00a3130k'}</span>
            <span>{'\u00a3120k'}</span>
            <span>{'\u00a3110k'}</span>
            <span>{'\u00a3100k'}</span>
          </div>

          <svg className={styles.performanceChart} viewBox="0 0 720 250" role="img" aria-label="Portfolio value trending upward over 30 days">
            <defs>
              <linearGradient id="portfolio-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g className={styles.gridLines}>
              <line x1="16" x2="704" y1="46" y2="46" />
              <line x1="16" x2="704" y1="96" y2="96" />
              <line x1="16" x2="704" y1="146" y2="146" />
              <line x1="16" x2="704" y1="196" y2="196" />
            </g>
            <polyline className={styles.performanceFill} points={performanceArea} fill="url(#portfolio-fill)" />
            <motion.polyline
              className={styles.performanceLine}
              points={performancePoints}
              initial={shouldReduceMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            />
            <motion.circle
              className={styles.chartDot}
              cx="698"
              cy="34"
              r="6"
              initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.28, delay: 0.95 }}
            />
          </svg>
        </div>

        <div className={styles.xAxis} aria-hidden="true">
          <span>Mar 26</span>
          <span>Apr 02</span>
          <span>Apr 09</span>
          <span>Apr 16</span>
          <span>Apr 23</span>
          <span>Today</span>
        </div>
      </motion.section>
    </motion.section>
  )
}

export default DashboardPage
