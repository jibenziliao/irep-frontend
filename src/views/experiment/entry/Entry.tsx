import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import styles from './Entry.module.less'

const EntryComponent = (props: RouteComponentProps) => {
  const handleClick = () => {
    props.history.replace('/experiment/pretreatment')
  }
  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <h1>入口实验</h1>
        <button onClick={handleClick}>下一步</button>
      </div>
    </div>
  )
}

const Entry = withRouter(EntryComponent)

export default Entry
