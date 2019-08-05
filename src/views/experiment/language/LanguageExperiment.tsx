import React, { useCallback, useEffect, useState } from 'react'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button, Icon, InputNumber, Select, notification, Input, Spin, Table } from 'antd'
import styles from './LanguageExperiment.module.less'
import Arrow from '../../../assets/experiment/vectorSpace/arrow.png'
import { useDispatch, useMappedState, State, ExperimentCard } from '../../../store/Store'
import { Actions } from '../../../store/Actions'
import { requestFn } from '../../../utils/request'
import { vectorSpaceQueryOptions } from '../../../config/Constant'
import { StandardResult } from '../../../modal/VectorSpace'

/**
 * 列对齐方式类型(与ant-design保持一致)
 */
type columnAlignType = 'center' | 'left' | 'right' | undefined

const { Option } = Select

/**
 * 标准检索结果
 */
const standardResults: StandardResult[] = [
  {
    queryId: 1,
    docId: 1,
    docRank: 1,
    retrieverId: 1,
    score: 4,
    isExisting: false,
    title: '电脑版qq群共享里的文件老是下载失败,求解_解疑答难区_软件区 卡饭论坛 - 互助分享 - 大气谦和!'
  },
  {
    queryId: 1,
    docId: 2,
    docRank: 1,
    retrieverId: 1,
    score: 4,
    isExisting: false,
    title: 'qq群共享文件下载不了怎么办?qq群共享文件下载失败解决方法_评论页-绿茶软件下载'
  },
  {
    queryId: 1,
    docId: 3,
    docRank: 1,
    retrieverId: 1,
    score: 4,
    isExisting: false,
    title: 'qq群共享文j件下载下载失败_百度知道'
  },
  {
    queryId: 1,
    docId: 4,
    docRank: 1,
    retrieverId: 1,
    score: 4,
    isExisting: false,
    title: '为什么QQ群共享文件下载失败呢???_百度知道'
  },
  {
    queryId: 1,
    docId: 5,
    docRank: 1,
    retrieverId: 1,
    score: 4,
    isExisting: false,
    title: 'QQ群共享文件下载失败怎么办-学网-中国IT综合门户网站-提供健康,养生,留学,移民,创业,汽车等信息'
  }
]

/**
 * 用户检索结果
 */
const testResults: StandardResult[] = [
  {
    queryId: 1,
    docId: 1,
    docRank: 1,
    retrieverId: 1,
    score: 4,
    isExisting: true,
    title: 'qq群文件下载工具|QQ群文件下载工具(稳定下载QQ群文件) 5.0绿色版-绿色下载吧'
  },
  {
    queryId: 1,
    docId: 2,
    docRank: 1,
    retrieverId: 1,
    score: 4,
    isExisting: false,
    title: 'qq群共享的文件一直下载失败_百度知道'
  },
  {
    queryId: 1,
    docId: 3,
    docRank: 1,
    retrieverId: 1,
    score: 4,
    isExisting: true,
    title: 'qq群共享文件下载不了怎么办?qq群共享文件下载失败解决方法 - 绿茶文章中心'
  },
  {
    queryId: 1,
    docId: 4,
    docRank: 1,
    retrieverId: 1,
    score: 4,
    isExisting: true,
    title: '为什么下载qq群共享的文件总是失败?_QQ_下载_天涯问答_天涯社区'
  },
  {
    queryId: 1,
    docId: 5,
    docRank: 1,
    retrieverId: 1,
    score: 4,
    isExisting: false,
    title: 'qq群共享下载失败怎么办? - 软件教程 - 格子啦'
  }
]

