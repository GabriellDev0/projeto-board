import Link from 'next/link'
import styles from './SuportButton.module.scss'

export default function SuportButton(){
  return(
    <div className={styles.donateContainer}>
      <Link href="/donate">
        <button>Apoiar</button>
      </Link>
    </div>
  )
}