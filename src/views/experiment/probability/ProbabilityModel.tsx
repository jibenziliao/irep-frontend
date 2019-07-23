import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import styles from './ProbabilityModal.module.scss'
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
      <Steps />
      <div className={styles.Content}>
        <h1>概率检索模型实验</h1>
        <button onClick={handleClick}>下一步</button>
      </div>
    </div>
  )
}

const ProbabilityModal = withRouter(ProbabilityModalComponet)

export default ProbabilityModal
