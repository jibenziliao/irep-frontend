import React, { useState, useCallback } from 'react'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button, Select, notification, Radio, Table, Icon, Spin, Input } from 'antd'
import echarts from 'echarts'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import styles from './EvaluationExperiment.module.less'
import { vectorSpaceQueryOptions, defaultChartColors } from '../../../config/Constant'
import { requestFn } from '../../../utils/request'
import { useDispatch, useMappedState, State } from '../../../store/Store'
import { Actions } from '../../../store/Actions'
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

const defaultModals = [
  {
    name: '布尔模型',
    value: 0
  },
  {
    name: '向量空间模型',
    value: 1
  },
  {
    name: '概率模型',
    value: 2
  },
  {
    name: '语言模型',
    value: 3
  }
]

const { Option } = Select
const { TextArea } = Input

const EvaluationExperimentComponent = (props: RouteComponentProps) => {
  const dispatch: Dispatch<Actions> = useDispatch()
  const state: State = useMappedState(useCallback((globalState: State) => globalState, []))
  // 仿真我的搜索引擎，输入框中的值
  const [query, setQuery] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [calculationLoading, setCalculationLoading] = useState(false)
  const [performanceLoading, setPerformanceLoading] = useState(false)
  // 性能对比图配置
  const [performanceOption, setPerformanceOption] = useState()
  // roc曲线图配置
  const [rocOption, setRocOption] = useState()
  // 正确率-召回率曲线图配置
  const [prOption, setPrOption] = useState()
  // 性能对比雷达图对比
  const [radarOption, setRadarOption] = useState()
  // 综合分析
  const [analysisText, setAnalysisText] = useState()
  const [saveAnalysLoading, setSaveAnalysLoading] = useState(false)
  // 需要仿真的模型
  const [modalType, setModalType] = useState(0)

  /**
   * 定义列的对齐方式，居中
   */
  const columnAlignCenter: columnAlignType = 'center'

  /**
   * 参考排名列
   */
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
   * 我的检索排名列
   */
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

  /**
   * 渲染相关度列
   */
  const renderIsExisting = (isExisting: boolean) => {
    if (isExisting) {
      return <Icon type="check" />
    } else {
      return <Icon type="close" />
    }
  }

  /**
   * 获取模型性能对比图配置
   */
  const getChartBarOption = (yAxisData: string[], seriesData: number[]) => {
    const option = {
      title: {
        text: '检索模型性能对比',
        show: false
      },
      color: defaultChartColors,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: '{b0}: {c0}%'
      },
      grid: { containLabel: true },
      xAxis: { name: '性能' },
      yAxis: {
        name: '参数',
        type: 'category',
        data: yAxisData
      },
      series: [
        {
          type: 'bar',
          data: seriesData
        }
      ]
    }
    return option
  }

  /**
   * 获取ROC曲线和正确率-召回率曲线图配置
   */
  const getCurveOption = (series: number[][], xAxisName: string, yAxisName: string) => {
    const option = {
      color: defaultChartColors,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        },
        formatter: (param: any) => {
          const arr = [`${xAxisName}: ${param[0].value[1]}`, `${yAxisName}:${param[0].value[0]}`]
          return arr.join('<br>')
        }
      },
      xAxis: {
        min: 0,
        max: 1,
        name: xAxisName,
        type: 'value'
      },
      yAxis: {
        min: 0,
        max: 1,
        name: yAxisName,
        type: 'value'
      },
      series: [
        {
          type: 'line',
          smooth: true,
          data: series
        }
      ]
    }
    return option
  }

  /**
   * 获取综合性能雷达图
   */
  const getRadarOption = (indicator: { name: string; max: number }[], seriesData: number[]) => {
    const option = {
      tooltip: {},
      radar: {
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: indicator
      },
      series: [
        {
          type: 'radar',
          name: '综合性能雷达图',
          data: [
            {
              value: seriesData
            }
          ]
        }
      ]
    }
    return option
  }

  /**
   * 点击下一步
   */
  const goNextStep = () => {
    props.history.replace('/experiment/simulation')
  }

  /**
   * 点击检索模型性能对比按钮
   */
  const getPerformance = async () => {
    setPerformanceLoading(true)
    const res = await requestFn(dispatch, {
      url: '',
      method: 'post',
      data: {}
    })
    if (res && res.status === 200 && res.data) {
      // TODO: renderChart
    } else {
      errorTips('获取模型性能对比失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
      const yAxisData = [
        'F1',
        'ap',
        'ndcg@20',
        'ndcg@10',
        'ndcg@5',
        'ndcg',
        'r@20',
        'r@10',
        'r@5',
        'recall',
        'p@20',
        'p@10',
        'p@5',
        'precision'
      ]
      const seriesData = [18.9, 22.2, 24.6, 32.45, 38.67, 41.35, 43.96, 49.92, 52, 58.56, 64.32, 75.54, 84.23, 93.76]
      const option = getChartBarOption(yAxisData, seriesData)
      setPerformanceOption(option)
      const rocSeriesData = [
        [0.005, 0.1806],
        [0.01, 0.2464],
        [0.02, 0.3309],
        [0.03, 0.3898],
        [0.04, 0.436],
        [0.05, 0.4742],
        [0.06, 0.507],
        [0.06, 0.507],
        [0.08, 0.5612],
        [0.09, 0.5842],
        [0.1, 0.6051],
        [0.11, 0.6243],
        [0.12, 0.642],
        [0.13, 0.6584],
        [0.14, 0.6737],
        [0.15, 0.688],
        [0.2, 0.7479],
        [0.25, 0.794],
        [0.3, 0.8308],
        [0.4, 0.8858],
        [0.5, 0.9243],
        [0.6, 0.9521],
        [0.7, 0.9721],
        [0.8, 0.9862],
        [0.9, 0.9954],
        [0.95, 0.9983]
      ]
      const prSeriesData = [[0, 1], [0.2, 0.95], [0.4, 0.93], [0.57, 0.9], [0.8, 0.8], [0.9, 0.6], [1, 0]]
      const radarIndicator = [
        { name: 'F1', max: 100 },
        { name: 'ap', max: 100 },
        { name: 'ndcg@20', max: 100 },
        { name: 'ndcg@10', max: 100 },
        { name: 'ndcg@5', max: 100 },
        { name: 'ndcg', max: 100 },
        { name: 'r@20', max: 100 },
        { name: 'r@10', max: 100 },
        { name: 'r@5', max: 100 },
        { name: 'recall', max: 100 },
        { name: 'p@20', max: 100 },
        { name: 'p@10', max: 100 },
        { name: 'p@5', max: 100 },
        { name: 'precision', max: 100 }
      ]
      const radarSeriesData = [
        18.9,
        22.2,
        24.6,
        32.45,
        38.67,
        41.35,
        43.96,
        49.92,
        52,
        58.56,
        64.32,
        75.54,
        84.23,
        93.76
      ]
      const tmpPrOption = getCurveOption(prSeriesData, '正确率', '召回率')
      const tmpRocOption = getCurveOption(rocSeriesData, '正样本比例', '负样本比例')
      const tmpRadarOption = getRadarOption(radarIndicator, radarSeriesData)
      setRocOption(tmpRocOption)
      setPrOption(tmpPrOption)
      setRadarOption(tmpRadarOption)
    }
    setPerformanceLoading(false)
  }

  /**
   * 分析检索模型性能下拉列表备选项
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
   * 计算所选公式查询结果与标准查询结果的相似度
   */
  const testRetriever = async () => {
    setCalculationLoading(true)
    const res = await requestFn(dispatch, {
      url: '/IRforCN/Retrieval/vectorSpaceModel/testRetriever',
      method: 'post',
      params: {
        query: 'qq群共享文件下载失败',
        formulaId: 5,
        smoothParam: 0.5
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
   * 实时更新用户输入的综合分析文本
   */
  const udpateAnalysisText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnalysisText(event.target.value)
  }

  /**
   * 保存用户填写的综合分析
   */
  const saveText = async () => {
    setSaveAnalysLoading(true)
    const res = await requestFn(dispatch, {
      url: '/score/updateAnalyticalContent',
      method: 'post',
      data: {
        experimentId: 8,
        analyticalContent: analysisText
      }
    })
    if (res && res.status && res.data && res.data.code === 0) {
      successTips('保存成功')
    } else {
      errorTips('保存分析失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
    }
    setSaveAnalysLoading(false)
  }

  /**
   * 选中需要仿真的模型
   */
  const updateModalType = (type: number) => {
    setModalType(type)
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
   * 渲染模型新能对比图
   */
  const renderPerformanceChart = () => {
    if (!performanceLoading && performanceOption) {
      return (
        <div className={styles.PerformanceWrapper}>
          <ReactEchartsCore
            echarts={echarts}
            option={performanceOption}
            notMerge={true}
            lazyUpdate={true}
            className={styles.PerformanceChart}
            theme={'theme_name'}
          />
        </div>
      )
    } else {
      return <div className={styles.PerformanceWrapper}></div>
    }
  }

  /**
   * 渲染ROC曲线图
   */
  const renderROCChart = () => {
    if (!performanceLoading && rocOption) {
      return (
        <ReactEchartsCore
          echarts={echarts}
          option={rocOption}
          notMerge={true}
          lazyUpdate={true}
          className={styles.GroupChart}
          theme={'theme_name'}
        />
      )
    } else {
      return <div className={styles.GroupChart}></div>
    }
  }

  /**
   * 渲染正确率-召回率曲线图
   */
  const renderPRChart = () => {
    if (!performanceLoading && prOption) {
      return (
        <ReactEchartsCore
          echarts={echarts}
          option={prOption}
          notMerge={true}
          lazyUpdate={true}
          className={styles.GroupChart}
          theme={'theme_name'}
        />
      )
    } else {
      return <div className={styles.GroupChart}></div>
    }
  }

  /**
   * 渲染雷达图
   */
  const renderRadarChart = () => {
    if (!performanceLoading && radarOption) {
      return (
        <div className={styles.PerformanceWrapper}>
          <ReactEchartsCore
            echarts={echarts}
            option={radarOption}
            notMerge={true}
            lazyUpdate={true}
            className={styles.PerformanceChart}
            theme={'theme_name'}
          />
        </div>
      )
    } else {
      return <div className={styles.PerformanceWrapper}></div>
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
   * 渲染需要仿真的模型
   */
  const renderModals = () => {
    return defaultModals.map(i => {
      return (
        <div
          key={i.name}
          className={`${styles.Modal} ${modalType === i.value ? styles.Active : ''}`}
          onClick={() => updateModalType(i.value)}
        >
          {i.name}
        </div>
      )
    })
  }

  return (
    <div>
      <div className={styles.SearchWrapper}>
        <span className={styles.SearchLabel}>请选择标准查询</span>
        <Select className={`GlobalSelect ${styles.Select}`} size="large">
          {renderSelectOptions()}
        </Select>
        <Button type="primary" size="large" loading={calculationLoading} onClick={testRetriever}>
          计算
        </Button>
      </div>
      <div className={styles.ModalWrapper}>
        <Radio.Group defaultValue="a" buttonStyle="solid" className={`GlobalEvaluationRadioGroup ${styles.RadioGroup}`}>
          <Radio.Button value="a">布尔模型</Radio.Button>
          <Radio.Button value="b">向量空间模型</Radio.Button>
          <Radio.Button value="c">概率模型</Radio.Button>
          <Radio.Button value="d">语言模型</Radio.Button>
        </Radio.Group>
      </div>
      <div className={styles.TableNames}>
        <p>参考排名</p>
        <p>我的检索器排序</p>
      </div>
      {renderTables()}
      <Button type="primary" className={styles.PerformanceBtn} onClick={getPerformance} loading={performanceLoading}>
        检索模型性能对比
      </Button>
      <Spin spinning={performanceLoading}>{renderPerformanceChart()}</Spin>
      <div className={styles.LineChartGroup}>
        <p>ROC曲线</p>
        <p>正确率-召回曲线</p>
      </div>
      <Spin spinning={performanceLoading}>
        <div className={styles.ChartGroupWrapper}>
          {renderROCChart()}
          {renderPRChart()}
        </div>
      </Spin>
      <p className={styles.ChartTitle}>综合性能雷达图</p>
      <Spin spinning={performanceLoading}>{renderRadarChart()}</Spin>
      <div className={styles.TextAreaTite}>请结合试验效果对以上四个模型进行综合分析:</div>
      <TextArea rows={14} className={styles.TextArea} value={analysisText} onChange={udpateAnalysisText} />
      <div className={styles.SaveBtn}>
        <Button type="primary" loading={saveAnalysLoading} onClick={saveText}>
          确认
        </Button>
      </div>
      <div className={styles.TextAreaTite}>请选择需要仿真的模型:</div>
      <div className={styles.ModalWrapper}>{renderModals()}</div>
      <div className={styles.NextStepBtn}>
        <Button type="primary" onClick={goNextStep}>
          确认
        </Button>
      </div>
    </div>
  )
}

const EvaluationExperiment = withRouter(EvaluationExperimentComponent)

export default EvaluationExperiment
