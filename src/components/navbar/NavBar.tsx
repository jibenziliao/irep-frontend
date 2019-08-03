import React from 'react'
import { Dropdown, Button, Icon, Menu, notification } from 'antd'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styles from './NavBar.module.less'
import userAvatar from '../../assets/navbar/user.png'
import { removeAllStore, getStore } from '../../utils/util'
import { requestFn } from '../../utils/request'
import { useDispatch } from '../../store/Store'
import { Actions } from '../../store/Actions'

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
  const dispatch: Dispatch<Actions> = useDispatch()

  const logOut = async () => {
    const res = await requestFn(dispatch, {
      url: '/user/out',
      method: 'post'
    })
    if (res && res.status === 200 && res.data && res.data.code === 0) {
      removeAllStore()
      window.location.href = window.location.origin
    } else {
      errorTips('注销失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
    }
  }

  const errorTips = (message = '', description = '') => {
    notification.error({
      message,
      description
    })
  }

  const menu = (
    <Menu onClick={logOut}>
      <Menu.Item key="1">注销</Menu.Item>
    </Menu>
  )
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
      <Dropdown overlay={menu} className={styles.Dropdown}>
        <div>
          <img src={userAvatar} alt="用户图标" />
          <Button ghost className={styles.DropdownBtn}>
            <span className={styles.UserName}>{getStore('user') ? getStore('user').username : '张三'}</span>
            <Icon type="caret-down" />
          </Button>
        </div>
      </Dropdown>
    </div>
  )
}

const NavBar = withRouter(NavBarComponet)

export default NavBar
