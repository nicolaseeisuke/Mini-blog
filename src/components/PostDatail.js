import styles from './PostDatail.module.css';


import {Link} from 'react-router-dom'

const PostDatail = ({post}) => {
  return (
    <div className={styles.post_detail}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p className={styles.createby}>{post.createdBy}</p>
      <div className={styles.tags}>
        {post.tagsArray.map((tag) => (
          <p key={tag}><span>#</span>{tag}</p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`}className='btn btn-outiline'>Ler</Link>
    </div>
    
  )
}

export default PostDatail