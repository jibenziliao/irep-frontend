import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import styles from './VectorSpaceModal.module.less'
import Steps from '../../../components/steps/Steps'

/**
 * 向量空间模型实验
 */
const VectorSpaceModalComponet = (props: RouteComponentProps) => {
  const handleClick = () => {
    props.history.replace('/experiment/probability')
  }

  return (
    <div className={styles.Container}>
      <Steps />
      <div className={styles.Content}>
        <h1>向量空间模型实验</h1>
        <button onClick={handleClick}>下一步</button>
      </div>
    </div>
  )
}

const VectorSpaceModal = withRouter(VectorSpaceModalComponet)

export default VectorSpaceModal
