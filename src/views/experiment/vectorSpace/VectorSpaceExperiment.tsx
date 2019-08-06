import React, { useCallback, useEffect, useState } from 'react'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button, Icon, Radio, InputNumber, Select, notification, Input, Spin, Table } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import styles from './VectorSpaceExperiment.module.less'
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
 * 用户检索结构
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

/**
 * 向量空间模型--公式代码
 */
const formulas = [
  `<math>
    <msub>
      <mi>tf</mi>
      <mi>t,d</mi>
    </msub>
  </math>`,
  `<math>
    <mrow>
      <mn>1</mn>
      <mo>+</mo>
      <mi>log(</mi>
      <msub>
          <mi>tf</mi>
          <mi>t,d</mi>
      </msub>
      <mo>)</mo>
    </mrow>
  </math>`,
  `<math>
    <mi>a</mi>
    <mo>+</mo>
    <mrow>
      <mfrac>
        <mrow>
          <mi>a</mi>
          <mo>&#215</mo>
          <msub>
            <mrow>
              <mi> t </mi>
              <msub>
                <mrow>
                  <mi> f </mi>
                </mrow>
                <mrow>
                  <mi> t </mi>
                  <mo> , </mo>
                  <mi> d </mi>
                </mrow>
              </msub>
            </mrow>
          </msub>
        </mrow>
        <mrow>
          <msub>
            <mi>max</mi>
            <mi>t</mi>
          </msub>
          <mfenced>
            <mrow>
              <mi> t </mi>
              <msub>
                <mrow>
                  <mi> f </mi>
                </mrow>
                <mrow>
                  <mi> t </mi>
                  <mo> , </mo>
                  <mi> d </mi>
                </mrow>
              </msub>
            </mrow>
          </mfenced>
        </mrow>
      </mfrac>
    </mrow>
</math>`,
  `<math>
    <mrow>
      <msub>
        <mi>tf</mi>
        <mi>t,d</mi>
      </msub>
      <mo>&#62</mo>
      <mn>0</mn>
      <mo>?</mo>
      <mn>1</mn>
      <mo>:</mo>
      <mn>0</mn>
    </mrow>
  </math>`,
  `<math>
    <mrow>
      <mfrac>
        <mrow>
          <mn> 1 </mn>
          <mo> + </mo>
          <mi> log </mi>
          <mfenced>
            <mrow>
              <mi> t </mi>
              <msub>
                <mrow>
                  <mi> f </mi>
                </mrow>
                <mrow>
                  <mi> t </mi>
                  <mo> , </mo>
                  <mi> d </mi>
                </mrow>
              </msub>
            </mrow>
          </mfenced>
        </mrow>
        <mrow>
          <mn>1</mn>
          <mo>+</mo>
          <mi>log</mi>
          <mfenced>
            <mrow>
              <msub>
                <mi>ave</mi>
                <mi>t &#8712d</mi>
              </msub>
            </mrow>
            <mfenced>
              <mrow>
                <mi> t </mi>
                <msub>
                  <mrow>
                    <mi> f </mi>
                  </mrow>
                  <mrow>
                    <mi> t </mi>
                    <mo> , </mo>
                    <mi> d </mi>
                  </mrow>
                </msub>
              </mrow>
            </mfenced>
          </mfenced>
        </mrow>
      </mfrac>
    </mrow>
  </math>`
]

const { Option } = Select

