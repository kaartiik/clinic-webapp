import Image from 'next/image'
import Link from 'next/link';
import styles from './styles/main.module.css';

export default function Home() {
  return (
    <div className={styles.container}>

    <Link href="/counter" passHref>
      <button className={styles.roundedButton}>Counter</button>
    </Link>

    <Link href="/doctor" passHref>
      <button className={styles.roundedButton}>Doctor</button>
    </Link>
  </div>
  )
}
