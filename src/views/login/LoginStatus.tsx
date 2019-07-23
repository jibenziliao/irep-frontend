import React, { useState, useEffect } from 'react'
import styles from './LoginStatus.module.less'

const userCount = 101010

/**
 * 登录页的登录人数统计组件
 */
const LoginStatus = () => {
  const [numberStrs, setNumberStrs] = useState([''])

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
        <span className={styles.OnlineNumber}>40</span>
        <span>人，</span>
        <span>排队</span>
        <span className={styles.OnlineNumber}>10</span>
        <span>人</span>
      </div>
      <div className={styles.Help}>实验中有任何问题请联系武汉大学杨老师解决&nbsp;联系电话: 18109300560</div>
    </div>
  )
}

export default LoginStatus
