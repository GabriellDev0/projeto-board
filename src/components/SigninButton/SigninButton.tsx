import {signIn, signOut, useSession} from 'next-auth/react'
import styles from './SigninButton.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

type imgProps = {
  width: string;
  height: string
}

export function SigninButton({width, height}:imgProps) {

  const {data: session, status} = useSession()


  return status === 'authenticated' ? (
    <button type="button" className={styles.signInButton} onClick={() => signOut()}>
      <img width={width} height={height} src={session.user?.image || '/images/white_img_user.jpg'} alt="Foto do usuário" />
      Olá {session.user?.name}
      <FiX color="#737380" className={styles.closeIcon}/>
    </button>
  ) : (
    <button type="button" className={styles.signInButton} onClick={() => signIn('github')}>
      <FaGithub color="#FFB800" />
      Entrar com Github
    </button>
  );
}