const VectorSpaceExperimentComponent = (props: RouteComponentProps) => {
  const dispatch: Dispatch<Actions> = useDispatch()
  const state: State = useMappedState(useCallback((globalState: State) => globalState, []))
  // 保存顺序加载状态
  const [saveOrderLoading, setSaveOrderLoading] = useState(false)
  // 是否已保存卡片顺序
  const [savedOrder, setSavedOrder] = useState(false)
  // 仿真我的搜索引擎，输入框中的值
  const [query, setQuery] = useState('')
  const [selectedQuery, setSelectedQuery] = useState('qq群共享文件下载失败')
  const [searchLoading, setSearchLoading] = useState(false)
  const [calculationLoading, setCalculationLoading] = useState(false)
  const [formulaId, setFormulaId] = useState(1)
  const [smoothParam, setSmoothParam] = useState(0.5)
  // 仿真我的搜索引擎，每一步的请求loading状态
  const [stepLoading, setStepLoading] = useState(false)
  // 仿真我的搜索引擎步骤索引
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [standardData, setStandardData] = useState<StandardResult[]>([])
  const [testData, setTestData] = useState<StandardResult[]>([])

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

  const renderIsExisting = (isExisting: boolean) => {
    if (isExisting) {
      return <Icon type="check" />
    } else {
      return <Icon type="close" />
    }
  }

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
   * 点击方框移除已放入的卡片
   */
  const removeCard = (name: string, index: number) => {
    dispatch({
      type: 'handle_vectorSpace_card',
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
    const currentIndex = state.vectorSpaceCards.findIndex(i => i.current)
    if (currentIndex === -1) {
      return false
    }
    dispatch({
      type: 'handle_vectorSpace_card',
      payload: {
        name: '',
        type: 'add',
        index
      }
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
      type: 'handle_vectorSpace_card',
      payload: {
        name,
        type: 'selected',
        index
      }
    })
  }

  /**
   * 页面底部，点击前往下一步
   */
  const goNextExperiment = () => {
    props.history.replace('/experiment/probability')
  }

  /**
   * 改变平滑系数
   */
  const onInputNumberChange = (value: number | undefined) => {
    setSmoothParam(value || 0.5)
  }

  /**
   * 选择TF模型对应的公式id
   */
  const selectFormulaId = (e: RadioChangeEvent) => {
    setFormulaId(e.target.value)
  }

  /**
   * 计算所选公式查询结果与标准查询结果的相似度
   */
  const testRetriever = async () => {
    setCalculationLoading(true)
    const res = await requestFn(dispatch, {
      url: '/IRforCN/Retrieval/vectorSpaceModel/testRetriever',
      method: 'post',
      params: {
        query: selectedQuery,
        formulaId,
        smoothParam
      }
    })
    if (res && res.status === 200 && res.data && res.data.standardResults && res.data.testResults) {
      setStandardData(handleTestRetrieverResult(res.data.standardResults))
      setTestData(handleTestRetrieverResult(res.data.testResults))
    } else {
      errorTips('计算相似度失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
    }
    setCalculationLoading(false)
  }

  /**
   * 截取相似度计算结果前5条记录
   */
  const handleTestRetrieverResult = (data: StandardResult[]) => {
    return data.filter((_, index) => index < 5)
  }

  /**
   * 检索请求
   */
  const searchQuery = async () => {
    setSearchLoading(true)
    const res = await requestFn(dispatch, {
      url: '/IRforCN/Retrieval/vectorSpaceModel/search',
      method: 'post',
      params: {
        query,
        formulaId,
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
        experimentId: 5,
        rankingResult: getStepIndex(state.vectorSteps, state.vectorSpaceCards)
      }
    })
    if (res && res.status === 200 && res.data && res.data.code === 0) {
      successTips('保存顺序成功', '')
      setSavedOrder(true)
    } else {
      // 保存顺序失败
      errorTips('保存顺序失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
    }
    setSaveOrderLoading(false)
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
        formulaId,
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
   * 更新仿真我的搜索引擎的检索条件
   */
  const updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  /**
   * 更新模型调试时的查询语句
   */
  const updateSelectValue = (value: string) => {
    setSelectedQuery(value)
  }

  /**
   * 渲染卡片列表
   */
  const renderCards = () => {
    return state.vectorSpaceCards.map((i, index) => {
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
              <div className={styles.BoxItem}>{renderCard(state.vectorSteps[3].name, 3)}</div>
              <img className={`${styles.Arrow} ${styles.Down}`} src={Arrow} alt="箭头" />
              <div className={styles.BoxItem}>{renderCard(state.vectorSteps[4].name, 4)}</div>
            </div>
            <div className={styles.ArrowGroup}>
              <div className={styles.ArrowBox}>
                <img className={styles.Arrow} src={Arrow} alt="箭头" />
              </div>
              <div className={styles.ArrowBox}>
                <img className={`${styles.Arrow} ${styles.Right}`} src={Arrow} alt="箭头" />
              </div>
            </div>
            <div className={styles.BoxGroup}>
              <div className={styles.BoxItem}>{renderCard(state.vectorSteps[2].name, 2)}</div>
              <div className={styles.BoxItem}>{renderCard(state.vectorSteps[5].name, 5)}</div>
            </div>
            <div className={styles.ArrowGroup}>
              <div className={styles.ArrowBox}>
                <img className={styles.Arrow} src={Arrow} alt="箭头" />
              </div>
              <div className={styles.ArrowBox}>
                <img className={`${styles.Arrow} ${styles.Right}`} src={Arrow} alt="箭头" />
              </div>
            </div>
            <div className={styles.BoxGroup}>
              <div className={styles.BoxItem}>{renderCard(state.vectorSteps[1].name, 1)}</div>
              <div className={styles.BoxItem}>{renderCard(state.vectorSteps[6].name, 6)}</div>
            </div>
            <div className={styles.ArrowGroup}>
              <div className={styles.ArrowBox}>
                <img className={styles.Arrow} src={Arrow} alt="箭头" />
              </div>
              <div className={styles.ArrowBox}>
                <img className={`${styles.Arrow} ${styles.Right}`} src={Arrow} alt="箭头" />
              </div>
            </div>
            <div className={styles.BoxGroup}>
              <div className={styles.BoxItem}>{renderCard(state.vectorSteps[0].name, 0)}</div>
              <div className={styles.BoxItem}>{renderCard(state.vectorSteps[7].name, 7)}</div>
            </div>
          </div>
        </div>
        <div className={styles.BoxContainer}>{renderCards()}</div>
        <div className={styles.SaveOrder}>
          <Button
            type="primary"
            disabled={savedOrder || !state.vectorSteps.every(i => i.name)}
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
   * 渲染TF模型选择区域
   */
  const renderFormulaSection = () => {
    return (
      <div className={styles.FormulaWrapper} id="vectorSpaceMathJaxContent">
        <Radio.Group name="formula" defaultValue={1} onChange={selectFormulaId}>
          <Radio value={1} className={styles.Radio}>
            <span className={styles.Formula} dangerouslySetInnerHTML={{ __html: formulas[0] }}></span>
          </Radio>
          <Radio value={2} className={styles.Radio}>
            <span className={styles.Formula} dangerouslySetInnerHTML={{ __html: formulas[1] }}></span>
          </Radio>
          <Radio value={3} className={styles.Radio}>
            <span className={styles.Formula} dangerouslySetInnerHTML={{ __html: formulas[2] }}></span>
          </Radio>
          <Radio value={4} className={`${styles.Radio} ${styles.BottomRadio}`}>
            <span className={styles.Formula} dangerouslySetInnerHTML={{ __html: formulas[3] }}></span>
          </Radio>
          <Radio value={5} className={`${styles.Radio} ${styles.BottomRadio}`}>
            <span className={styles.Formula} dangerouslySetInnerHTML={{ __html: formulas[4] }}></span>
          </Radio>
        </Radio.Group>
        <div className={styles.InputNumber}>
          <span>调整平滑系数a:</span>
          <InputNumber min={0} max={1} step={0.1} defaultValue={0.5} onChange={onInputNumberChange} />
        </div>
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
      '/IRforCN/Retrieval/vectorSpaceMode/idf',
      '/IRforCN/Retrieval/vectorSpaceMode/ppq',
      '/IRforCN/Retrieval/vectorSpaceMode/tfOfQuery',
      '/IRforCN/Retrieval/vectorSpaceMode/vectorOfQuery',
      '/IRforCN/Retrieval/vectorSpaceMode/tfsOfDoc',
      '/IRforCN/Retrieval/vectorSpaceMode/vectorOfDoc',
      '/IRforCN/Retrieval/vectorSpaceMode/similarity',
      '/IRforCN/Retrieval/vectorSpaceMode/descendOrderSimilarity'
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
    if (savedOrder) {
      return (
        <div>
          <div className={styles.ExamBox}>
            <div className={styles.BoxWrapper}>
              <div className={styles.BoxGroup}>
                <div
                  className={`${styles.BoxItem} ${styles.StepItem} ${currentStepIndex < 3 ? styles.DisabledBox : ''}`}
                >
                  {renderStepButton('求查询向量', stepLoading, 3)}
                </div>
                <img className={`${styles.Arrow} ${styles.Down}`} src={Arrow} alt="箭头" />
                <div
                  className={`${styles.BoxItem} ${styles.StepItem} ${currentStepIndex < 4 ? styles.DisabledBox : ''}`}
                >
                  {renderStepButton('求各文档TF', stepLoading, 4)}
                </div>
              </div>
              <div className={styles.ArrowGroup}>
                <div className={styles.ArrowBox}>
                  <img className={styles.Arrow} src={Arrow} alt="箭头" />
                </div>
                <div className={styles.ArrowBox}>
                  <img className={`${styles.Arrow} ${styles.Right}`} src={Arrow} alt="箭头" />
                </div>
              </div>
              <div className={styles.BoxGroup}>
                <div
                  className={`${styles.BoxItem} ${styles.StepItem} ${currentStepIndex < 2 ? styles.DisabledBox : ''}`}
                >
                  {renderStepButton('求查询的TF', stepLoading, 2)}
                </div>
                <div
                  className={`${styles.BoxItem} ${styles.StepItem} ${currentStepIndex < 5 ? styles.DisabledBox : ''}`}
                >
                  {renderStepButton('求文档向量', stepLoading, 5)}
                </div>
              </div>
              <div className={styles.ArrowGroup}>
                <div className={styles.ArrowBox}>
                  <img className={styles.Arrow} src={Arrow} alt="箭头" />
                </div>
                <div className={styles.ArrowBox}>
                  <img className={`${styles.Arrow} ${styles.Right}`} src={Arrow} alt="箭头" />
                </div>
              </div>
              <div className={styles.BoxGroup}>
                <div
                  className={`${styles.BoxItem} ${styles.StepItem} ${currentStepIndex < 1 ? styles.DisabledBox : ''}`}
                >
                  {renderStepButton('查询预处理', stepLoading, 1)}
                </div>
                <div
                  className={`${styles.BoxItem} ${styles.StepItem} ${currentStepIndex < 6 ? styles.DisabledBox : ''}`}
                >
                  {renderStepButton('求相似度', stepLoading, 6)}
                </div>
              </div>
              <div className={styles.ArrowGroup}>
                <div className={styles.ArrowBox}>
                  <img className={styles.Arrow} src={Arrow} alt="箭头" />
                </div>
                <div className={styles.ArrowBox}>
                  <img className={`${styles.Arrow} ${styles.Right}`} src={Arrow} alt="箭头" />
                </div>
              </div>
              <div className={styles.BoxGroup}>
                <div
                  className={`${styles.BoxItem} ${styles.StepItem} ${currentStepIndex < 0 ? styles.DisabledBox : ''}`}
                >
                  {renderStepButton('求文档IDF', stepLoading, 0)}
                </div>
                <div
                  className={`${styles.BoxItem} ${styles.StepItem} ${currentStepIndex < 7 ? styles.DisabledBox : ''}`}
                >
                  {renderStepButton('求相似度降序排序', stepLoading, 7)}
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
   * 渲染模型调试表格
   */
  const renderTables = () => {
    return (
      <div className={styles.TableGroup}>
        <Table
          rowKey="docId"
          loading={calculationLoading}
          dataSource={standardData}
          columns={standardColumns}
          size="small"
          pagination={false}
          bordered
          className={`GlobalVectorSpaceTable ${styles.Table} ${styles.TableLeft}`}
        />
        <Table
          rowKey="docId"
          loading={calculationLoading}
          dataSource={testData}
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
   * 渲染搜索结果
   */
  const renderSearchResult = () => {
    return <div className={styles.SearchResult}></div>
  }

  return (
    <div>
      <div className={styles.Section}>
        <div className={styles.SectionTitle}>请按正确顺序构建向量空间模型:</div>
        {renderCardSection()}
        <div className={styles.SectionTitle}>请选择我的TF模型:</div>
        {renderFormulaSection()}
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

const VectorSpaceExperiment = withRouter(VectorSpaceExperimentComponent)

export default VectorSpaceExperiment
