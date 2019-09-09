import React, { useState, useEffect } from 'react'
import { Dispatch } from 'redux'
import { Spin, Result } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { requestFn } from '../../utils/request'
import { useDispatch } from '../../store/Store'
import { Actions } from '../../store/Actions'
import { setStore, getUrlParam } from '../../utils/util'
import styles from './OAuthLogin.module.less'

interface Params {
  userName: string
  password: string
}

const OAuthLoginWithoutRouter = (props: RouteComponentProps) => {
  const [loading, setLoading] = useState(true)
  const [successed, setSuccessed] = useState(false)
  const dispatch: Dispatch<Actions> = useDispatch()

  useEffect(() => {
    const loginRequest = async (fieldValue: Params) => {
      const res = await requestFn(dispatch, {
        url: '/user/login',
        method: 'post',
        data: {
          username: fieldValue.userName,
          password: fieldValue.password
        }
      })
      setLoading(false)
      if (res && res.status === 200 && res.data && res.data.code === 101) {
        setStore('user', res.data.data || { username: '张三' })
        setSuccessed(true)
        setTimeout(() => {
          // 使用原生跳转，以更新权限
          window.location.href = '/experiment/index'
        }, 1500)
      } else {
        setSuccessed(false)
        setTimeout(() => {
          props.history.replace('/login')
        }, 1500)
      }
    }

    const parseToken = async (token: string) => {
      const res = await requestFn(dispatch, {
        url: '/user/login',
        method: 'post',
        params: {},
        data: {
          token
        }
      })
      if (res && res.status === 200 && res.data && res.data.code === 101) {
        loginRequest({ userName: '', password: '' })
      } else {
        setLoading(false)
        setSuccessed(false)
        setTimeout(() => {
          props.history.replace('/login')
        }, 1500)
      }
    }

    if (getUrlParam('token')) {
      const token = getUrlParam('token') + ''
      parseToken(token)
    }
  }, [dispatch, props.history])

  const renderLoginStatus = () => {
    if (loading) {
      return <Spin spinning={loading} size="large" tip="正在登录" className={styles.Loading}></Spin>
    } else if (successed) {
      return <Result status="success" title="授权登录成功" subTitle="即将跳转实验页面" />
    } else {
      return <Result status="error" title="授权登录失败" subTitle="即将跳转登录页面" />
    }
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Logo}></div>
      {renderLoginStatus()}
    </div>
  )
}

const OAuthLogin = withRouter(OAuthLoginWithoutRouter)

export default OAuthLogin
