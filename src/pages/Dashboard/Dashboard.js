import styles from './Dashboard.module.css'

import {Link} from 'react-router-dom'

//hooks
import {useAuthValue} from '../../context/AuthContext'
import {UseFetchDocuments} from '../../hooks/UseFetchDocuments'
import { UseDeleteDocument } from '../../hooks/UseDeleteDocument'

const Dashboard = () => {

  const {user} = useAuthValue()
  const uid = user.id

  const {documents:posts, loading} = UseFetchDocuments("posts", null, uid)
  const {deleteDocument} = UseDeleteDocument("posts")


  if(loading){
    return <p>Carregando... </p>
  }

  //post do usuario

  return(
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to={'/posts/create'} className='btn'>Criar primeiro post</Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>

          {posts && posts.map((post) => (
            <div className={styles.post_row} key={post.id}>
              <p>{post.title}</p>
              <div>
                 <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ver mais</Link>
                 <Link to={`/posts/edit/${post.id}`} className='btn btn-outline'>Editar</Link>
                 <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger">Excluir</button>
              </div>
            </div>
          ))}
        </>
        
      )}
    </div>
  )
}

export default Dashboard