import {signIn, signOut, useSession} from 'next-auth/react'
import styles from './SigninButton.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import Image from 'next/image'
import whiteImgUser from '../../../public/images/white_img_user.jpg'

export function SigninButton(){

  const {data: session, status} = useSession()

  return status === 'authenticated' ? (
    <button type="button" className={styles.signInButton} onClick={() => signOut()}>
      <Image width={35} height={35} src={session?.user?.image || whiteImgUser} alt="Foto do usuário" />
      Olá {session?.user?.name}
      <FiX color="#737380" className={styles.closeIcon}/>
    </button>
  ) : (
    <button type="button" className={styles.signInButton} onClick={() => signIn('github')}>
      <FaGithub color="#FFB800" />
      Entrar com Github
    </button>
  );
}
