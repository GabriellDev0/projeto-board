import Head from 'next/head';

import { useState, FormEvent } from 'react';

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Link from 'next/link';

import styles from './board.module.scss';
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock, FiX } from 'react-icons/fi';
import { SupportButton } from '../../components/SupportButton/SupportButton';
import { format } from 'date-fns';
import { db } from '../../services/firebaseConnection';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

type TaskList = {
  id: string;
  created: string | Date;
  createdFormated?: string;
  tarefa: string;
  userId: string;
  nome: string;
};

interface BoardProps {
  user: {
    id: string;
    name: string;
  };
  data: [];
}

export default function Board({ user, data }: BoardProps) {
  const [input, setInput] = useState('');
  const [taskList, setTaskList] = useState<TaskList[]>(data);

  const [taskEdit, setTaskEdit] = useState<TaskList | null>(null)


  async function handleAddTask(e: FormEvent) {
    e.preventDefault();
    if (input === '') {
      alert('Preencha alguma tarefa');
      return;
    }

    if(taskEdit){
        const tarefa = doc(db, "tarefas", taskEdit.id)
        await updateDoc(tarefa, {
            tarefa: input
        }).then(()=>{
            let data= taskList;
            let taskIndex = taskList.findIndex(item => item.id === taskEdit.id)
            data[taskIndex].tarefa = input
            setTaskList(data)
            setTaskEdit(null)
            setInput('')
        })
        return;
    }


    const docRef = await addDoc(collection(db, 'tarefas'), {
      created: new Date(),
      tarefa: input,
      userId: user.id,
      nome: user.name,
    })
      .then((doc) => {
        console.log('CADASTRADO COM SUCESSO');
        let data = {
          id: doc.id,
          created: new Date(),
          createdFormated: format(new Date(), 'dd MMMM yyyy'),
          tarefa: input,
          userId: user.id,
          nome: user.name,
        };
        setTaskList([...taskList, data]);
        setInput('');
      })
      .catch((error) => {
        console.log('ERROR AO CADASTRAR', error);
      });
  }

  async function handleDelete(id: string) {
    const alert = window.confirm('Deseja realmente excluir esta tarefa ?');

    if (alert) {
      await deleteDoc(doc(db, 'tarefas', id))
      .then(() =>{
        console.log('DELETADO COM SUCESSO')
        let taskDeleted = taskList.filter(item =>{
            return (item.id !== id)
      })
      setTaskList(taskDeleted)
    })
      .catch(error =>{
          console.log(error)
      });
    }
  }

  function handleEditTask(task: TaskList){
      setTaskEdit(task)
      setInput(task.tarefa)
  }

  function handleCancelEdit(){
      setInput('')
      setTaskEdit(null)
  }


  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>
      <main className={styles.container}>

      {taskEdit && (
        <span className={styles.warnText}>
          <button onClick={ handleCancelEdit }>
          <FiX size={30} color={"#FF3636"}/>
          </button>
          Você está editando uma tarefa
        </span>
      )}

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

        <h1>
          Você tem {taskList.length} {taskList.length === 1 ? 'Tarefa' : 'Tarefas'}
        </h1>

        <section>
          {taskList.map((task) => (
            <article key={task.id} className={styles.taskList}>
              <Link href={`/board/${task.id}`}>
                <p>{task.tarefa}</p>
              </Link>

              <div className={styles.actions}>
                <div>
                  <div>
                    <FiCalendar size={20} color="#FFB800" />
                    <time>{task.createdFormated}</time>
                  </div>
                  <button onClick={(()=> handleEditTask(task))}>
                    <FiEdit2 size={20} color="#FFF" />
                    <span>Editar</span>
                  </button>
                </div>

                <button onClick={() => handleDelete(task.id)}>
                  <FiTrash size={20} color="#FF3636" />
                  <span>Excluir</span>
                </button>
              </div>
            </article>
          ))}
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

  const collectionRef = collection(db, 'tarefas');
  const q = query(
    collectionRef,
    where('userId', '==', session?.id),
    orderBy('created', 'asc'),
  );
  const querySnapShot = await getDocs(q);
  const data: string[] = [];
  
  querySnapShot.forEach((doc) => {
    data.push({
      id: doc.id,
      createdFormated: format(new Date(), 'dd MMMM yyyy'),
      ...doc.data(),
    });
  });
  const user = {
    name: session?.user?.name,
    id: session?.id,
  };
  return {
    props: {
      user,
      data: JSON.parse(JSON.stringify(data)),
    },
  };
};
