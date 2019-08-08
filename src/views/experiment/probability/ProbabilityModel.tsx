import React, { useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Tabs, Button } from 'antd'
import styles from './ProbabilityModal.module.less'
import Steps from '../../../components/steps/Steps'
import Knowledge from '../../../components/knowledge/Knowledge'
import Examination from '../../../components/examination/Examination'
import { probabilityCompletionQuestions, probabilityChoiceQuestions } from '../../../config/Constant'
import { probabilityKnowledge } from '../../../config/probabilityKnowledge'
import ProbabilityExperiment from './ProbabilityExperiment'

const { TabPane } = Tabs

/**
 * 概率检索模型实验
 */
const ProbabilityModalComponet = (props: RouteComponentProps) => {
  const [activeTabKey, setActiveTabKey] = useState('1')
  const [tabDisabled, setTabDisabled] = useState(true)

  const handleClick = () => {
    props.history.replace('/experiment/language')
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
      <Steps current="构建概率检索模型" finishedItems={6} />
      <div className={styles.Content}>
        <Tabs defaultActiveKey="1" activeKey={activeTabKey} onTabClick={tabClick} tabBarExtraContent={operations}>
          <TabPane tab="温故知新" key="1" disabled={!tabDisabled}>
            <Knowledge knowledge={probabilityKnowledge} />
          </TabPane>
          <TabPane tab="知识自查" key="2" disabled={!tabDisabled}>
            <Examination
              completionQuestions={probabilityCompletionQuestions}
              choiceQuestions={probabilityChoiceQuestions}
              experimentId={6}
              goNextStep={goNextStep}
            />
          </TabPane>
          <TabPane tab="构建模型页" key="3" disabled={tabDisabled}>
            <ProbabilityExperiment />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

const ProbabilityModal = withRouter(ProbabilityModalComponet)

export default ProbabilityModal
