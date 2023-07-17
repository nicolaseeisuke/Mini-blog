import styles from './EditPost.module.css'


import {useState, useEffect} from 'react';

import {useNavigate, useParams} from 'react-router-dom';
import {useAuthValue} from '../../context/AuthContext'
import {UseFetchDocument} from "../../hooks/UseFetchDocument"
import { UseUpdateDocument } from '../../hooks/useUpdateDocument';

const EditPost = () => {

  const {id} = useParams()
  const {document: post } = UseFetchDocument("posts", id)


  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  useEffect(() => {

    if(post){

      setTitle( post.title)
      setImage(post.image)
      setBody(post.body)
      const textTags = post.tagsArray.join(", ")
      
      setTags(textTags)
    }

  },[post])
  
  const {user} = useAuthValue()

  const {updateDocumet, response} = UseUpdateDocument("posts")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    //validate URL image
    try{
      new URL(image)
    }catch(error){
      setFormError("A imagem precisa ser uma URL")
    }

    //criar array da tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    //checar todos os valores
    if(!title || !image || !body || !tags){
      setFormError("Por favor preencha todos os campos ")
    }

    if(formError) return

    console.log({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy : user.displayName
    }

    updateDocumet(id, data)

    // redirect to home page
    navigate('/dashboard')

  }

  return (
    <div className={styles.edit_post}>
    {post && (
      <>
          <h2>Editar post: {post.title}</h2>
      <p>Altere os dados do post como desejar</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Titulo:</span>
          <input type="text" 
          name="title" 
          required  
          placeholder='Pense em um bom titulo'
          value={title}
          onChange={(e) =>  setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>URL da imagem</span>
          <input type="text" 
          name="image" 
          required  
          placeholder='Insira um imagem que representa seu post'
          value={image}
          onChange={(e) =>  setImage(e.target.value)}
          />
        </label>
        <p className={styles.preview_title}>Preview da imagem</p>
        <img className={styles.image_preview} src= {post.image} alt={post.title}/>
        <label>
          <span>Conteúdo:</span>
         <textarea name="body"
         required 
         placeholder='Insira o conteudo do post' 
         onChange={(e) =>  setBody(e.target.value)}
         value={body}>
         </textarea>
        </label>
        <label>
          <span>tags:</span>
          <input type="text" 
          name="tags" 
          required  
          placeholder='Insira as tag separadas por virgulas'
          onChange={(e) =>  setTags(e.target.value)}
          value={tags}
          />
        </label>

        {!response.loading && <button className='btn'>Editar post</button>}
        {response.loading && <button className='btn' disabled>Aguarde</button>}
        {response.error && <p className='error'>{response.error}</p>} 
        {formError && (<p className='error'>{formError}</p>)}
      </form>
      </>
    )}
    </div>
  )
}

export default EditPost