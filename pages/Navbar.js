import React from 'react'
import Image from 'next/image'
import styles from '../app/page.module.css'
import Link from 'next/link'

const Navbar = () => {
  return (
    <>
     <nav className={styles.mainnav}>
      <ul>
        
        <li><Link href='/'>Home</Link></li>
        <li><Link href='/About'>About</Link></li>
        <li><Link href='/Blogs'>Blogs</Link></li>
        <li><Link href='/Contact'>Contact</Link></li>
      </ul>
    </nav>
    </>
  )
}

export default Navbar