import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import styles from './Experiment.module.scss'

/**
 * 预处理实验
 */
const ExperimentComponent = (props: RouteComponentProps) => {
  const handleClick = () => {
    props.history.replace('/experiment/entry')
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <h1>我的实验</h1>
        <button onClick={handleClick}>开始实验</button>
      </div>
    </div>
  )
}

const Experiment = withRouter(ExperimentComponent)

export default Experiment
