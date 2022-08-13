import styles from './SigninButton.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

type imgProps = {
  width: string;
  height: string
}

export function SigninButton({width, height}:imgProps) {
  const session = true;
  return session ? (
    <button type="button" className={styles.SigninButton} onClick={() => {}}>
      <img width={width} height={height} src="https://sujeitoprogramador.com/steve.png" alt="Foto do usuário" />
      Olá GabriellDev0
      <FiX color="#737380" className={styles.closeIcon}/>
    </button>
  ) : (
    <button type="button" className={styles.SigninButton} onClick={() => {}}>
      <FaGithub color="#FFB800" />
      Entrar com Github
    </button>
  );
}
