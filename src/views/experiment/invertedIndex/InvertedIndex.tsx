import React, { useState, useCallback } from 'react'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Tabs, notification, Button } from 'antd'
import styles from './InvertedIndex.module.less'
import Steps from '../../../components/steps/Steps'
import Knowledge from '../../../components/knowledge/Knowledge'
import Examination, { ScoreObj } from '../../../components/examination/Examination'
import { invertedIndexCompletionQuestions, invertedIndexChoiceQuestions } from '../../../config/Constant'
import { requestFn } from '../../../utils/request'
import { useDispatch, useMappedState, State } from '../../../store/Store'
import { Actions } from '../../../store/Actions'
import { invertedIndexKnowledge } from '../../../config/invertedIndexKnowledge'

const { TabPane } = Tabs

/**
 * 倒排索引
 */
const InvertedIndexComponent = (props: RouteComponentProps) => {
  const [examLoading, setExamLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeTabKey, setActiveTabKey] = useState('1')
  const [tabDisabled, setTabDisabled] = useState(true)
  const dispatch: Dispatch<Actions> = useDispatch()
  const state: State = useMappedState(useCallback((globalState: State) => globalState, []))
  const handleClick = () => {
    props.history.replace('/experiment/boolean')
  }

  /**
   * 保存知识自查分数到后台
   */
  const saveExaminationScore = async (scoreObj: ScoreObj) => {
    setExamLoading(true)
    // TODO: 保存知识自查分数到后台接口
    const res = await requestFn(dispatch, {
      url: '/updateScore', // 接口还没完成，这里是个假的示例
      method: 'post',
      params: {},
      data: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        experiment_id: 'xxx', // 更新指定实验的知识自查分数
        score: scoreObj.choiceScore + scoreObj.completionSore
      }
    })
    if (res && res.status === 200 && res.data) {
      // 保存分数成功
      // TODO: 保存成功后，切换到构建模型tab页
      setActiveTabKey('3')
      setTabDisabled(false)
    } else {
      // 保存分数失败
      errorTips('保存分数失败', res && res.data && res.data.message ? res.data.message : '请求错误，请重试！')
      setActiveTabKey('3')
      setTabDisabled(false)
    }
    setExamLoading(false)
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

  const operations = <Button onClick={handleClick}>跳过(仅调试用)</Button>

  return (
    <div className={styles.Container}>
      <Steps current="构建倒排索引表" finishedItems={2} />
      <div className={styles.Content}>
        <Tabs defaultActiveKey="1" activeKey={activeTabKey} onTabClick={tabClick} tabBarExtraContent={operations}>
          <TabPane tab="温故知新" key="1" disabled={!tabDisabled}>
            <Knowledge knowledge={invertedIndexKnowledge} />
          </TabPane>
          <TabPane tab="知识自查" key="2" disabled={!tabDisabled}>
            <Examination
              completionQuestions={invertedIndexCompletionQuestions}
              choiceQuestions={invertedIndexChoiceQuestions}
              save={saveExaminationScore}
              loading={examLoading}
            />
          </TabPane>
          <TabPane tab="构建模型页" key="3" disabled={tabDisabled}>
            <button onClick={handleClick}>下一步</button>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

const InvertedIndex = withRouter(InvertedIndexComponent)

export default InvertedIndex
