import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import styles from './Evaluation.module.less'
import Steps from '../../../components/steps/Steps'

/**
 * 模型评价
 */
const EvaluationComponet = (props: RouteComponentProps) => {
  const handleClick = () => {
    props.history.replace('/experiment/simulation')
  }

  return (
    <div className={styles.Container}>
      <Steps current="分析检索模型性能" finishedItems={8} />
      <div className={styles.Content}>
        <h1>模型评价</h1>
        <button onClick={handleClick}>下一步</button>
      </div>
    </div>
  )
}

const Evaluation = withRouter(EvaluationComponet)

export default Evaluation
