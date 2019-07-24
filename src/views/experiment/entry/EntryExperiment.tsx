import React from 'react'
import { Button } from 'antd'

interface ExperimaentProps {
  save: () => void
}

/**
 * 入口实验构建模型
 */
const EntryExperiment = (props: ExperimaentProps) => {
  const handleClick = () => {
    props.save()
  }

  return (
    <div>
      <h1>构建模型，我是构建模型操作</h1>
      <h1>点击保存，保存构建模型操作，并前往下一步实验</h1>
      <Button type="primary" onClick={handleClick}>
        保存
      </Button>
    </div>
  )
}

export default EntryExperiment
