import styles from './CreatePost.module.css'

import {useState} from 'react';
import {useInsertDocument} from '../../hooks/UseInsertDocument';
import {useNavigate} from 'react-router-dom';
import {useAuthValue} from '../../context/AuthContext'

const CreatePost = () => {

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")
  
  const {user} = useAuthValue()

  const {insertDocument, response} = useInsertDocument("posts")

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

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy : user.displayName
    })

    // redirect to home page
    navigate('/')

  }

  return (
    <div className={styles.createPost}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que está pensando</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Titulo:</span>
          <input type="text" 
          name="title" 
          required  
          placeholder='Pense em um bom titulo'
          onChange={(e) =>  setTitle(e.target.value)}
          value={title}
          />
        </label>
        <label>
          <span>URL da imagem</span>
          <input type="text" 
          name="image" 
          required  
          placeholder='Insira um imagem que representa seu post'
          onChange={(e) =>  setImage(e.target.value)}
          value={image}
          />
        </label>
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

        {!response.loading && <button className='btn'>Criar post</button>}
        {response.loading && <button className='btn' disabled>Aguarde</button>}
        {response.error && <p className='error'>{response.error}</p>} 
        {formError && (<p className='error'>{formError}</p>)}
      </form>
    </div>
  )
}

export default CreatePost