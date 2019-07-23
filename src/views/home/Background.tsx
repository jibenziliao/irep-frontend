import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styles from './Background.module.scss'

const BackgroundComponet = (props: RouteComponentProps) => {
  const switchRoute = (path: string) => {
    props.history.replace(path)
  }

  return (
    <div className={styles.Container}>
      <h1>实验背景</h1>
      <div className={styles.Content}>
        <button onClick={() => switchRoute('/introduction/background')}>实验背景</button>
        <button onClick={() => switchRoute('/introduction/team')}>支持团队</button>
        <button onClick={() => switchRoute('/introduction/architecture')}>系统架构</button>
      </div>
    </div>
  )
}

const Background = withRouter(BackgroundComponet)

export default Background
