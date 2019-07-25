import React, { useState } from 'react'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Tabs, notification } from 'antd'
import styles from './Entry.module.less'
import StepsExam from '../../../components/steps/StepsExam'
import EntryExperiment from './EntryExperiment'
import { entryCompletionQuestions, entryChoiceQuestions } from '../../../config/Constant'
import Examination, { ScoreObj } from '../../../components/examination/Examination'
import { requestFn } from '../../../utils/request'
import { useDispatch } from '../../../store/Store'
import { Actions } from '../../../store/Actions'
import Knowledge from '../../../components/knowledge/Knowledge'

const { TabPane } = Tabs

const EntryComponent = (props: RouteComponentProps) => {
  const [examLoading, setExamLoading] = useState(false)
  const [activeTabKey, setActiveTabKey] = useState('1')
  const [tabDisabled, setTabDisabled] = useState(true)
  const dispatch: Dispatch<Actions> = useDispatch()

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

  /**
   * 保存构建模型并前往下一步
   */
  const saveExperiment = () => {
    props.history.replace('/experiment/pretreatment')
  }

  return (
    <div className={styles.Container}>
      <StepsExam />
      <div className={styles.Content}>
        <Tabs defaultActiveKey="1" activeKey={activeTabKey} onTabClick={tabClick}>
          <TabPane tab="温故知新" key="1" disabled={!tabDisabled}>
            <Knowledge />
          </TabPane>
          <TabPane tab="知识自查" key="2" disabled={!tabDisabled}>
            <Examination
              completionQuestions={entryCompletionQuestions}
              choiceQuestions={entryChoiceQuestions}
              save={saveExaminationScore}
              loading={examLoading}
            />
          </TabPane>
          <TabPane tab="构建模型页" key="3" disabled={tabDisabled}>
            <EntryExperiment save={saveExperiment} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

const Entry = withRouter(EntryComponent)

export default Entry
