import {signIn, signOut, useSession} from 'next-auth/react'
import styles from './SigninButton.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

type imgProps = {
  width: string;
  height: string
}

export function SigninButton({width, height}:imgProps) {

  const {data: session, status}= useSession()
  console.log(session)

  return session ? (
    <button type="button" className={styles.signInButton} onClick={() => signOut()}>
      <img width={width} height={height} src={session.user?.image || ''} alt="Foto do usuário" />
      Olá GabriellDev0
      <FiX color="#737380" className={styles.closeIcon}/>
    </button>
  ) : (
    <button type="button" className={styles.signInButton} onClick={() => signIn('github')}>
      <FaGithub color="#FFB800" />
      Entrar com Github
    </button>
  );
}
