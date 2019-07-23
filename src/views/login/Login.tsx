import React, { useState } from 'react'
import { Dispatch } from 'redux'
import { Form, notification, Button, Input, Icon, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import styles from './Login.module.less'
import { requestFn } from '../../utils/request'
import { useDispatch } from '../../store/Store'
import { Actions } from '../../store/Actions'
import { setStore } from '../../utils/util'

interface Params {
  userName: string
  password: string
}

const LoginForm = (props: FormComponentProps) => {
  const [loading, setLoading] = useState(false)
  const dispatch: Dispatch<Actions> = useDispatch()

  const { getFieldDecorator, getFieldsValue, validateFields } = props.form

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validateFields((err: any) => {
      if (!err) {
        setLoading(true)
        const fieldValue = getFieldsValue(['userName', 'password'])
        loginRequest(fieldValue as Params)
      }
    })
  }

  const loginRequest = async (fieldValue: Params) => {
    const res = await requestFn(dispatch, {
      url: '/login',
      method: 'post',
      params: {},
      data: {
        username: fieldValue.userName,
        password: fieldValue.password
      }
    })
    if (res && res.status === 200 && res.data) {
      console.log(res)
    } else {
      setLoading(false)
      setStore('token', 'login_success')
      // errorTips('登录失败', res && res.data && res.data.message ? res.data.message : '请求错误，请重试！')
      // 使用原生跳转，以更新权限
      window.location.href = window.location.origin
    }
  }

  const errorTips = (message = '', description = '') => {
    notification.error({
      message,
      description
    })
  }

  const goLabSpace = () => {
    window.location.href = window.location.origin
  }

  return (
    <div>
      <div className={styles.LoginContainer}>
        <div className={styles.FormWrapper}>
          <div className={styles.VideoWrapper}></div>
          <div className={styles.LoginForm}>
            <label className={styles.Title}>用户登录</label>
            <Form onSubmit={handleSubmit} className={styles.Form}>
              <Form.Item>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入用户名' }]
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码' }]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )}
              </Form.Item>
              <Form.Item className={styles.FormRow}>
                <div className={styles.ForgetPasswordFormItem}>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true
                  })(<Checkbox>记住用户名</Checkbox>)}
                  <a className={styles.ForgetPassword} href="/">
                    忘记密码
                  </a>
                </div>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  className={`${styles.FormButton} ${styles.LoginButton}`}
                >
                  登录
                </Button>
                <Button type="primary" ghost size="large" className={`${styles.FormButton}`}>
                  注册
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" ghost block size="large" onClick={goLabSpace}>
                  实验空间账号登录
                </Button>
              </Form.Item>
            </Form>
            <p className={styles.Experience}>免注册在先体验</p>
          </div>
        </div>
      </div>
      <div className={styles.Bottom}>
        <div className={styles.NoticeWrapper}></div>
        <div className={styles.Information}></div>
      </div>
    </div>
  )
}

const Login = Form.create<FormComponentProps>({ name: 'LoginForm' })(LoginForm)

export default Login
