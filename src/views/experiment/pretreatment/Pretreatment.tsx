import React, { useState } from 'react'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Tabs, notification, Button } from 'antd'
import styles from './Pretreatment.module.less'
import Steps from '../../../components/steps/Steps'
import Knowledge from '../../../components/knowledge/Knowledge'
import Examination from '../../../components/examination/Examination'
import { pretreatmentCompletionQuestions, pretreatmentChoiceQuestions } from '../../../config/Constant'
import { requestFn } from '../../../utils/request'
import { useDispatch } from '../../../store/Store'
import { Actions } from '../../../store/Actions'
import { pretreatmentKnowledge } from '../../../config/pretreatmentKnowledge'

const { TabPane } = Tabs

/**
 * 预处理实验
 */
const PretreatmentComponet = (props: RouteComponentProps) => {
  const [loading, setLoading] = useState(false)
  const [activeTabKey, setActiveTabKey] = useState('1')
  const [tabDisabled, setTabDisabled] = useState(true)
  const dispatch: Dispatch<Actions> = useDispatch()

  const handleClick = () => {
    props.history.replace('/experiment/invertedIndex')
  }

  /**
   * 构建预处理器，仅调试用
   */
  const preProcess = async () => {
    setLoading(true)
    const res = await requestFn(dispatch, {
      url: '/IRforCN/preProcessing/preProcess',
      method: 'post',
      params: {
        token: '绿茶软件园;资讯茶小编带来了qq群北',
        analyzerName: 'standard',
        isRemoveStopWord: false
      }
    })
    if (res && res.status === 200 && res.data && res.data.code === 0) {
      successTips('构建成功', '')
      setTimeout(() => {
        setLoading(false)
        props.history.replace('/experiment/invertedIndex')
      }, 1000)
    } else {
      setLoading(false)
      errorTips('构建失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
    }
  }

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
            <Button type="primary" onClick={preProcess} loading={loading}>
              构建预处理器并前往下一步(仅调试用)
            </Button>
            <button onClick={handleClick}>下一步</button>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

const Pretreatment = withRouter(PretreatmentComponet)

export default Pretreatment
