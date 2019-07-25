import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import styles from './ProbabilityModal.module.less'
import Steps from '../../../components/steps/Steps'

/**
 * 概率检索模型实验
 */
const ProbabilityModalComponet = (props: RouteComponentProps) => {
  const handleClick = () => {
    props.history.replace('/experiment/language')
  }

  return (
    <div className={styles.Container}>
      <Steps current="构建概率检索模型" finishedItems={6} />
      <div className={styles.Content}>
        <h1>概率检索模型实验</h1>
        <button onClick={handleClick}>下一步</button>
      </div>
    </div>
  )
}

const ProbabilityModal = withRouter(ProbabilityModalComponet)

export default ProbabilityModal
