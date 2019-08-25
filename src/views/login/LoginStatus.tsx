import React, { useState, useCallback, useEffect } from 'react'
import { Dispatch } from 'redux'
import { Actions } from '../../store/Actions'
import { notification } from 'antd'
import styles from './LoginStatus.module.less'
import { requestFn } from '../../utils/request'
import { useDispatch, useMappedState, State } from '../../store/Store'

const userCount = 500

/**
 * 登录页的登录人数统计组件
 */
const LoginStatus = () => {
  const [numberStrs, setNumberStrs] = useState([''])
  const dispatch: Dispatch<Actions> = useDispatch()
  const state: State = useMappedState(useCallback((globalState: State) => globalState, []))

  const [onlineUserNum, setOnlineUserNum] = useState(0)

  /**
   * 更新当前在线人数
   */
  useEffect(() => {
    const onlineUserNumReuqest = async () => {
      const res = await requestFn(dispatch, {
        url: '/user/queryOnline',
        method: 'get'
      })
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        successTips('更新当前在线人数成功', '')
        setOnlineUserNum(res.data.data)
      } else {
        errorTips('更新当前在线人数失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
      }
    }
    /**
     * 根据loading状态判断是否需要加载索引
     */
    const initOnlineUserNum = (loading: boolean) => {
      if (loading) {
        onlineUserNumReuqest()
      }
    }

    /**
     * state.onlineUserNumLoading发生变换时，触发此钩子中的函数
     */
    initOnlineUserNum(state.onlineUserNumLoading)
  }, [dispatch, state.onlineUserNumLoading])

  const successTips = (message = '', description = '') => {
    notification.success({
      message,
      duration: 1.5,
      description
    })
  }

  const errorTips = (message = '', description = '') => {
    notification.error({
      message,
      description
    })
  }
  const handleNumberStrs = (count: number) => {
    return count.toString().split('')
  }

  useEffect(() => {
    const getLoginUserCounts = (count: number) => {
      const userNumberStrs = handleNumberStrs(count)
      setNumberStrs(userNumberStrs)
    }

    getLoginUserCounts(userCount)
  }, [])

  const renderUserCount = () => {
    return numberStrs.map((i, index: number) => {
      return (
        <div key={index} className={styles.NumberBox}>
          {i}
        </div>
      )
    })
  }

  return (
    <div className={styles.Container}>
      <div className={styles.NumberRow}>{renderUserCount()}</div>
      <div className={styles.Tips}>您是第{userCount}位使用该系统的用户</div>
      <div className={styles.OnlineCount}>
        <span>当前在线人数</span>
        <span className={styles.OnlineNumber}>{onlineUserNum}</span>
        <span>人，</span>
        <span>排队</span>
        <span className={styles.OnlineNumber}>0</span>
        <span>人</span>
      </div>
      <div className={styles.Help}>实验中有任何问题请联系武汉大学杨老师解决&nbsp;联系电话: 18109300560</div>
    </div>
  )
}

export default LoginStatus
