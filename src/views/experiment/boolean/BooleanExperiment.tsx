import React, { useCallback, useEffect, useState } from 'react'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button, Icon, Radio, InputNumber, Select, notification, Input, Spin, Table } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import styles from './BooleanExperiment.module.less'
import Arrow from '../../../assets/experiment/vectorSpace/arrow.png'
import { useDispatch, useMappedState, State, ExperimentCard } from '../../../store/Store'
import { Actions } from '../../../store/Actions'
import { requestFn } from '../../../utils/request'

const BooleanExperimentComponent = (props: RouteComponentProps) => {
  const dispatch: Dispatch<Actions> = useDispatch()
  const state: State = useMappedState(useCallback((globalState: State) => globalState, []))
  // 保存顺序加载状态
  const [saveOrderLoading, setSaveOrderLoading] = useState(false)
  // 保存顺序按钮禁用状态
  const [saveOrderDisabled, setSaveOrderDisabled] = useState(true)
  // 仿真我的搜索引擎，输入框中的值
  const [query, setQuery] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  // 仿真我的搜索引擎步骤索引
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  // 仿真我的搜索引擎，每一步的请求loading状态
  const [stepLoading, setStepLoading] = useState(false)

  /**
   * 保存用户选择的构建顺序
   */
  const saveOrder = async () => {
    setSaveOrderLoading(true)
    const res = await requestFn(dispatch, {
      url: '/score/updateRankingScore', // 接口还没完成，这里是个假的示例
      method: 'post',
      data: {
        experimentId: 5,
        rankingResult: getStepIndex(state.vectorSteps, state.vectorSpaceCards)
      }
    })
    if (res && res.status === 200 && res.data && res.data.code === 0) {
      successTips('保存顺序成功', '')
      setSaveOrderDisabled(true)
    } else {
      // 保存顺序失败
      errorTips('保存顺序失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
    }
    setSaveOrderLoading(false)
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
   * 获取用户排序的索引
   */
  const getStepIndex = (steps: { name: string }[], cards: ExperimentCard[]) => {
    const newCards = cards.map(i => i)
    newCards.sort((pre, cur) => pre.correctIndex - cur.correctIndex)
    const stepIndex = []
    for (let i of newCards) {
      const index = steps.findIndex(j => j.name === i.name)
      // 接口排序的index从1开始
      stepIndex.push(index + 1)
    }
    return stepIndex
  }

  /**
   * 点击方框移除已放入的卡片
   */
  const removeCard = (name: string, index: number) => {
    dispatch({
      type: 'handle_booleanExperiment_card',
      payload: {
        name,
        type: 'remove',
        index
      }
    })
  }

  /**
   * 点击方框放入卡片
   */
  const addCard = (index: number) => {
    const currentIndex = state.booleanExperimentCards.findIndex(i => i.current)
    if (currentIndex === -1) {
      return false
    }
    dispatch({
      type: 'handle_booleanExperiment_card',
      payload: {
        name: '',
        type: 'add',
        index
      }
    })
  }

  /**
   * 渲染方框中的卡片
   */
  const renderCard = (name: string, index: number) => {
    if (name) {
      return (
        <div className={`${styles.Name}`} onClick={() => removeCard(name, index)}>
          <span>{`${index + 1}.${name}`}</span>
          <div className={styles.IconWrapper}>
            <Icon type="close-circle" className={styles.Icon} />
          </div>
        </div>
      )
    } else {
      return (
        <span className={styles.Index} onClick={() => addCard(index)}>
          {index + 1}
        </span>
      )
    }
  }

  /**
   * 选中卡片
   */
  const selectCard = (name: string, index: number, disabled: boolean) => {
    if (disabled) {
      return false
    }
    dispatch({
      type: 'handle_booleanExperiment_card',
      payload: {
        name,
        type: 'selected',
        index
      }
    })
  }

  /**
   * 渲染卡片排序区域
   */
  const renderCardSection = () => {
    return (
      <>
        <div className={styles.ExamBox}>
          <div className={styles.BoxWrapper}>
            <div className={styles.BoxGroup}>
              <div className={styles.BoxItem}>{renderCard(state.booleanExperimentSteps[0].name, 0)}</div>
            </div>
            <div className={styles.ArrowGroup}>
              <div className={styles.ArrowBox}>
                <img className={styles.Arrow} src={Arrow} alt="箭头" />
              </div>
            </div>
            <div className={styles.BoxGroup}>
              <div className={styles.BoxItem}>{renderCard(state.booleanExperimentSteps[1].name, 1)}</div>
            </div>
            <div className={styles.ArrowGroup}>
              <div className={styles.ArrowBox}>
                <img className={styles.Arrow} src={Arrow} alt="箭头" />
              </div>
            </div>
            <div className={styles.BoxGroup}>
              <div className={styles.BoxItem}>{renderCard(state.booleanExperimentSteps[2].name, 2)}</div>
            </div>
            <div className={styles.ArrowGroup}>
              <div className={styles.ArrowBox}>
                <img className={styles.Arrow} src={Arrow} alt="箭头" />
              </div>
            </div>
            <div className={styles.BoxGroup}>
              <div className={styles.BoxItem}>{renderCard(state.booleanExperimentSteps[3].name, 3)}</div>
            </div>
          </div>
        </div>
        <div className={styles.BoxContainer}>{renderCards()}</div>
        <div className={styles.SaveOrder}>
          <Button type="primary" disabled={saveOrderDisabled} loading={saveOrderLoading} onClick={saveOrder}>
            保存
          </Button>
        </div>
      </>
    )
  }

  /**
   * 渲染卡片列表
   */
  const renderCards = () => {
    return state.booleanExperimentCards.map((i, index) => {
      return (
        <div
          key={index}
          className={`${styles.Card} ${i.disabled ? styles.CardDisabled : i.current ? styles.CurrentCard : ''}`}
          onClick={() => selectCard(i.name, index, i.disabled)}
        >
          {i.name}
        </div>
      )
    })
  }

  /**
   * 检索请求
   */
  const searchQuery = async () => {
    setSearchLoading(true)
    const res = await requestFn(dispatch, {
      url: '/IRforCN/Retrieval/boolModel/search',
      method: 'post',
      params: {
        query
      }
    })
    if (res && res.status === 200 && res.data) {
      console.log('检索成功')
    } else {
      errorTips('检索失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
    }
    setSearchLoading(false)
  }

  /**
   * 更新仿真我的搜索引擎的检索条件
   */
  const updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }
  /**
   * 渲染仿真我的搜索引擎区域的表单
   */
  const renderSearchForm = () => {
    return (
      <div className={styles.SearchWrapper}>
        <div className={styles.SearchRow}>
          <Button className={styles.Button} type="primary">
            <Icon type="plus" />
          </Button>
          <span className={styles.SearchLabel}>基础条件:</span>
          <Input autoComplete="off" size="large" value={query} onChange={updateQuery} />
          <Button type="primary" size="large" onClick={searchQuery}>
            检索
          </Button>
        </div>
        <div className={styles.SearchRow}>
          <Button className={styles.Button} type="primary">
            <Icon type="minus" />
          </Button>
          <span className={styles.SearchLabel}>基础条件:</span>
          <Input autoComplete="off" size="large" value={query} onChange={updateQuery} />
        </div>
      </div>
    )
  }

  /**
   * 仿真我的搜索引擎
   */
  const getMonitorResult = async (url: string, index: number) => {
    setStepLoading(true)
    const res = await requestFn(dispatch, {
      url,
      method: 'post',
      params: {
        query
      }
    })
    if (res && res.status === 200 && res.data) {
      setCurrentStepIndex(index + 1)
    } else {
      errorTips('检索失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
    }
    setStepLoading(false)
  }
  /**
   * 处理当前步骤的按钮点击事件
   */
  const handleCurrentStep = (index: number) => {
    const requestUrls = [
      '/IRforCN/Retrieval/boolModel/ppq',
      '/IRforCN/Retrieval/boolModel/boolVector',
      '/IRforCN/Retrieval/boolModel/booleanOperation',
      '/IRforCN/Retrieval/boolModel/callbackResult'
    ]
    getMonitorResult(requestUrls[index], index)
  }

  /**
   * 渲染仿真我的搜索引擎模块，每个步骤按钮的点击状态
   */
  const renderStepButton = (name: string, loading: boolean, setpIndex: number) => {
    if (currentStepIndex >= setpIndex) {
      return (
        <Button
          loading={currentStepIndex === setpIndex && loading}
          type="link"
          className={styles.LinkButton}
          onClick={() => handleCurrentStep(setpIndex)}
        >
          {name}
        </Button>
      )
    } else {
      return <span>{name}</span>
    }
  }

  /**
   * 渲染检索步骤
   */
  const renderSearchSteps = () => {
    if (saveOrderDisabled) {
      return (
        <div>
          <div className={styles.ExamBox}>
            <div className={styles.BoxWrapper}>
              <div className={styles.BoxGroup}>
                <div
                  className={`${styles.BoxItem} ${styles.StepItem} ${currentStepIndex < 0 ? styles.DisabledBox : ''}`}
                >
                  {renderStepButton('查询预处理', stepLoading, 0)}
                </div>
              </div>
              <div className={styles.ArrowGroup}>
                <div className={styles.ArrowBox}>
                  <img className={`${styles.Arrow} ${styles.Right}`} src={Arrow} alt="箭头" />
                </div>
              </div>
              <div className={styles.BoxGroup}>
                <div
                  className={`${styles.BoxItem} ${styles.StepItem} ${currentStepIndex < 1 ? styles.DisabledBox : ''}`}
                >
                  {renderStepButton('计算布尔向量', stepLoading, 1)}
                </div>
              </div>
              <div className={styles.ArrowGroup}>
                <div className={styles.ArrowBox}>
                  <img className={`${styles.Arrow} ${styles.Right}`} src={Arrow} alt="箭头" />
                </div>
              </div>
              <div className={styles.BoxGroup}>
                <div
                  className={`${styles.BoxItem} ${styles.StepItem} ${currentStepIndex < 2 ? styles.DisabledBox : ''}`}
                >
                  {renderStepButton('进行布尔运算', stepLoading, 2)}
                </div>
              </div>
              <div className={styles.ArrowGroup}>
                <div className={styles.ArrowBox}>
                  <img className={`${styles.Arrow} ${styles.Right}`} src={Arrow} alt="箭头" />
                </div>
              </div>
              <div className={styles.BoxGroup}>
                <div
                  className={`${styles.BoxItem} ${styles.StepItem} ${currentStepIndex < 3 ? styles.DisabledBox : ''}`}
                >
                  {renderStepButton('召回目标文档', stepLoading, 3)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return <div className={styles.StepTips}>请先按顺序构建空间向量模型，并保存</div>
    }
  }

  /**
   * 渲染搜索结果
   */
  const renderSearchResult = () => {
    return <div className={styles.SearchResult}></div>
  }

  /**
   * 页面底部，点击前往下一步
   */
  const goNextExperiment = () => {
    props.history.replace('/experiment/vectorSpace')
  }

  return (
    <div>
      <div className={styles.Section}>
        <div className={styles.SectionTitle}>请按正确顺序构建布尔模型：</div>
        {renderCardSection()}
        <div className={styles.SectionTitle}>仿真我的搜索引擎：</div>
        {renderSearchForm()}
        <Spin spinning={searchLoading}>{renderSearchSteps()}</Spin>
        <p className={styles.SearchResultTitle}>检索结果:</p>
        <Spin spinning={stepLoading}>{renderSearchResult()}</Spin>
      </div>
      <Button type="primary" onClick={goNextExperiment} className={styles.NextBtn}>
        下一步
      </Button>
    </div>
  )
}
const BooleanExperiment = withRouter(BooleanExperimentComponent)

export default BooleanExperiment
