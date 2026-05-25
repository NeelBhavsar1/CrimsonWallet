'use client'

import { RefreshCw, Search } from 'lucide-react'
import styles from './Market.module.css'

const SearchBar = ({ isRefreshing, onRefresh, query, resultCount, setQuery }) => {
  return (
    <div className={styles.toolbar}>
      <label className={styles.searchBox}>
        <Search size={18} />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search coin or symbol"
          aria-label="Search cryptocurrency by name or symbol"
        />
      </label>

      <div className={styles.toolbarMeta}>
        <span>{resultCount} coins</span>
        <button type="button" onClick={onRefresh} disabled={isRefreshing} className={styles.refreshButton}>
          <RefreshCw size={17} className={isRefreshing ? styles.spinning : ''} />
          <span>{isRefreshing ? 'Refreshing' : 'Refresh'}</span>
        </button>
      </div>
    </div>
  )
}

export default SearchBar
