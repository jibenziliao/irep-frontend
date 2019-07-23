import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import styles from './LanguageModal.module.scss'
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
      <Steps />
      <div className={styles.Content}>
        <h1>语言模型实验</h1>
        <button onClick={handleClick}>下一步</button>
      </div>
    </div>
  )
}

const LanguageModal = withRouter(LanguageModalComponet)

export default LanguageModal
