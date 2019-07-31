import React, { useState, useCallback } from 'react'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Tabs, notification, Button } from 'antd'
import styles from './Entry.module.less'
import StepsExam from '../../../components/steps/StepsExam'
import EntryExperiment from './EntryExperiment'
import { entryCompletionQuestions, entryChoiceQuestions } from '../../../config/Constant'
import Examination from '../../../components/examination/Examination'
import { requestFn } from '../../../utils/request'
import { useDispatch, useMappedState, State, ExperimentCard } from '../../../store/Store'
import { Actions } from '../../../store/Actions'
import Knowledge from '../../../components/knowledge/Knowledge'
import { entryKnowledge } from '../../../config/entryKnowledge'

const { TabPane } = Tabs

const EntryComponent = (props: RouteComponentProps) => {
  const [loading, setLoading] = useState(false)
  const [activeTabKey, setActiveTabKey] = useState('1')
  const [tabDisabled, setTabDisabled] = useState(true)
  const dispatch: Dispatch<Actions> = useDispatch()
  const state: State = useMappedState(useCallback((globalState: State) => globalState, []))

  /**
   * 成功提示
   */
  const successTips = (message = '', description = '') => {
    notification.success({
      message,
      duration: 1,
      description
    })
  }

  /**
   * 错误提示
   */
  const errorTips = (message = '', description = '') => {
    notification.error({
      message,
      description
    })
  }

  /**
   * 点击tab
   */
  const tabClick = (tabIndex: string) => {
    setActiveTabKey(tabIndex)
  }

  /**
   * 获取用户排序的索引
   */
  const getStepIndex = (steps: { name: string }[], cards: ExperimentCard[]) => {
    const stepIndex = []
    for (let i of steps) {
      const index = cards.findIndex(j => j.name === i.name)
      // 接口排序的index从1开始
      stepIndex.push(cards[index].index + 1)
    }
    return stepIndex
  }

  /**
   * 知识自查，完成后前往构建模型tab页
   */
  const goNextStep = () => {
    setActiveTabKey('3')
    setTabDisabled(false)
  }

  /**
   * 保存构建模型并前往下一步
   */
  const saveExperiment = async () => {
    setLoading(true)
    const res = await requestFn(dispatch, {
      url: '/score/updateRankingScore', // 接口还没完成，这里是个假的示例
      method: 'post',
      params: {},
      data: {
        experimentId: 1,
        rankingResult: getStepIndex(state.steps, state.entryExperimentCards)
      }
    })
    if (res && res.status === 200 && res.data && res.data.code === 0) {
      successTips('保存顺序成功', '')
      setTimeout(() => {
        setLoading(false)
        props.history.replace('/experiment/pretreatment')
      }, 1000)
    } else {
      setLoading(false)
      // 保存顺序失败
      errorTips('保存顺序失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
      props.history.replace('/experiment/pretreatment')
    }
  }

  const operations = (
    <Button
      onClick={() => {
        props.history.replace('/experiment/pretreatment')
      }}
    >
      跳过(仅调试用)
    </Button>
  )

  return (
    <div className={styles.Container}>
      <StepsExam />
      <div className={styles.Content}>
        <Tabs defaultActiveKey="1" activeKey={activeTabKey} onTabClick={tabClick} tabBarExtraContent={operations}>
          <TabPane tab="温故知新" key="1" disabled={!tabDisabled}>
            <Knowledge knowledge={entryKnowledge} />
          </TabPane>
          <TabPane tab="知识自查" key="2" disabled={!tabDisabled}>
            <Examination
              completionQuestions={entryCompletionQuestions}
              choiceQuestions={entryChoiceQuestions}
              experimentId={1}
              goNextStep={goNextStep}
            />
          </TabPane>
          <TabPane tab="构建模型页" key="3" disabled={tabDisabled}>
            <EntryExperiment save={saveExperiment} loading={loading} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

const Entry = withRouter(EntryComponent)

export default Entry
