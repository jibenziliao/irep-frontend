import React, { useState, useCallback } from 'react'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button, Select, notification, Radio, Table, Icon } from 'antd'
import styles from './EvaluationExperiment.module.less'
import { vectorSpaceQueryOptions } from '../../../config/Constant'
import { requestFn } from '../../../utils/request'
import { useDispatch, useMappedState, State, ExperimentCard } from '../../../store/Store'
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

const { Option } = Select

const EvaluationExperimentComponent = (props: RouteComponentProps) => {
  const dispatch: Dispatch<Actions> = useDispatch()
  const state: State = useMappedState(useCallback((globalState: State) => globalState, []))
  // 仿真我的搜索引擎，输入框中的值
  const [query, setQuery] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [calculationLoading, setCalculationLoading] = useState(false)

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

  /**
   * 点击下一步
   */
  const goNextStep = () => {
    props.history.replace('/experiment/simulation')
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
      <Button type="primary" className={styles.NextStepBtn} onClick={goNextStep}>
        下一步
      </Button>
    </div>
  )
}

const EvaluationExperiment = withRouter(EvaluationExperimentComponent)

export default EvaluationExperiment
