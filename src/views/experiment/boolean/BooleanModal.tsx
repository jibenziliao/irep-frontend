import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import styles from './BooleanModal.module.less'
import Steps from '../../../components/steps/Steps'

/**
 * 布尔模型实验
 */
const BooleanModalComponet = (props: RouteComponentProps) => {
  const handleClick = () => {
    props.history.replace('/experiment/vectorSpace')
  }

  return (
    <div className={styles.Container}>
      <Steps />
      <div className={styles.Content}>
        <h1>布尔模型实验</h1>
        <button onClick={handleClick}>下一步</button>
      </div>
    </div>
  )
}

const BooleanModal = withRouter(BooleanModalComponet)

export default BooleanModal
