import React from 'react';
import Link from 'next/link';
import styles from './header.module.scss';
import { SigninButton } from '../SigninButton/SigninButton';
import Image from 'next/image';
import logo from '../../../public/images/logo.svg';

const Header = () => {
  return (
    <header className={`${styles.headerContainer}`}>
      <div className={`${styles.headerContent} Container`}>
        <Link href="/">
          <a>
            <Image src={logo} alt="Logo Meu Board" />
          </a>
        </Link>

        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/board">
            <a>Meu Board</a>
          </Link>
        </nav>
        <SigninButton />
      </div>
    </header>
  );
};

export default Header;
