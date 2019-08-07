import React, { useCallback, useEffect, useState } from 'react'
import { Button, Icon, InputNumber, Select, notification, Input, Spin, Table } from 'antd'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { useDispatch, useMappedState, State, ExperimentCard } from '../../../store/Store'
import { Actions } from '../../../store/Actions'
import styles from './ProbabilityExperiment.module.less'
import { requestFn } from '../../../utils/request'
import Arrow from '../../../assets/experiment/vectorSpace/arrow.png'
import { vectorSpaceQueryOptions } from '../../../config/Constant'
import { StandardResult } from '../../../modal/VectorSpace'

/**
 * 列对齐方式类型(与ant-design保持一致)
 */
type columnAlignType = 'center' | 'left' | 'right' | undefined

/**
 * 概率检索模型--公式代码
 */
const formulas = [
  `<math>
    <mi> Sim </mi>
    <mfenced>
        <mrow>
            <msub>
                <mrow>
                    <mi> D </mi>
                </mrow>
                <mrow>
                    <mi> j </mi>
                </mrow>
            </msub>
            <mo> , </mo>
            <mi> q </mi>
        </mrow>
    </mfenced>
    <mo> = </mo>
    <munder>
        <mrow>
            <mo> &#x2211; <!-- n-ary summation --> </mo>
        </mrow>
        <mrow>
            <msub>
                <mrow>
                    <mi> t </mi>
                </mrow>
                <mrow>
                    <mi> i </mi>
                </mrow>
            </msub>
            <mo> &#x2208; <!-- element of --> </mo>
            <mi> q </mi>
        </mrow>
    </munder>
    <mfrac>
        <mrow>
            <mfenced>
                <mrow>
                    <mi> k </mi>
                    <mo> + </mo>
                    <mn> 1 </mn>
                </mrow>
            </mfenced>
            <msub>
                <mrow>
                    <mi> f </mi>
                </mrow>
                <mrow>
                    <mi> i </mi>
                    <mo> , </mo>
                    <mi> j </mi>
                </mrow>
            </msub>
        </mrow>
        <mrow>
            <mi> k </mi>
            <mfenced open="[" close="]">
                <mrow>
                    <mfenced>
                        <mrow>
                            <mn> 1 </mn>
                            <mo> - </mo>
                            <mi> b </mi>
                        </mrow>
                    </mfenced>
                    <mo> + </mo>
                    <mi> b </mi>
                        <mrow>
                            <mfrac>
                                <mrow>
                                    <mi> len </mi>
                                    <mfenced>
                                        <mrow>
                                            <msub>
                                                <mrow>
                                                    <mi> D </mi>
                                                </mrow>
                                                <mrow>
                                                    <mi> i </mi>
                                                </mrow>
                                            </msub>
                                        </mrow>
                                    </mfenced>
                                </mrow>
                                <mrow>
                                    <mi> avg_length </mi>
                                </mrow>
                            </mfrac>
                        </mrow>
                </mrow>
            </mfenced>
            <mo> + </mo>
            <msub>
                <mrow>
                    <mi> f </mi>
                </mrow>
                <mrow>
                    <mi> i </mi>
                    <mo> , </mo>
                    <mi> j </mi>
                </mrow>
            </msub>
        </mrow>
    </mfrac>
    <mo>&#215</mo>
    <mi> log </mi>
    <mfrac>
        <mrow>
            <mi> N </mi>
            <mo> - </mo>
            <msub>
                <mrow>
                    <mi> n </mi>
                </mrow>
                <mrow>
                    <mi> j </mi>
                </mrow>
            </msub>
            <mo> + </mo>
            <mn> 0.5 </mn>
        </mrow>
        <mrow>
            <msub>
                <mrow>
                    <mi> n </mi>
                </mrow>
                <mrow>
                    <mi> j </mi>
                </mrow>
            </msub>
            <mo> + </mo>
            <mn> 0.5 </mn>
        </mrow>
    </mfrac>
  </math>
`
]

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

const { Option } = Select

