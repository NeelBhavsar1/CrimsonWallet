'use client'

import React from 'react'
import styles from './Sidebar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpDown, Backpack, ChartCandlestick, LayoutDashboard, LogOut, Settings, Target } from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/market', label: 'Market', icon: ChartCandlestick },
  { href: '/staking', label: 'Staking', icon: ArrowUpDown },
  { href: '/trade', label: 'Trade', icon: Backpack },
  { href: '/activities', label: 'Activities', icon: Target },
]

const sidebarVariants = {
  hidden: { opacity: 0, x: -18 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.34,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.045,
      delayChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
  },
}

const Sidebar = () => {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()
  const hoverMotion = shouldReduceMotion ? undefined : { x: 2 }
  const tapMotion = shouldReduceMotion ? undefined : { scale: 0.985 }

  return (
    <motion.aside className={styles.container} aria-label="Primary navigation" variants={sidebarVariants} initial={shouldReduceMotion ? false : 'hidden'} animate="show">
      <motion.div variants={itemVariants} whileHover={hoverMotion} whileTap={tapMotion}>
        <Link href="/dashboard" className={styles.brand} aria-label="CrimsonWallet dashboard">
          <span className={styles.logoFrame}>
            <Image src="/crimsonlogo.png" alt="" width={80} height={80} className={styles.logoImage} />
          </span>

          <motion.span className={styles.brandText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <span className={styles.brandName}>CrimsonWallet</span>
            <span className={styles.brandMeta}>Personal crypto desk</span>
          </motion.span>
        </Link>
      </motion.div>

      <motion.div variants={itemVariants} whileHover={hoverMotion} whileTap={tapMotion}>
        <Link href="/profile" className={styles.profile}>
          <Image className={styles.profileImage} src="/pfpimage.jpg" alt="Neel Bhavsar profile" width={44} height={44} />
          <span className={styles.profileText}>
            <span className={styles.profileName}>Neel Bhavsar</span>
            <span className={styles.profileUsername}>@neelb_2005</span>
          </span>
        </Link>
      </motion.div>

      <nav className={styles.nav}>
        <motion.p className={styles.navLabel} variants={itemVariants}>Workspace</motion.p>
        <motion.ul className={styles.navList} variants={sidebarVariants}>
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname?.startsWith(`${href}/`)

            return (
              <motion.li key={href} variants={itemVariants} whileHover={hoverMotion} whileTap={tapMotion}>

                <Link href={href} className={`${styles.navLink} ${isActive ? styles.active : ''}`} aria-current={isActive ? 'page' : undefined}>
                  {isActive && <motion.span className={styles.activeIndicator} layoutId="sidebar-active-indicator" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                  <Icon size={20} strokeWidth={2} />
                  <span>{label}</span>
                </Link>

              </motion.li>
            )
          })}
        </motion.ul>
      </nav>

      <motion.div className={styles.footerActions} variants={itemVariants}>
        <Link href="/settings" className={styles.utilityLink}>
          <Settings size={18} />
          <span>Settings</span>
        </Link>
        
        <Link href="/logout" className={styles.utilityLink}>
          <LogOut size={18} />
          <span>Sign out</span>
        </Link>
      </motion.div>
    </motion.aside>
  )
}

export default Sidebar
