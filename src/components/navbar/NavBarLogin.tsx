import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styles from './NavBarLogin.module.scss'

const NavBarComponet = (props: RouteComponentProps) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Logo}></div>
    </div>
  )
}

const NavBarLogin = withRouter(NavBarComponet)

export default NavBarLogin
