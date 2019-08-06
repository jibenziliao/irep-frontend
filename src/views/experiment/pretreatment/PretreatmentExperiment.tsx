import React, { useState, useEffect } from 'react'
import { Button, Select, Input, Checkbox, InputNumber, notification, Spin } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router'
import { Dispatch } from 'redux'
import { useDispatch } from '../../../store/Store'
import { Actions } from '../../../store/Actions'
import styles from './PretreatmentExperiment.module.less'
import { requestFn } from '../../../utils/request'
import WordCloud from '../../../components/wordCloud/WordCloud'

const { TextArea } = Input
const { Option } = Select

// 预处理部分
const PretreatmentExperimentComponent = (props: RouteComponentProps) => {
  const dispatch: Dispatch<Actions> = useDispatch()
  const [experimentDisabled, setexperimentDisabled] = useState(true)
  const [docId, setDocId] = useState(1)
  const [originalArticle, setOriginalArticle] = useState('')
  const [analyzerName, setAnalyzerName] = useState('standard')
  const [isRemoveStopWord, setisRemoveStopWord] = useState(false)
  const [segmentResult, setSegmentResult] = useState('分词结果')
  const [analysisText, setAnalysisText] = useState('')
  const [getDocLoading, setGetDocLoading] = useState(true)

  useEffect(() => {
    /**
     * 获取指定文档
     */
    const getDoc = async (id: number) => {
      setGetDocLoading(true)
      const res = await requestFn(dispatch, {
        url: '/IRforCN/preProcessing/getDoc',
        method: 'post',
        params: {
          docId: id
        }
      })
      if (res && res.status === 200 && res.data && res.data.content) {
        setOriginalArticle(res.data.content)
      } else {
        errorTips('获取文档失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
      }
      setGetDocLoading(false)
    }

    getDoc(docId)
  }, [dispatch, docId])

  //处理文本选择框的变化
  const DocIdChange = (value: number | undefined) => {
    setDocId(value || 0)
  }

  /**
   * 结合词云分析结果简要概述....按钮点击
   */
  const concludeConfirm = async () => {
    setexperimentDisabled(false)
    const res = await requestFn(dispatch, {
      url: '/score/updateAnalyticalContent',
      method: 'post',
      data: {
        experimentId: 1,
        analyticalContent: analysisText
      }
    })
    if (res && res.status === 200 && res.data && res.data.code === 0) {
      successTips('提交成功')
    } else {
      errorTips('提交失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
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

  //底部实验部分
  // 选择分词器
  const handleChoose = value => {
    setAnalyzerName(value)
  }

  // 选择是否去停用词
  const handleChecked = event => {
    setisRemoveStopWord(event.target.checked)
  }

  /**
   * 构建预处理器，点击分析按钮
   */
  const handelAnalyze = async () => {
    if (originalArticle.length > 0) {
      const res = await requestFn(dispatch, {
        url: '/IRforCN/preProcessing/preProcess',
        method: 'post',
        params: {
          token: originalArticle,
          // token: '绿茶软件园;资讯茶小编带来了qq群北',
          analyzerName: analyzerName,
          isRemoveStopWord: isRemoveStopWord
        }
      })
      if (res && res.status === 200 && res.data) {
        if (res.data.push) {
          setSegmentResult(res.data.join(' '))
        }
      } else {
        errorTips('分析失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
      }
    } else {
      errorTips('请选择要预处理的文档')
    }

    /**
     * 返回仿真我的搜索引擎这一步操作
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const operate = await requestFn(dispatch, {
      url: '/score/createOperationRecord',
      method: 'post',
      params: {
        experimentId: 2,
        operationName: '仿真预处理器'
      }
    })
  }

  // 最底部下一步
  const handleClick = () => {
    props.history.replace('/experiment/boolean')
  }

  /**
   * 实时更新用户输入的综合分析文本
   */
  const udpateAnalysisText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnalysisText(event.target.value)
  }

  return (
    <div className={styles.Section}>
      <div className={styles.articleNavBar}>
        <div className={styles.SectionTitle}>原文件</div>
        <div className={styles.articelNumberBox}>
          <label>示例文档：</label>
          <InputNumber min={0} max={165} defaultValue={docId} onChange={DocIdChange} />
        </div>
      </div>
      <Spin spinning={getDocLoading}>
        <div className={styles.originalArticleBox}>{originalArticle}</div>
      </Spin>
      <div className={styles.wordCloudSection}>
        <WordCloud docId={docId} />
        <WordCloud docId={docId} />
      </div>
      <div className={styles.concludeSection}>
        <div className={styles.SectionTitle}>请结合词云分析结果简要概述各预处理器处理效果：</div>
        <TextArea rows={6} value={analysisText} onChange={udpateAnalysisText} />
        <Button className={styles.button} onClick={concludeConfirm}>
          确定
        </Button>
      </div>
      <div className={styles.experimentSection}>
        <div className={styles.SectionTitle}>请确认我的预处理器参数：</div>
        <div className={styles.experimentChoose}>
          <div className={styles.segmentChoose}>
            <div className={styles.title}>选择分词器：</div>
            <Select defaultValue="standard" style={{ width: 150 }} onChange={handleChoose}>
              <Option value="standard">标准分词器</Option>
              <Option value="whitespace">空格分词器</Option>
              <Option value="simple">简单分词器</Option>
              <Option value="CJK">二分法分词器</Option>
              <Option value="smartChinese">中文智能分词器</Option>
            </Select>
          </div>
          <Checkbox onChange={handleChecked}>是否去停用词</Checkbox>
          <Button className={styles.button} onClick={handelAnalyze}>
            分析
          </Button>
        </div>
        <div className={styles.SectionTitle}>预处理结果：</div>
        <div className={styles.resultBox}>{segmentResult}</div>
        <div className={styles.NextBtn}>
          <Button onClick={handleClick} disabled={experimentDisabled}>
            下一步
          </Button>
        </div>
      </div>
    </div>
  )
}

const PretreatmentExperiment = withRouter(PretreatmentExperimentComponent)

export default PretreatmentExperiment
