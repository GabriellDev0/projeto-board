import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '../../services/firebaseConnection'
import {doc, getDoc} from 'firebase/firestore'
import { format } from 'date-fns'

import Head from 'next/head';
import styles from './task.module.scss'
import { FiCalendar } from 'react-icons/fi'
type Task = {
  id: string;
  created: string | Date;
  createdFormated?: string;
  tarefa: string;
  userId: string;
  nome: string
}

interface TaskListProps{
    data: string
}

export default function Task({ data }:TaskListProps) {
  const task = JSON.parse(data) as Task
 
  return (
    <>
     <Head>
      <title>Detalhes da sua tarefa</title>
     </Head>
    <article className={styles.container}>
      <div className={styles.actions}>
        <div>
            <FiCalendar size={30} color="#FFF"/>
            <span>Tarefa criada:</span>
            <time>{task.createdFormated}</time>
        </div>
      </div>
      <p>{task.tarefa}</p>
    </article>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params}) => {
  const session = await getSession({ req });
  const id = params?.id
  if (!session?.id) {
    //Se o user não tiver logado, vamos redirecionar.
    return {
      redirect: {
        destination: '/board',
        permanent: false,
      },
    };
  }
  const docRef = doc(db, 'tarefas', String(id));
  const data = await getDoc(docRef).then((snapshot)=>{
      const data = {
        id: snapshot.id,
        created: snapshot.data()?.created,
        createdFormated: format(snapshot.data()?.created.toDate(), 'dd MMMM yyyy'),
        tarefa: snapshot.data()?.tarefa,
        userId: snapshot.data()?.userId,
        nome: snapshot.data()?.nome
      }
      return JSON.stringify(data)
  })

  return {
    props: {
      data
    },
  };
};
