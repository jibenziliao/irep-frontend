import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styles from './NavBar.module.less'

const navs = [
  {
    name: '实验简介',
    path: '/introduction'
  },
  {
    name: '实验指导',
    path: '/guide'
  },
  {
    name: '我的实验',
    path: '/experiment'
  },
  {
    name: '考核说明',
    path: '/description'
  },
  {
    name: '实验报告',
    path: '/report'
  },
  {
    name: '交流讨论',
    path: '/discussion'
  }
]

const NavBarComponet = (props: RouteComponentProps) => {
  const handleActive = (path: string) => {
    return window.location.pathname.includes(path)
  }

  const goRoute = (path: string) => {
    props.history.replace(path)
  }

  const renderNavs = () => {
    return navs.map(i => {
      return (
        <li key={i.name} className={styles.Item} onClick={() => goRoute(i.path)}>
          <span className={`${styles.NavText} ${handleActive(i.path) ? styles.Active : ''}`}>{i.name}</span>
        </li>
      )
    })
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Logo} onClick={() => goRoute('/')}></div>
      <ul className={styles.NavItems}>{renderNavs()}</ul>
    </div>
  )
}

const NavBar = withRouter(NavBarComponet)

export default NavBar
