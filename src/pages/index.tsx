import Head from 'next/head';
import styles from '../styles/styles.module.scss';

const Home = () => {
  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas</title>
      </Head>
      <div>
        <h1 className={styles.title}>
          Aplicativo com <span>Next JS</span>
        </h1>
      </div>
    </>
  );
};

export default Home;
