import { NavLink } from "react-router-dom"

import styles from './NavBar.module.css'

import { UseAuthentication } from "../hooks/UseAuthentication "

import { useAuthValue } from "../context/AuthContext"

const NavBar = () => {

  const {user} = useAuthValue()

  const {logout} = UseAuthentication()

  return (
    <div>
      <nav className={styles.navBar}> 
        <NavLink to='/' className={styles.brand}>
          Mini <span>blog</span>
        </NavLink>
        <ul className={styles.links_list}>
          <li> <NavLink to='/' className={({isActive}) => (isActive ? styles.active : "")}>Home</NavLink></li>
          {!user && (
            <>
              <li><NavLink to='/login' className={({isActive}) => (isActive ? styles.active : "")}>Login</NavLink></li>
              <li><NavLink to='/register' className={({isActive}) => (isActive ? styles.active : "")}>Register</NavLink></li>
            </>
          )}
          {user && (
            <>
              <li><NavLink to='/posts/create' className={({isActive}) => (isActive ? styles.active : "")}>Posts</NavLink></li>
              <li><NavLink to='/dashboard' className={({isActive}) => (isActive ? styles.active : "")}>Dashboard</NavLink></li>
            </>
          )}
          <li> <NavLink to='/about' className={({isActive}) => (isActive ? styles.active : "")}>About</NavLink></li>
          {user && (
            <li>
              <button onClick={logout}>Sair</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default NavBar