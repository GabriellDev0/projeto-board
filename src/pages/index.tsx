import { GetStaticProps } from 'next';
import Head from 'next/head';
import styles from '../styles/styles.module.scss';
import Image from 'next/image';
import boardUser from '../../public/images/board-user.svg';
import { db } from '../services/firebaseConnection';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { useState } from 'react';

type Data = {
  id: string;
  donate: boolean;
  lastDonate: Date;
  image: string;
};

interface HomeProps {
  data: [];
}

export default function Home({ data }: HomeProps) {
  const [donaters, setDonaters] = useState<Data[]>(data);
  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas</title>
        <meta
          name="descripton"
          content="Página inicial do Board Organizando suas tarefas."
        />
        <link rel="canonical" href="http://localhost:3000/" />
      </Head>
      <main className={`${styles.contentContainer} Content`}>
        <Image src={boardUser} alt="Ferramenta Board" />
        <section className={styles.callToAction}>
          <h1>
            Uma ferramenta para seu dia a dia Escreva, planeje e organize-se..
          </h1>
          <p>
            <span>100% Gratuita</span> e online.
          </p>
        </section>

        <div className={styles.donaters}>
          {donaters.length !== 0 && <h3>Apoiadores: </h3>}
          <div>
            {donaters.map((item) => (
              <Image
                key={item.image}
                width={65}
                height={65}
                src={item.image}
                alt="Usuários"
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef);
  const querySnapShot = await getDocs(q);
  const data: string[] = [];

  querySnapShot.forEach((doc) => {
    // @ts-ignore
    data.push({
      ...doc.data(),
    });
    return data;
  });

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
    revalidate: 60 * 60, // Atualiza a cada 60min
  };
};
