import React from 'react'
import { Icon } from 'antd'
import styles from './StepsExam.module.less'

const steps = [
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  }
]

const StepsExam = () => {
  const renderIcon = (name: string) => {
    if (name) {
      return <Icon type="close-circle" />
    }
  }
  const renderSteps = () => {
    return steps.map((i, index) => {
      return (
        <div key={index} className={`${styles.Item}`}>
          <span className={`${styles.Name}`}>{i.name}</span>
          {renderIcon(i.name)}
        </div>
      )
    })
  }
  return <div className={styles.Container}>{renderSteps()}</div>
}

export default StepsExam
