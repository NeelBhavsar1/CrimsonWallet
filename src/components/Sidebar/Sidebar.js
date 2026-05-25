import React from 'react'
import styles from './Sidebar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { LayoutDashboard, ChartCandlestick, ArrowUpDown, Backpack, Target } from 'lucide-react';

const Sidebar = () => {
  

  return (
    <div className={styles.container}>
        <div className={styles.title}>
            <Image src="/crimsonlogo.png" alt="CrimsonWallet Logo" width={100} height={100} />
            <div className={styles.subtitle}>
                <h2>CrimsonWallet</h2>
                <p>Staking assets</p>
            </div>
        </div>

        <div className={styles.links}>
            <ul>
                <Link href="/profile">
                    <div className={styles.profile}>
                        <Image src="/crimsonlogo.png" alt="Profile" width={40} height={40} />
                        <div className={styles.profileText}>
                            <p className={styles.profileName}>Neel Bhavsar</p>
                            <p className={styles.profileUsername}>@neelb_2005</p>
                        </div>
                    </div>
                </Link>
                <Link href="/dashboard"> <LayoutDashboard /> Dashboard</Link>
                <Link href="/market"> <ChartCandlestick /> Market</Link>
                <Link href="/staking"> <ArrowUpDown /> Staking</Link>
                <Link href="/trade"> <Backpack /> Trade</Link>
                <Link href="/activities"> <Target /> Activities</Link>
            </ul>
        </div>

      
    </div>
  )
}

export default Sidebar