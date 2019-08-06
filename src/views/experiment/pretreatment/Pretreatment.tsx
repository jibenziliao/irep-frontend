import React, { useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Tabs, Button } from 'antd'
import styles from './Pretreatment.module.less'
import Steps from '../../../components/steps/Steps'
import Knowledge from '../../../components/knowledge/Knowledge'
import Examination from '../../../components/examination/Examination'
import { pretreatmentCompletionQuestions, pretreatmentChoiceQuestions } from '../../../config/Constant'
import { pretreatmentKnowledge } from '../../../config/pretreatmentKnowledge'
import PretreatmentExperiment from './PretreatmentExperiment'

const { TabPane } = Tabs

/**
 * 预处理实验
 */
const PretreatmentComponet = (props: RouteComponentProps) => {
  const [activeTabKey, setActiveTabKey] = useState('1')
  const [tabDisabled, setTabDisabled] = useState(true)

  const handleClick = () => {
    props.history.replace('/experiment/invertedIndex')
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
      <Steps current="构建预处理器" finishedItems={1} />
      <div className={styles.Content}>
        <Tabs defaultActiveKey="1" activeKey={activeTabKey} onTabClick={tabClick} tabBarExtraContent={operations}>
          <TabPane tab="温故知新" key="1" disabled={!tabDisabled}>
            <Knowledge knowledge={pretreatmentKnowledge} />
          </TabPane>
          <TabPane tab="知识自查" key="2" disabled={!tabDisabled}>
            <Examination
              completionQuestions={pretreatmentCompletionQuestions}
              choiceQuestions={pretreatmentChoiceQuestions}
              experimentId={2}
              goNextStep={goNextStep}
            />
          </TabPane>
          <TabPane tab="构建模型页" key="3" disabled={tabDisabled}>
            <PretreatmentExperiment />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

const Pretreatment = withRouter(PretreatmentComponet)

export default Pretreatment
