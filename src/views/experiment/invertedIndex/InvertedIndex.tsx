import React, { useState, useCallback, useEffect } from 'react'
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
import InvertedIndexExperiment from './InvertedIndexExperiment'

const { TabPane } = Tabs

/**
 * 倒排索引
 */
const InvertedIndexComponent = (props: RouteComponentProps) => {
  const [examLoading, setExamLoading] = useState(false)
  const [activeTabKey, setActiveTabKey] = useState('1')
  const [tabDisabled, setTabDisabled] = useState(true)
  const dispatch: Dispatch<Actions> = useDispatch()
  const state: State = useMappedState(useCallback((globalState: State) => globalState, []))

  useEffect(() => {
    /**
     * 更新加载索引的请求状态和成功状态
     */
    const updateLoadindexStatus = (loading: boolean, success?: boolean) => {
      dispatch({
        type: 'update_loadindex',
        payload: {
          loadindexLoading: loading,
          ...(success !== undefined ? { loadindexSuccess: success } : {})
        }
      })
    }

    /**
     * 加载索引
     */
    const loadIndex = async () => {
      const res = await requestFn(dispatch, {
        url: '/IRforCN/invertedIndex/loadIndex',
        method: 'post'
      })
      if (res && res.status === 200 && parseInt(res.data.code) === 1) {
        updateLoadindexStatus(false, true)
      } else {
        updateLoadindexStatus(false, false)
        errorTips('加载索引失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
      }
    }

    /**
     * 根据loading状态判断是否需要加载索引
     */
    const initLoadIndex = (loading: boolean) => {
      if (loading) {
        loadIndex()
      }
    }

    /**
     * state.loadindexLoading发生变换时，触发此钩子中的函数
     */
    initLoadIndex(state.loadindexLoading)
  }, [dispatch, state.loadindexLoading])

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
      errorTips('保存分数失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
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

  const operations = (
    <Button disabled type="primary" onClick={handleClick}>
      跳过(仅调试用)
    </Button>
  )

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
            <InvertedIndexExperiment />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

const InvertedIndex = withRouter(InvertedIndexComponent)

export default InvertedIndex
