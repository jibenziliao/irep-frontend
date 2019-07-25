import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import styles from './LanguageModal.module.less'
import Steps from '../../../components/steps/Steps'

/**
 * 语言模型实验
 */
const LanguageModalComponet = (props: RouteComponentProps) => {
  const handleClick = () => {
    props.history.replace('/experiment/evaluation')
  }

  return (
    <div className={styles.Container}>
      <Steps current="构建语言模型" finishedItems={7} />
      <div className={styles.Content}>
        <h1>语言模型实验</h1>
        <button onClick={handleClick}>下一步</button>
      </div>
    </div>
  )
}

const LanguageModal = withRouter(LanguageModalComponet)

export default LanguageModal
