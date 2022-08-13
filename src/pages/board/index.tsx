import Head from 'next/head';

import { useState, FormEvent } from 'react';

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import styles from './board.module.scss';
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi';
import { SupportButton } from '../../components/SupportButton/SupportButton';

import { db } from '../../services/firebaseConnection';
import { collection, addDoc } from 'firebase/firestore';


interface BoardProps {
  user: {
    id: string;
    name: string;
  };
}

export default function Board({ user }: BoardProps) {
  const [input, setInput] = useState('');

  async function handleAddTask(e: FormEvent) {
    e.preventDefault();
    if (input === '') {
      alert('Preencha alguma tarefa');
      return;
    }
    const docRef = await addDoc(collection(db, 'tarefas'), {
      created: new Date(),
      tarefa: input,
      userId: user.id,
      nome: user.name,
    })
      .then(() => {
        console.log('CADASTRADO COM SUCESSO');
      })
      .catch((error) => {
        console.log('ERROR AO CADASTRAR', error);
      });
  }

  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>
      <main className={styles.container}>
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Digite sua tarefa..."
            value={input}
            onChange={({ target }) => setInput(target.value)}
          />
          <button type="submit">
            <FiPlus size={25} color="#17181f" />
          </button>
        </form>

        <h1>Você tem 2 tarefas!</h1>

        <section>
          <article className={styles.taskList}>
            <p>
              Aprender criar projetos usando Next JS e aplicando firebase como
              back.
            </p>
            <div className={styles.actions}>
              <div>
                <div>
                  <FiCalendar size={20} color="#FFB800" />
                  <time>17 Julho 2021</time>
                </div>
                <button>
                  <FiEdit2 size={20} color="#FFF" />
                  <span>Editar</span>
                </button>
              </div>

              <button>
                <FiTrash size={20} color="#FF3636" />
                <span>Excluir</span>
              </button>
            </div>
          </article>
        </section>
      </main>

      <div className={styles.vipContainer}>
        <h3>Obrigado por apoiar esse projeto.</h3>
        <div>
          <FiClock size={28} color="#FFF" />
          <time>Última doação foi a 3 dias.</time>
        </div>
      </div>

      <SupportButton />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session?.id) {
    //Se o user não tiver logado, vamos redirecionar.
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const user = {
    name: session?.user?.name,
    id: session?.id,
  };
  return {
    props: {
      user,
    },
  };
};