const ProbabilityExperimentComponent = (props: RouteComponentProps) => {
  const dispatch: Dispatch<Actions> = useDispatch()
  const state: State = useMappedState(useCallback((globalState: State) => globalState, []))
  // 保存顺序加载状态
  const [saveOrderLoading, setSaveOrderLoading] = useState(false)
  //仿真我的搜索引擎输入框中的值
  const [query, setQuery] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [k, setK] = useState(1)
  const [b, setB] = useState(0.5)
  const [calculationLoading, setCalculationLoading] = useState(false)
  // 仿真我的搜索引擎，每一步的请求loading状态
  const [stepLoading, setStepLoading] = useState(false)
  // 仿真我的搜索引擎步骤索引
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [selectedQuery, setSelectedQuery] = useState('')

  /**
   * 定义列的对齐方式，居中
   */
  const columnAlignCenter: columnAlignType = 'center'

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

  useEffect(() => {
    // @ts-ignore
    if (window.MathJax && window.MathJax.Hub) {
      // 如果，不传入第三个参数，则渲染整个document
      // @ts-ignore
      // eslint-disable-next-line no-undef
      window.MathJax.Hub.Queue(['Typeset', MathJax.Hub, document.getElementById('vectorSpaceMathJaxContent')])
    }
  }, [])

  /**
   * 渲染相关度icon图标
   */
  const renderIsExisting = (isExisting: boolean) => {
    if (isExisting) {
      return <Icon type="check" />
    } else {
      return <Icon type="close" />
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
   * 渲染用户排序卡片
   */
  const renderEmptyCards = () => {
    return (
      <div className={styles.BoxWrapper}>
        <div className={styles.BoxGroup}>
          <div className={`${styles.BoxItem} ${state.saveOrderBtn.probability.saved ? styles.BoxItemDisabled : ''}`}>
            {renderCard(state.probabilityExperimentSteps[0].name, 0)}
          </div>
        </div>
        <div className={styles.ArrowGroup}>
          <div className={styles.ArrowBox}>
            <img className={styles.Arrow} src={Arrow} alt="箭头" />
          </div>
        </div>
        <div className={styles.BoxGroup}>
          <div className={`${styles.BoxItem} ${state.saveOrderBtn.probability.saved ? styles.BoxItemDisabled : ''}`}>
            {renderCard(state.probabilityExperimentSteps[1].name, 1)}
          </div>
        </div>
        <div className={styles.ArrowGroup}>
          <div className={styles.ArrowBox}>
            <img className={styles.Arrow} src={Arrow} alt="箭头" />
          </div>
        </div>
        <div className={styles.BoxGroup}>
          <div className={`${styles.BoxItem} ${state.saveOrderBtn.probability.saved ? styles.BoxItemDisabled : ''}`}>
            {renderCard(state.probabilityExperimentSteps[2].name, 2)}
          </div>
        </div>
        <div className={styles.ArrowGroup}>
          <div className={styles.ArrowBox}>
            <img className={styles.Arrow} src={Arrow} alt="箭头" />
          </div>
        </div>
        <div className={styles.BoxGroup}>
          <div className={`${styles.BoxItem} ${state.saveOrderBtn.probability.saved ? styles.BoxItemDisabled : ''}`}>
            {renderCard(state.probabilityExperimentSteps[3].name, 3)}
          </div>
        </div>
      </div>
    )
  }

  /**
   * 渲染方框中的卡片
   */
  const renderCard = (name: string, index: number) => {
    if (name) {
      return (
        <div
          className={`${styles.Name}`}
          onClick={() => shouldRemoveCard(!state.saveOrderBtn.probability.saved, name, index)}
        >
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
      type: 'handle_probabilityExperiment_card',
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
    const currentIndex = state.probabilityExperimentCards.findIndex(i => i.current)
    if (currentIndex === -1) {
      return false
    }
    dispatch({
      type: 'handle_probabilityExperiment_card',
      payload: {
        name: '',
        type: 'add',
        index
      }
    })
  }

  /**
   * 更新概率模型实验，保存顺序按钮的状态
   */
  const updateSaveOrderBtnStatus = () => {
    dispatch({
      type: 'update_saveOrderBtnStatus',
      payload: {
        field: 'probability'
      }
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
      url: '/score/updateRankingScore',
      method: 'post',
      data: {
        experimentId: 6,
        rankingResult: getStepIndex(state.probabilityExperimentSteps, state.probabilityExperimentCards)
      }
    })
    if (res && res.status === 200 && res.data && res.data.code === 0) {
      successTips('保存顺序成功', '')
      updateSaveOrderBtnStatus()
    } else {
      errorTips('保存顺序失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
    }
    setSaveOrderLoading(false)
  }

  /**
   * 渲染卡片列表
   */
  const renderCards = () => {
    return state.probabilityExperimentCards.map((i, index) => {
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
   * 选中卡片
   */
  const selectCard = (name: string, index: number, disabled: boolean) => {
    if (disabled) {
      return false
    }
    dispatch({
      type: 'handle_probabilityExperiment_card',
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
        <div className={styles.ExamBox}>{renderEmptyCards()}</div>
        <div className={styles.BoxContainer}>{renderCards()}</div>
        <div className={styles.SaveOrder}>
          <Button
            type="primary"
            disabled={!state.saveOrderBtn.probability.completed || state.saveOrderBtn.probability.saved}
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
   * 渲染公式
   */
  const renderParamSection = () => {
    return (
      <div className={styles.FormulaWrapper}>
        <span className={styles.Formula} dangerouslySetInnerHTML={{ __html: formulas[0] }}></span>
        <div className={styles.Param}>
          <div className={styles.InputNumber}>
            <span>调整系数k:</span>
            <InputNumber min={0} max={10} step={0.1} defaultValue={1.0} onChange={onParamKChange} />
          </div>
          <div className={styles.InputNumber}>
            <span>调整系数b:</span>
            <InputNumber min={0} max={1} step={0.1} defaultValue={0.5} onChange={onParamBChange} />
          </div>
        </div>
      </div>
    )
  }

  /**
   * 改变系数k
   */
  const onParamKChange = (value: number | undefined) => {
    setK(value || 1)
  }

  /**
   * 改变系数k
   */
  const onParamBChange = (value: number | undefined) => {
    setB(value || 0.5)
  }

  /**
   * 更新模型调试时的查询语句
   */
  const updateSelectValue = (value: string) => {
    setSelectedQuery(value)
  }

  /**
   * 模型调试区域
   */
  const renderSelectSection = () => {
    return (
      <div className={styles.SelectWrapper}>
        <span className={styles.SelectLabel}>请选择标准查询:</span>
        <Select className={`GlobalSelect ${styles.Select}`} size="large" onChange={updateSelectValue}>
          {renderSelectOptions()}
        </Select>
        <Button type="primary" size="large" onClick={testRetriever}>
          计算
        </Button>
      </div>
    )
  }

  /**
   * 渲染向量空间模型下拉列表备选项
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
      url: '/IRforCN/Retrieval/probabilityModel/testRetriever',
      method: 'post',
      params: {
        query: selectedQuery,
        k,
        b
      }
    })
    if (res && res.status === 200 && res.data) {
      console.log('计算相似度成功')
    } else {
      errorTips('计算相似度失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
    }
    setCalculationLoading(false)
  }

  /**
   * 检索请求
   */
  const searchQuery = async () => {
    setSearchLoading(true)
    const res = await requestFn(dispatch, {
      url: '/IRforCN/Retrieval/probabilityModel/search',
      method: 'post',
      params: {
        query,
        k,
        b
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
        <span className={styles.SearchLabel}>请输入查询语句:</span>
        <Input autoComplete="off" size="large" value={query} onChange={updateQuery} />
        <Button type="primary" size="large" onClick={searchQuery}>
          检索
        </Button>
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
        query,
        k,
        b
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
      '/IRforCN/Retrieval/probabilityModel/ppq',
      '/IRforCN/Retrieval/probabilityModel/bij',
      '/IRforCN/Retrieval/probabilityModel/similarity',
      '/IRforCN/Retrieval/probabilityModel/descendOrderSimilarity'
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
    if (state.saveOrderBtn.probability.saved) {
      return (
        <div>
          <div className={styles.ExamBox}>
            <div className={styles.BoxWrapper}>
              <div className={styles.BoxGroup}>
                <div
                  className={`${styles.BoxItem} ${styles.StepItem} ${currentStepIndex < 0 ? styles.DisabledBox : ''}`}
                >
                  {renderStepButton('求索引项', stepLoading, 0)}
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
                  {renderStepButton('求系数Bij', stepLoading, 1)}
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
                  {renderStepButton('求相似度', stepLoading, 2)}
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
                  {renderStepButton('求相似度降序排序', stepLoading, 4)}
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
    props.history.replace('/experiment/language')
  }

  return (
    <div>
      <div className={styles.Section}>
        <div className={styles.SectionTitle}>请按正确顺序构建概率检索模型：</div>
        {renderCardSection()}
        <div className={styles.SectionTitle}>请调整BM25模型参数：</div>
        {renderParamSection()}
        <div className={styles.SectionTitle}>请对模型进行调试:</div>
        {renderSelectSection()}
        {renderTables()}
        <div className={styles.SectionTitle}>仿真我的搜索引擎:</div>
        {renderSearchForm()}
        <Spin spinning={searchLoading}>{renderSearchSteps()}</Spin>
        <p className={styles.SearchResultTitle}>检索结果:</p>
        <Spin spinning={stepLoading}>{renderSearchResult()}</Spin>
        <Button type="primary" onClick={goNextExperiment} className={styles.NextBtn}>
          下一步
        </Button>
      </div>
    </div>
  )
}

/**
 * 概率模型实验
 */
const ProbabilityExperiment = withRouter(ProbabilityExperimentComponent)

export default ProbabilityExperiment
