import Head from 'next/head';
import styles from './styles.module.scss';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { db } from '../../services/firebaseConnection';
import { doc, setDoc } from 'firebase/firestore';
interface DonateProps {
  user: {
    nome: string;
    id: string;
    image: string;
  };
}

export default function Donate({ user }: DonateProps) {
  const [vip, setVip] = useState(false);

  async function handleSaveDonate() {
    const docRef = doc(db, 'users', user.id);
    await setDoc(docRef, {
      donate: true,
      lasDonate: new Date(),
      image: user.image,
    }).then(() => {
      setVip(true);
    });
  }

  return (
    <>
      <Head>
        <title>Ajude a plataforma board a ficar online</title>
        <meta
          name="descripton"
          content="Página para apoiar nosso projeto. Receba alguns benefícios ao apoiar."
        />
        <link rel="canonical" href="http://localhost:3000/donate" />
      </Head>
      <main className={styles.container}>
        <img src="/images/rocket.svg" alt="Seja Apoiador" />

        {vip && (
          <div className={styles.vip}>
            <img src={user.image} alt="Foto de perfil do usuário" />
            <span>Parabéns você é um novo apoiador!</span>
          </div>
        )}

        <h1>Seja um apoiador deste projeto 🏆</h1>
        <h3>
          Contribua com apenas <span>R$ 1,00</span>
        </h3>
        <strong>
          Apareça na nossa home, tenha funcionalidades exclusivas.
        </strong>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: '1',
                  },
                },
              ],
            });
          }}
          // @ts-ignore
          onApprove={(data, actions) => {
            return actions.order?.capture().then(function (details) {
              console.log(details.payer);
              handleSaveDonate();
            });
          }}
        />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const user = {
    nome: session?.user?.name,
    id: session?.id,
    image: session?.user?.image,
  };

  return {
    props: {
      user,
    },
  };
};
