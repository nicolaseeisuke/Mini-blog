import { NavLink } from "react-router-dom"

import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <div>
      <nav className={styles.navBar}> 
        <NavLink to='/' className={styles.brand}>
          Mini <span>blog</span>
        </NavLink>
        <ul className={styles.links_list}>
          <li> <NavLink to='/' className={({isActive}) => (isActive ? styles.active : "")}>Home</NavLink></li>
          <li><NavLink to='/about' className={({isActive}) => (isActive ? styles.active : "")}>About</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar