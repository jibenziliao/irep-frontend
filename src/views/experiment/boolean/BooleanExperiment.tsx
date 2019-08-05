import React, { useCallback, useState } from 'react'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button, Icon, notification, Input, Spin, Select, Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import styles from './BooleanExperiment.module.less'
import Arrow from '../../../assets/experiment/vectorSpace/arrow.png'
import { useDispatch, useMappedState, State, ExperimentCard } from '../../../store/Store'
import { Actions } from '../../../store/Actions'
import { requestFn } from '../../../utils/request'

const { Option } = Select

type Operator = 'or' | 'and' | 'not'

interface BooleanExperimentProps extends FormComponentProps, RouteComponentProps {}

/**
 * 默认的检索关键词
 */
const defaultSearchTerms = ['', '', '']

/**
 * 默认的检索条件逻辑关系符
 */
const defaultOperators: Operator[] = ['or', 'or']

const BooleanExperimentComponent = (props: BooleanExperimentProps) => {
  const dispatch: Dispatch<Actions> = useDispatch()
  const state: State = useMappedState(useCallback((globalState: State) => globalState, []))
  // 保存顺序加载状态
  const [saveOrderLoading, setSaveOrderLoading] = useState(false)
  // 仿真我的搜索引擎，输入框中的值
  const [query, setQuery] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  // 仿真我的搜索引擎步骤索引
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [lastStepIndex, setLastStepIndex] = useState(0)
  // 仿真我的搜索引擎，每一步的请求loading状态
  const [stepLoading, setStepLoading] = useState(false)
  const [searchTerms, setSearchTerms] = useState(defaultSearchTerms)
  const [searchOperators, setSearchOperators] = useState<Operator[]>(defaultOperators)

  const { getFieldDecorator, validateFields, getFieldsValue } = props.form

  /**
   * 保存用户选择的构建顺序
   */
  const saveOrder = async () => {
    setSaveOrderLoading(true)
    const res = await requestFn(dispatch, {
      url: '/score/updateRankingScore', // 接口还没完成，这里是个假的示例
      method: 'post',
      data: {
        experimentId: 4,
        rankingResult: getStepIndex(state.booleanExperimentSteps, state.booleanExperimentCards)
      }
    })
    if (res && res.status === 200 && res.data && res.data.code === 0) {
      successTips('保存顺序成功', '')
      updateSaveOrderBtnStatus()
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

  const shouldRemoveCard = (bool: boolean, name: string, index: number) => {
    if (!bool) {
      return false
    } else {
      removeCard(name, index)
    }
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
   * 更新布尔模型实验，保存顺序按钮的状态
   */
  const updateSaveOrderBtnStatus = () => {
    dispatch({
      type: 'update_saveOrderBtnStatus',
      payload: {
        field: 'bool'
      }
    })
  }

  /**
   * 渲染方框中的卡片
   */
  const renderCard = (name: string, index: number) => {
    if (name) {
      return (
        <div className={`${styles.Name}`} onClick={() => shouldRemoveCard(!state.saveOrderBtn.bool.saved, name, index)}>
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
              <div className={`${styles.BoxItem} ${state.saveOrderBtn.bool.saved ? styles.BoxItemDisabled : ''}`}>
                {renderCard(state.booleanExperimentSteps[0].name, 0)}
              </div>
            </div>
            <div className={styles.ArrowGroup}>
              <div className={styles.ArrowBox}>
                <img className={styles.Arrow} src={Arrow} alt="箭头" />
              </div>
            </div>
            <div className={styles.BoxGroup}>
              <div className={`${styles.BoxItem} ${state.saveOrderBtn.bool.saved ? styles.BoxItemDisabled : ''}`}>
                {renderCard(state.booleanExperimentSteps[1].name, 1)}
              </div>
            </div>
            <div className={styles.ArrowGroup}>
              <div className={styles.ArrowBox}>
                <img className={styles.Arrow} src={Arrow} alt="箭头" />
              </div>
            </div>
            <div className={styles.BoxGroup}>
              <div className={`${styles.BoxItem} ${state.saveOrderBtn.bool.saved ? styles.BoxItemDisabled : ''}`}>
                {renderCard(state.booleanExperimentSteps[2].name, 2)}
              </div>
            </div>
            <div className={styles.ArrowGroup}>
              <div className={styles.ArrowBox}>
                <img className={styles.Arrow} src={Arrow} alt="箭头" />
              </div>
            </div>
            <div className={styles.BoxGroup}>
              <div className={`${styles.BoxItem} ${state.saveOrderBtn.bool.saved ? styles.BoxItemDisabled : ''}`}>
                {renderCard(state.booleanExperimentSteps[3].name, 3)}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.BoxContainer}>{renderCards()}</div>
        <div className={styles.SaveOrder}>
          <Button
            type="primary"
            disabled={!state.saveOrderBtn.bool.completed || state.saveOrderBtn.bool.saved}
            loading={saveOrderLoading}
            onClick={saveOrder}
          >
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

  const beforeSearch = () => {
    validateFields((err: any) => {
      if (!err) {
        const fieldValue = getFieldsValue()
        const queryString = handleSearchQuery(fieldValue)
        setQuery(queryString)
        searchQuery(queryString)
      }
    })
  }

  /**
   * 处理仿真我的搜索引擎表单参数
   */
  const handleSearchQuery = (fieldValue: any) => {
    let str = ''
    for (let i = 0; i < searchTerms.length; i++) {
      if (i === searchTerms.length - 1) {
        str += fieldValue[`terms_${i}`]
        continue
      }
      str += fieldValue[`terms_${i}`] + ' ' + fieldValue[`operator_${i}`] + ' '
    }
    return str
  }

  /**
   * 检索请求
   */
  const searchQuery = async (query: string) => {
    setSearchLoading(true)
    const res = await requestFn(dispatch, {
      url: '/IRforCN/Retrieval/boolModel/search',
      method: 'post',
      data: {
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
   * 仿真搜索引擎添加表单项
   */
  const addSearchFormItem = () => {
    setSearchTerms([...searchTerms, ''])
    setSearchOperators([...searchOperators, 'or'])
  }

  /**
   * 仿真搜索引擎移除一个表单项
   */
  const removeSearchFormItem = (index: number) => {
    const newTerms = searchTerms.filter((_, idx) => idx !== index)
    const newOperators = searchOperators.filter((_, idx) => idx !== index)
    setSearchTerms(newTerms)
    setSearchOperators(newOperators)
  }

  /**
   * 渲染仿真我的搜索引擎单个表单项
   */
  const renderSearchFormItem = () => {
    return searchTerms.map((i, index) => {
      return (
        <div key={index} className={styles.SearchRow}>
          {renderSearchFormAddBtn(index)}
          {renderSelectItem(index)}
          <Form.Item className={`${styles.FormItem}`}>
            {getFieldDecorator(`terms_${index}`, {
              rules: [{ required: true, message: '请输入检索关键词' }]
            })(<Input autoComplete="off" size="large" />)}
          </Form.Item>
          {renderSearchBtn(index === searchTerms.length - 1)}
        </div>
      )
    })
  }

  /**
   * 渲染仿真我的搜索引擎表单项的新增和删除按钮
   */
  const renderSearchFormAddBtn = (index: number) => {
    if (index === 0) {
      return (
        <Button className={styles.Button} type="primary" onClick={addSearchFormItem}>
          <Icon type="plus" />
        </Button>
      )
    } else {
      return (
        <Button className={styles.Button} type="primary" onClick={() => removeSearchFormItem(index)}>
          <Icon type="minus" />
        </Button>
      )
    }
  }

  /**
   * 渲染仿真我的搜索引擎表单中的下拉选择框
   */
  const renderSelectItem = (index: number) => {
    if (index === 0) {
      return <span className={styles.SearchLabel}>基础条件:</span>
    } else {
      return (
        <Form.Item className={`${styles.FormItem}`}>
          {getFieldDecorator(`operator_${index - 1}`, {
            initialValue: 'OR'
          })(
            <Select className={styles.SearchSelect} size="large">
              <Option value="AND">and</Option>
              <Option value="OR">or</Option>
              <Option value="NOT">not</Option>
            </Select>
          )}
        </Form.Item>
      )
    }
  }

  /**
   * 渲染仿真我的搜索引擎表单中的检索按钮
   */
  const renderSearchBtn = (showBtn: boolean) => {
    if (showBtn) {
      return (
        <Button
          type="primary"
          size="large"
          disabled={!state.saveOrderBtn.bool.saved}
          loading={searchLoading}
          className={styles.SearchFormBtn}
          onClick={beforeSearch}
        >
          检索
        </Button>
      )
    }
  }

  /**
   * 仿真我的搜索引擎
   */
  const getMonitorResult = async (url: string, index: number) => {
    setStepLoading(true)
    const res = await requestFn(dispatch, {
      url,
      method: 'post',
      data: {
        query
      }
    })
    if (res && res.status === 200 && res.data) {
      setCurrentStepIndex(index + 1)
      if (index === 3) {
        setLastStepIndex(index + 1)
      }
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
    if (state.saveOrderBtn.bool.saved) {
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
      return <div className={styles.StepTips}>请先按顺序构建布尔模型，并保存</div>
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
        <div className={styles.SearchWrapper}>{renderSearchFormItem()}</div>
        <Spin spinning={searchLoading}>{renderSearchSteps()}</Spin>
        <p className={styles.SearchResultTitle}>检索结果:</p>
        <Spin spinning={stepLoading}>{renderSearchResult()}</Spin>
      </div>
      <Button type="primary" disabled={lastStepIndex !== 4} onClick={goNextExperiment} className={styles.NextBtn}>
        下一步
      </Button>
    </div>
  )
}

const BooleanExperimentWithoutRouter = Form.create<BooleanExperimentProps>({ name: 'BooleanExperimentComponent' })(
  BooleanExperimentComponent
)

const BooleanExperiment = withRouter(BooleanExperimentWithoutRouter)

export default BooleanExperiment