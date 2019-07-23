import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import styles from './Pretreatment.module.less'
import Steps from '../../../components/steps/Steps'

/**
 * 预处理实验
 */
const PretreatmentComponet = (props: RouteComponentProps) => {
  const handleClick = () => {
    props.history.replace('/experiment/invertedIndex')
  }

  return (
    <div className={styles.Container}>
      <Steps />
      <div className={styles.Content}>
        <h1>预处理实验</h1>
        <button onClick={handleClick}>下一步</button>
      </div>
    </div>
  )
}

const Pretreatment = withRouter(PretreatmentComponet)

export default Pretreatment
