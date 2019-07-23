import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import styles from './InvertedIndex.module.less'
import Steps from '../../../components/steps/Steps'

/**
 * 倒排索引
 */
const InvertedIndexComponent = (props: RouteComponentProps) => {
  const handleClick = () => {
    props.history.replace('/experiment/boolean')
  }

  return (
    <div className={styles.Container}>
      <Steps />
      <div className={styles.Content}>
        <h1>倒排索引实验</h1>
        <button onClick={handleClick}>下一步</button>
      </div>
    </div>
  )
}

const InvertedIndex = withRouter(InvertedIndexComponent)

export default InvertedIndex