const LanguageExperimentComponent = (props: RouteComponentProps) => {
  const dispatch: Dispatch<Actions> = useDispatch()
  const state: State = useMappedState(useCallback((globalState: State) => globalState, []))
  // 保存顺序加载状态
  const [saveOrderLoading, setSaveOrderLoading] = useState(false)
  // 保存顺序按钮禁用状态
  const [saveOrderDisabled, setSaveOrderDisabled] = useState(false)
  // 仿真我的搜索引擎，输入框中的值
  const [query, setQuery] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [ModelName,setModelName]=useState("一元语言模型")
  const [smoothParam, setSmoothParam] = useState(0.5)
  const [calculationLoading, setCalculationLoading] = useState(false)
  // 仿真我的搜索引擎，每一步的请求loading状态
  const [stepLoading, setStepLoading] = useState(false)
  // 仿真我的搜索引擎步骤索引
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  /**
   * 定义列的对齐方式，居中
   */
  const columnAlignCenter: columnAlignType = 'center'

  const testColumns = [
    {
      title: '序号',
      dataIndex: 'docRank',
      key: 'docRank',
      width: 50,
      align: columnAlignCenter
    },
    {
      title: 'ID',
      dataIndex: 'docId',
      key: 'docId',
      width: 50,
      align: columnAlignCenter
    },
    {
      title: '文档名',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => (
        <div className={`GlobalVectorSpaceTdEllipsis ${text.length > 16 ? '' : 'GlobalVectorSapceTd'}`}>{text}</div>
      )
    },
    {
      title: '相关度',
      dataIndex: 'isExisting',
      key: 'isExisting',
      width: 60,
      align: columnAlignCenter,
      render: (isExisting: boolean) => renderIsExisting(isExisting)
    }
  ]

  const renderIsExisting = (isExisting: boolean) => {
    if (isExisting) {
      return <Icon type="check" />
    } else {
      return <Icon type="close" />
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
      type: 'handle_languageExperiment_card',
      payload: {
        name:name,
        type: 'selected',
        index
      }
    })
  }

  /**
   * 点击方框放入卡片
   */
  const addCard = (index: number) => {
    const currentIndex = state.languageExperimentCards.findIndex(i => i.current)
    if (currentIndex === -1) {
      return false
    }
    dispatch({
      type: 'handle_languageExperiment_card',
      payload: {
        name: '',
        type: 'add',
        index
      }
    })
  }

    /**
   * 点击方框移除已放入的卡片
   */
  const removeCard = (name: string, index: number) => {
    dispatch({
      type: 'handle_languageExperiment_card',
      payload: {
        name,
        type: 'remove',
        index
      }
    })
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
   * 保存用户选择的构建顺序
   */
  const saveOrder = async () => {
    setSaveOrderLoading(true)
    const res = await requestFn(dispatch, {
      url: '/score/updateRankingScore', // 接口还没完成，这里是个假的示例
      method: 'post',
      data: {
        experimentId: 7,
        rankingResult: getStepIndex(state.languageExperimentSteps, state.languageExperimentCards)
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
   * 渲染卡片列表
   */
  const renderCards = () => {
    return state.languageExperimentCards.map((i, index) => {
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
   * 渲染卡片排序区域
   */
  const renderCardSection = () => {
    return (
      <>
        <div className={styles.ExamBox}>
          <div className={styles.BoxWrapper}>
            <div className={styles.BoxGroup}>
              <div className={styles.BoxItem}>{renderCard(state.languageExperimentSteps[0].name, 0)}</div>
            </div>
            <div className={styles.ArrowGroup}>
              <div className={styles.ArrowBox}>
                <img className={`${styles.Arrow} ${styles.Right}`} src={Arrow} alt="箭头" />
              </div>
            </div>
            <div className={styles.BoxGroup}>
              <div className={styles.BoxItem}>{renderCard(state.languageExperimentSteps[1].name, 1)}</div>
            </div>
            <div className={styles.ArrowGroup}>
              <div className={styles.ArrowBox}>
                <img className={`${styles.Arrow} ${styles.Right}`} src={Arrow} alt="箭头" />
              </div>
            </div>
            <div className={styles.BoxGroup}>
              <div className={styles.BoxItem}>{renderCard(state.languageExperimentSteps[2].name, 2)}</div>
            </div>
            <div className={styles.ArrowGroup}>
              <div className={styles.ArrowBox}>
                <img className={`${styles.Arrow} ${styles.Right}`} src={Arrow} alt="箭头" />
              </div>
            </div>
            <div className={styles.BoxGroup}>
              <div className={styles.BoxItem}>{renderCard(state.languageExperimentSteps[3].name, 3)}</div>
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
   * 渲染模型选择区域
   */
  const renderModelSection = () => {
    return (
      <div>
        <div className={styles.SelectWrapper }>
          <span className={styles.SelectLabel}>请选择语言模型类型：</span>
          <Select defaultValue="一元语言模型" style={{ width: 150 }} onChange={handleModelChoose}>
            <Option value="一元语言模型">一元语言模型</Option>
            <Option value="二元语言模型y">二元语言模型</Option>
          </Select>
          <div className={styles.InputNumber}>
            <span>调整平滑系数a:</span>
            <InputNumber min={0} max={1} step={0.1} defaultValue={0.5} onChange={onInputNumberChange} />
          </div>
        </div>
      </div>
    )
  }

  // 模型选择
  const handleModelChoose=(value)=>{
    // console.log(`selected ${value}`)
    setModelName(value)
  }
  
  // 改变平滑系数
  const onInputNumberChange = (value: number | undefined) => {
    setSmoothParam(value || 0.5)
  }

  // 更新仿真我的搜索引擎的检索条件
  const updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  /**
   * 渲染语言模型下拉列表备选项
   */
  const renderSelectOptions = () => {
    return vectorSpaceQueryOptions.map((i, index) => {
      return (
        <Option key={index} value={i.value}>
          {i.label}
        </Option>
      )
    })
  }

  const standardColumns = [
    {
      title: '序号',
      dataIndex: 'docRank',
      key: 'docRank',
      width: 50,
      align: columnAlignCenter
    },
    {
      title: 'ID',
      dataIndex: 'docId',
      key: 'docId',
      width: 50,
      align: columnAlignCenter
    },
    {
      title: '文档名',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <div className="GlobalVectorSpaceTdEllipsis">{text}</div>
    },
    {
      title: '相关度',
      dataIndex: 'score',
      key: 'score',
      width: 60,
      align: columnAlignCenter
    }
  ]
  /**
   * 渲染模型调试表格
   */
  const renderTables = () => {
    return (
      <div className={styles.TableGroup}>
        <Table
          rowKey="docId"
          loading={calculationLoading}
          dataSource={standardResults}
          columns={standardColumns}
          size="small"
          pagination={false}
          bordered
          className={`GlobalVectorSpaceTable ${styles.Table} ${styles.TableLeft}`}
        />
        <Table
          rowKey="docId"
          loading={calculationLoading}
          dataSource={testResults}
          columns={testColumns}
          size="small"
          pagination={false}
          bordered
          className={`GlobalVectorSpaceTable ${styles.Table}`}
        />
      </div>
    )
  }
  /**
   * 计算所选公式查询结果与标准查询结果的相似度
   */
  const testRetriever = async () => {
    setCalculationLoading(true)
    const res = await requestFn(dispatch, {
      url: '/IRforCN/Retrieval/languageModel/lmSearch',
      method: 'post',
      params: {
        query,
        ModelName,
        smoothParam
      }
    })
    if (res && res.status === 200 && res.data) {
      console.log('计算相似度成功')
    } else {
      errorTips('计算相似度失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
    }
    setCalculationLoading(false)
  }
  //renderTables end


  /**
   * 检索请求
   */
  const searchQuery = async () => {
    setSearchLoading(true)
    const res = await requestFn(dispatch, {
      url: '/IRforCN/Retrieval/languageModel/lmSearch',
      method: 'post',
      params: {
        query,
        ModelName,
        smoothParam
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
  * 仿真我的搜索引擎
  */
  const getMonitorResult = async (url: string, index: number) => {
    setStepLoading(true)
    const res = await requestFn(dispatch, {
      url,
      method: 'post',
      params: {
        query,
        ModelName,
        smoothParam
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
   * 模型调试区域
   */
  const renderSelectSection = () => {
    return (
      <div className={styles.SelectWrapper}>
        <span className={styles.SelectLabel}>请选择标准查询:</span>
        <Select className={`GlobalSelect ${styles.Select}`} size="large">
          {renderSelectOptions()}
        </Select>
        <Button type="primary" size="large">
          计算
        </Button>
      </div>
    )
  }

  /**
   * 渲染仿真我的搜索引擎区域的表单
   */
  const renderSearchForm = () => {
    return (
      <div className={styles.SearchWrapper}>
        <span className={styles.SearchLabel}>请输入查询语句:</span>
        <Input autoComplete="off" size="large" value={query} onChange={updateQuery} />
        <Button type="primary" size="large" onClick={searchQuery}>
          检索
        </Button>
      </div>
    )
  }

  /**
   * 处理当前步骤的按钮点击事件
   */
  const handleCurrentStep = (index: number) => {
    const requestUrls = [
      '/IRforCN/Retrieval/languageModel/queryProcess',
      '/IRforCN/Retrieval/languageModel/lmOfDocs',
      '/IRforCN/Retrieval/languageModel/getResult',
      '/IRforCN/Retrieval/languageModel/getResultAfterSort',
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
                  {renderStepButton('计算LM', stepLoading, 1)}
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
                  {renderStepButton('计算生成概率', stepLoading, 2)}
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
                  {renderStepButton('按生成概率降序排序', stepLoading, 3)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return <div className={styles.StepTips}>请先按顺序构建语言模型，并保存</div>
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
    props.history.replace('/experiment/probability')
  }

  return (
    <div>
      <div className={styles.Section}>
        <div className={styles.SectionTitle}>请按正确顺序构建向量空间模型:</div>
        {renderCardSection()}
        <div className={styles.SectionTitle}>请选择语言模型参数:</div>
        {renderModelSection()}
        <div className={styles.SectionTitle}>请对模型进行调试:</div>
        {renderSelectSection()}
        {renderTables()}
        <div className={styles.SectionTitle}>仿真我的搜索引擎:</div>
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

const LanguageExperiment = withRouter(LanguageExperimentComponent)

export default LanguageExperiment