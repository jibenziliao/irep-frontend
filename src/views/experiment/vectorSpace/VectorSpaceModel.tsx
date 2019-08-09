import React, { useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Tabs, Button } from 'antd'
import styles from './VectorSpaceModal.module.less'
import Steps from '../../../components/steps/Steps'
import Knowledge from '../../../components/knowledge/Knowledge'
import Examination from '../../../components/examination/Examination'
import { vectorSpaceCompletionQuestions, vectorSpaceChoiceQuestions } from '../../../config/Constant'
import { vectorSpaceKnowledge } from '../../../config/vectorSpaceKnowledge'
import VectorSpaceExperiment from './VectorSpaceExperiment'
import { getUrlParam } from '../../../utils/util'

const { TabPane } = Tabs

const defaultTab = getUrlParam('tab')

/**
 * 向量空间模型实验
 */
const VectorSpaceModalComponet = (props: RouteComponentProps) => {
  const [activeTabKey, setActiveTabKey] = useState(defaultTab || '1')
  const [tabDisabled, setTabDisabled] = useState(defaultTab !== '3')

  const handleClick = () => {
    props.history.replace('/experiment/probability')
  }

  /**
   * 知识自查，完成后前往构建模型tab页
   */
  const goNextStep = () => {
    setActiveTabKey('3')
    updateHistory('/experiment/vectorSpace?tab=3')
    setTabDisabled(false)
  }

  /**
   * 更新浏览器历史记录
   *
   * 方便刷新页面时保持tab状态
   */
  const updateHistory = (url: string, name = '') => {
    window.history.replaceState(null, name, url)
  }

  /**
   * 点击tab
   */
  const tabClick = (tabIndex: string) => {
    updateHistory(`/experiment/vectorSpace?tab=${tabIndex}`)
    setActiveTabKey(tabIndex)
  }

  const operations = <Button onClick={handleClick}>跳过(仅调试用)</Button>

  return (
    <div className={styles.Container}>
      <Steps current="构建向量空间模型" finishedItems={5} />
      <div className={styles.Content}>
        <Tabs defaultActiveKey="1" activeKey={activeTabKey} onTabClick={tabClick} tabBarExtraContent={operations}>
          <TabPane tab="温故知新" key="1" disabled={!tabDisabled}>
            <Knowledge knowledge={vectorSpaceKnowledge} />
          </TabPane>
          <TabPane tab="知识自查" key="2" disabled={!tabDisabled}>
            <Examination
              completionQuestions={vectorSpaceCompletionQuestions}
              choiceQuestions={vectorSpaceChoiceQuestions}
              experimentId={5}
              goNextStep={goNextStep}
            />
          </TabPane>
          <TabPane tab="构建模型页" key="3" disabled={tabDisabled}>
            <VectorSpaceExperiment />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

const VectorSpaceModal = withRouter(VectorSpaceModalComponet)

export default VectorSpaceModal
