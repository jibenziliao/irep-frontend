import React, { useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Tabs, Button } from 'antd'
import styles from './Evaluation.module.less'
import Steps from '../../../components/steps/Steps'
import Knowledge from '../../../components/knowledge/Knowledge'
import Examination from '../../../components/examination/Examination'
import { evaluationCompletionQuestions, evaluationChoiceQuestions } from '../../../config/Constant'
import { evaluationKnowledge } from '../../../config/evaluationKnowledge'
import EvluationExperiment from './EvaluationExperiment'

const { TabPane } = Tabs

/**
 * 模型评价
 */
const EvaluationComponet = (props: RouteComponentProps) => {
  const [activeTabKey, setActiveTabKey] = useState('3')
  const [tabDisabled, setTabDisabled] = useState(true)

  const handleClick = () => {
    props.history.replace('/experiment/simulation')
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
      <Steps current="分析检索模型性能" finishedItems={8} />
      <div className={styles.Content}>
        <Tabs defaultActiveKey="1" activeKey={activeTabKey} onTabClick={tabClick} tabBarExtraContent={operations}>
          <TabPane tab="温故知新" key="1" disabled={!tabDisabled}>
            <Knowledge knowledge={evaluationKnowledge} />
          </TabPane>
          <TabPane tab="知识自查" key="2" disabled={!tabDisabled}>
            <Examination
              completionQuestions={evaluationCompletionQuestions}
              choiceQuestions={evaluationChoiceQuestions}
              experimentId={8}
              goNextStep={goNextStep}
            />
          </TabPane>
          <TabPane tab="构建模型页" key="3" disabled={tabDisabled}>
            <EvluationExperiment />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

const Evaluation = withRouter(EvaluationComponet)

export default Evaluation
