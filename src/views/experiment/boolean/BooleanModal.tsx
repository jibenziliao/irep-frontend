import React, { useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Tabs, Button } from 'antd'
import styles from './BooleanModal.module.less'
import Steps from '../../../components/steps/Steps'
import Knowledge from '../../../components/knowledge/Knowledge'
import Examination from '../../../components/examination/Examination'
import { booleanCompletionQuestions, booleanChoiceQuestions } from '../../../config/Constant'
import BooleanExperiment from './BooleanExperiment'

import { booleanKnowledge } from '../../../config/booleanKnowledge'

const { TabPane } = Tabs

/**
 * 布尔模型实验
 */
const BooleanModalComponet = (props: RouteComponentProps) => {
  const [activeTabKey, setActiveTabKey] = useState('3')
  const [tabDisabled, setTabDisabled] = useState(true)

  const handleClick = () => {
    props.history.replace('/experiment/vectorSpace')
  }

  /**
   * 知识自查，完成后前往构建模型tab页
   */
  const goNextStep = () => {
    setActiveTabKey('3')
    setTabDisabled(false)
  }

  /**
   * 点击tab
   */
  const tabClick = (tabIndex: string) => {
    setActiveTabKey(tabIndex)
  }

  const operations = <Button onClick={handleClick}>跳过(仅调试用)</Button>

  return (
    <div className={styles.Container}>
      <Steps current="构建布尔模型" finishedItems={4} />
      <div className={styles.Content}>
        <Tabs defaultActiveKey="1" activeKey={activeTabKey} onTabClick={tabClick} tabBarExtraContent={operations}>
          <TabPane tab="温故知新" key="1" disabled={!tabDisabled}>
            <Knowledge knowledge={booleanKnowledge} />
          </TabPane>
          <TabPane tab="知识自查" key="2" disabled={!tabDisabled}>
            <Examination
              completionQuestions={booleanCompletionQuestions}
              choiceQuestions={booleanChoiceQuestions}
              experimentId={4}
              goNextStep={goNextStep}
            />
          </TabPane>
          <TabPane tab="构建模型页" key="3" disabled={tabDisabled}>
            <BooleanExperiment />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

const BooleanModal = withRouter(BooleanModalComponet)

export default BooleanModal
