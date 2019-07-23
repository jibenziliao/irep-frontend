import React, { useState } from 'react'
import { Dispatch } from 'redux'
import styles from './Login.module.scss'
import userName from '../../assets/login/username.png'
import { requestFn } from '../../utils/request'
import { useDispatch } from '../../store/Store'
import { Actions } from '../../store/Actions'

const defaultForm = {
  userName: '',
  password: ''
}

const Login = () => {
  const [form, setForm] = useState(defaultForm)
  const dispatch: Dispatch<Actions> = useDispatch()

  const handleLogin = () => {
    if (form.userName && form.password) {
      loginRequest()
    } else {
      // TODO: 显示校验信息
    }
  }

  const inputChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (field === 'userName') {
      setForm({ ...form, userName: e.target.value })
    } else {
      setForm({ ...form, password: e.target.value })
    }
  }

  const loginRequest = async () => {
    const res = await requestFn(dispatch, {
      url: '',
      data: {
        username: form.userName,
        password: form.userName
      }
    })
    if (res && res.status === 200 && res.data) {
      console.log(res)
    }
  }

  return (
    <div className={styles.LoginContainer}>
      <div className={styles.FormWrapper}>
        <div className={styles.VideoWrapper}></div>
        <div className={styles.LoginForm}>
          <label className={styles.Title}>用户登录</label>
          <div className={styles.InputGroup}>
            <span className={styles.InputIcon}>
              <img src={userName} alt="用户名" />
            </span>
            <input
              type="text"
              placeholder="用户名/学号/手机号"
              defaultValue={form.userName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputChange('userName', e)}
            />
          </div>
          <div className={styles.InputGroup}>
            <span className={styles.InputIcon}>
              <img src={userName} alt="用户名" />
            </span>
            <input type="text" placeholder="请输入密码" defaultValue={form.password} />
          </div>
          <div className={styles.FormRow}>
            <button className={styles.LoginBtn} onClick={handleLogin}></button>
            <button className={styles.RegisterBtn} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
