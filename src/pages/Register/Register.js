import styles from './Register.module.css'

import {useState , useEffect} from 'react'

const Register = () => {

  const  [displayName, setDisplayname] = useState("")
  const  [email, setEmail] = useState("")
  const  [password, setPassword] = useState("")
  const  [confirmPassword, setConfimrPassword] = useState("")
  const  [error, setError] = useState("")

  const handleSubmit = (e)=> {
    e.preventDefault()

    setError("")

    const user = {
      displayName,
      email,
      password,
    }

    if(password !== confirmPassword){
      setError("As senhas precisam ser iguais")
      return
    }

    console.log(user)

  }

  return (
    <div className={styles.register}>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuário e compartilhe suas histórias</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome: </span>
            <input type="text" 
            name='displayName' 
            required 
            placeholder='Nome do usuário' 
            value={displayName}
            onChange={(e) => setDisplayname(e.target.value)}
            />
          </label>
          <label>
            <span>E-mail: </span>
            <input type="email" 
            name='email' 
            required 
            placeholder='E-mail do usuário' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Senha:</span>
            <input type="password" 
            name='password' 
            required 
            placeholder='Insira sua senha' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <span>Confirmar senha:</span>
            <input type="password" 
            name='COnfirnPassword' 
            required 
            placeholder='Confirme a sua senha' 
            value={confirmPassword}
            onChange={(e) => setConfimrPassword(e.target.value)}
            />
          </label>
          <button className='btn'>cadastrar</button>
          {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Register