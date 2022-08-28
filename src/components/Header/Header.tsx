import React from 'react';
import Link from 'next/link';
import styles from './header.module.scss';
import { SigninButton } from '../SigninButton/SigninButton';

const Header = () => {
  return (
    <header className={`${styles.headerContainer}`}>
      <div className={`${styles.headerContent} Container`}>
        <Link href="/">
          <img src="/images/logo.svg" alt="Logo Meu Board" />
        </Link>

        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/board">
            <a>Meu Board</a>
          </Link>
        </nav>
        <SigninButton width='35px' height='35px'/>
      </div>
    </header>
  );
};

export default Header;
