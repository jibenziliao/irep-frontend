import React, { useCallback, useEffect, useState } from 'react'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button, Icon, Radio, InputNumber, Select, notification, Input, Spin, Table } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio/interface'
import styles from './VectorSpaceExperiment.module.less'
import Arrow from '../../../assets/experiment/vectorSpace/arrow.png'
import { useDispatch, useMappedState, State } from '../../../store/Store'
import { Actions } from '../../../store/Actions'
import { requestFn } from '../../../utils/request'
import { vectorSpaceQueryOptions } from '../../../config/Constant'
import { StandardResult } from '../../../modal/VectorSpace'

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
    title: '我的世界'
  },
  {
    queryId: 1,
    docId: 2,
    docRank: 1,
    retrieverId: 1,
    score: 4,
    isExisting: false,
    title: '我的世界'
  },
  {
    queryId: 1,
    docId: 3,
    docRank: 1,
    retrieverId: 1,
    score: 4,
    isExisting: false,
    title: '我的世界'
  },
  {
    queryId: 1,
    docId: 4,
    docRank: 1,
    retrieverId: 1,
    score: 4,
    isExisting: false,
    title: '我的世界'
  },
  {
    queryId: 1,
    docId: 5,
    docRank: 1,
    retrieverId: 1,
    score: 4,
    isExisting: false,
    title: '我的世界'
  },
  {
    queryId: 1,
    docId: 6,
    docRank: 1,
    retrieverId: 1,
    score: 4,
    isExisting: false,
    title: '我的世界'
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
    isExisting: false,
    title: '我的世界'
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
  const [searchLoading, setSearchLoading] = useState(false)
  const [calculationLoading, setCalculationLoading] = useState(false)
  const [formulaId, setFormulaId] = useState(1)
  const [smoothParam, setSmoothParam] = useState(0.5)

  const standardColumns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 60
    },
    {
      title: 'ID',
      dataIndex: 'docId',
      key: 'docId',
      width: 60
    },
    {
      title: '文档名',
      dataIndex: 'title',
      key: 'title',
      width: 60
    },
    {
      title: '相关度',
      dataIndex: 'score',
      key: 'score',
      width: 100
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

  const handleClick = () => {
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
      url: '/IRforCN/Retrieval/vectorSpaceMode/testRetriever',
      method: 'post',
      params: {
        query: 'qq群共享文件下载失败',
        formulaId,
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

  /**
   * 检索请求
   */
  const searchQuery = async () => {
    setSearchLoading(true)
    const res = await requestFn(dispatch, {
      url: '/IRforCN/Retrieval/vectorSpaceMode/search',
      method: 'post',
      params: {
        query: 'qq群共享文件下载失败',
        formulaId: 1,
        smoothParam: 0.5
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
   * 错误提示
   */
  const errorTips = (message = '', description = '') => {
    notification.error({
      message,
      description
    })
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
        <Select className={styles.Select} size="large">
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
        <span>请输入查询语句:</span>
        <Input autoComplete="off" size="large" />
        <Button type="primary" size="large" onClick={searchQuery}>
          检索
        </Button>
      </div>
    )
  }

  /**
   * 渲染检索步骤
   */
  const renderSearchSteps = () => {
    return <div>123</div>
  }

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
          columns={standardColumns}
          size="small"
          pagination={false}
          bordered
          className={`GlobalVectorSpaceTable ${styles.Table}`}
        />
      </div>
    )
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
      </div>
      <Button type="primary" onClick={handleClick}>
        下一步
      </Button>
      <div>向量空间模型</div>
    </div>
  )
}

const VectorSpaceExperiment = withRouter(VectorSpaceExperimentComponent)

export default VectorSpaceExperiment
