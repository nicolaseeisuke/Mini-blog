import styles from './Search.module.css'

import { Link } from 'react-router-dom'

//hook
import { UseFetchDocuments } from '../../hooks/UseFetchDocuments'
import { useQuery } from '../../hooks/UseQuery'

//components 
import PostDatail from '../../components/PostDatail'

const Search = () => {

  const query = useQuery()
  const search = query.get('q')

  const {documents:posts} = UseFetchDocuments("posts", search)

  return (
    <div className={styles.search_container}>
      <h1>Search</h1>
      {posts && posts.length === 0 &&  (
        <>
          <p>Não foram encontrado posts a partir da sua busca</p>
          <Link to='/' className="btn btn-dark">Voltar</Link>
        </>
      )}
      {posts && posts.map((post) => (
        <PostDatail key={post.id} post={post}/>
      ))}
    </div>
  )
}

export default Search