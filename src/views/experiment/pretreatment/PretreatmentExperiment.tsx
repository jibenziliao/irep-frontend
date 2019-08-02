import React, { useCallback, useState } from 'react'
import { Button, Select, Input, Checkbox, InputNumber, notification } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router'
import { Dispatch } from 'redux'
import { useDispatch, useMappedState, State } from '../../../store/Store'
import { Actions } from '../../../store/Actions'
import styles from './PretreatmentExperiment.module.less'
import { requestFn } from '../../../utils/request'

//词云部分
const WordCloud = props => {
  const dispatch: Dispatch<Actions> = useDispatch()
  const { Option } = Select
  const [analyzerName, setAnalyzerName] = useState('standard')
  const [isRemoveStopWord, setisRemoveStopWord] = useState(false)
  const [segmentResult, setsegmentResult] = useState('词云图')
  const { originalArticle } = props

  //处理分词器选择
  const handleChoose = value => {
    setAnalyzerName(value)
  }

  // 处理是否去除停用词
  const handleChecked = event => {
    setisRemoveStopWord(event.target.checked)
  }

  // 获得分词结果
  const segmentConfirm = async () => {
    if (originalArticle.length > 0) {
      const res = await requestFn(dispatch, {
        url: '/IRforCN/preProcessing/preProcess',
        method: 'post',
        params: {
          // 测试用，需要改成body接收参数，否则会报431错误
          token: originalArticle.substring(0, 1005),
          analyzerName: analyzerName,
          isRemoveStopWord: isRemoveStopWord
        }
      })
      if (res && res.status === 200 && res.data) {
        getWordCloud(res.data)
      }
    } else {
      alert('请选择要处理的文档')
    }

    // 返回词云分析这个操作
    const operate = await requestFn(dispatch, {
      url: '/score/createOperationRecord',
      method: 'post',
      params: {
        experimentId: 2,
        operationName: '词云分析'
      }
    })
  }

  const getWordCloud = data => {
    setsegmentResult(data.join(' '))
  }

  return (
    <div className={styles.wordSection}>
      <div className={styles.wordCloudSectionTitle}>词云分析</div>
      <div className={styles.wordCloudBox}>{segmentResult}</div>
      <div className={styles.wordCloudChoose}>
        <Select defaultValue="standard" style={{ width: 150 }} onChange={handleChoose.bind(this)}>
          <Option value="standard">标准分词器</Option>
          <Option value="whitespace">空格分词器</Option>
          <Option value="simple">简单分词器</Option>
          <Option value="CJK">二分法分词器</Option>
          <Option value="smartChinese">中文智能分词器</Option>
        </Select>
        <Checkbox onChange={handleChecked}>去停用词</Checkbox>
        <Button className={styles.button} onClick={segmentConfirm}>
          分析
        </Button>
      </div>
    </div>
  )
}

// 预处理部分
const PretreatmentExperimentComponent = (props: RouteComponentProps) => {
  const dispatch: Dispatch<Actions> = useDispatch()
  const state: State = useMappedState(useCallback((globalState: State) => globalState, []))
  const { TextArea } = Input
  const { Option } = Select
  const [experimentDisabled, setexperimentDisabled] = useState(true)
  const [docId, setDocId] = useState(0)
  const [originalArticle, setOriginalArticle] = useState(
    '最近下载qq群共享里的文件发现,下载老是提示下载失败,以为是毛豆的原因(装了毛豆V7),于是禁用了D+和墙,结果还是下载失败。于是卸载重装了三次,结果还是下载失败。在其他电脑上却可以下载。求解。谢谢。 QQ有木有卸载重装过呢? 试试网页(群空间)上下载。 网页上的位置是: 好的,我试下。卸载重装过四次。注册表啥的清理的都找不到,还是不能下载。 换一台机子,看是否系统问题本帖最后由 jzh100 于2014-4-26 14:54 编辑 最近下载qq群共享里的文件发现,下载老是提示下载失败,以为是毛豆的原因(装了毛豆V7),于是禁用了D+和墙,结果还是下载失败。于是卸载重装了三次,结果还是下载失败。在其他电脑上却可以下载。求解。谢谢。 QQ有木有卸载重装过呢? 试试网页(群空间)上下载。 网页上的位置是:http://qun.qzone.qq.com/group#!/群号/share 19940906 发表于 2014-4-26 15:57 QQ有木有卸载重装过呢? 试试网页(群空间)上下载。 换一台机子,看是否系统问题 电脑版qq群共享里的文件老是下载失败,求解_解疑答难区_软件区 卡饭论坛 - 互助分享 - 大气谦和! 收藏本站 | 切换到宽版 | 更换论坛皮肤 找回密码 忘记邮箱 QQ快速登录 快速登录 快速注册 本版 帖子 用户 首页 主站首页 论坛 论坛 资讯 一起聊聊资讯 安全 讨论和研究安全的区域 软件 讨论和琢磨软件的区域 硬件 硬件有关话题的讨论 休闲 休闲放松的地方 搜索 帖子 快速对帖子进行分类阅读和查找 软件推荐 推荐各种优秀的软件 荣誉榜 帮助 解决你所碰到的问题 国内杀毒软件 国外杀毒软件 病毒样本 辅助工具 虚拟机 浏览器 解疑答难 软件下载 茶舍 会员服务 国内杀毒软件 国外杀毒软件 卡巴斯基 病毒样本 虚拟机 安全工具 原创工具 IT资讯 软件首发 综合区 软件下载 解疑答难 浏览器 软件吐槽 手机 路由器 硬件综合 茶舍 音乐红茶坊 卡饭运动场 好图共赏 ACG综合区 会员服务 论坛搜索 百度搜索 查看新帖 最新热门 我的帖子 优秀帖子专辑 软件别烦计划 安全软件推荐 安静软件推荐 Firefox资源推荐 第一期伯乐TOP10 第二期伯乐TOP10 第三期伯乐TOP10 2015年上半年伯乐 2015年下半年伯乐TOP30 2016年上半年伯乐 论坛支持 解疑答难 安全验证 请完成以下验证码 卡饭 » 论坛 › 软件区 › 解疑答难区 › 电脑版qq群共享里的文件老是下载失败,求解 返回列表 查看: 26792 | 回复: 3 [复制链接] jzh100 发表于 2014-4-26 14:28:18'
  )
  const [analyzerName, setAnalyzerName] = useState('standard')
  const [isRemoveStopWord, setisRemoveStopWord] = useState(false)
  const [segmentResult, setsegmentResult] = useState('分词结果')

  //处理文本选择框的变化
  const DocIdChange = (value: number | undefined) => {
    setDocId(value || 0)
    getOriginalArticle(value)
  }

  //原文件文本框数据
  const getOriginalArticle = async docId => {
    const res = await requestFn(dispatch, {
      url: '/IRforCN/preProcessing/getDoc',
      method: 'post',
      params: {
        docId: docId
      }
    })
    if (res && res.status === 200 && res.data) {
      setOriginalArticle(res.data.content)
    }
  }

  // 结合词云分析结果简要概述....按钮点击
  const concludeConfirm = async () => {
    setexperimentDisabled(false)
    const res = await requestFn(dispatch, {
      url: '/score/updateAnalyticalContent',
      method: 'post',
      params: {
        experimentId: 2,
        analyticalContent: 'standard'
      }
    })
    if (res && res.status === 200 && res.data) {
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
    // alert(`selected ${value}`);
    setAnalyzerName(value)
  }

  // 选择是否去停用词
  const handleChecked = event => {
    // alert(event.target.checked)
    setisRemoveStopWord(event.target.checked)
  }

  // 分析按钮
  const handelAnalyze = async () => {
    if (originalArticle.length > 0) {
      const res = await requestFn(dispatch, {
        url: '/IRforCN/preProcessing/preProcess',
        method: 'post',
        params: {
          // 测试用，需要改成body接收参数，否则会报431错误
          token: originalArticle.substring(0, 1005),
          analyzerName: analyzerName,
          isRemoveStopWord: isRemoveStopWord
        }
      })
      if (res && res.status === 200 && res.data) {
        setsegmentResult(res.data.join(' '))
      }
    } else {
      errorTips('请选择要预处理的文档')
    }

    // 返回仿真我的搜索引擎这一步操作
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

  return (
    <div className={styles.Section}>
      <div className={styles.articleNavBar}>
        <div className={styles.SectionTitle}>原文件</div>
        <div className={styles.articelNumberBox}>
          <label>示例文档：</label>
          <InputNumber min={0} max={165} defaultValue={0} onChange={DocIdChange} />
        </div>
      </div>
      <div className={styles.originalArticleBox}>{originalArticle}</div>
      <div className={styles.wordCloudSection}>
        <WordCloud originalArticle={originalArticle} />
        <WordCloud originalArticle={originalArticle} />
      </div>
      <div className={styles.concludeSection}>
        <div className={styles.SectionTitle}>请结合词云分析结果简要概述各预处理器处理效果：</div>
        <TextArea rows={6} />
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
        <Button onClick={handleClick} className={styles.button} disabled={experimentDisabled}>
          下一步
        </Button>
      </div>
    </div>
  )
}

const PretreatmentExperiment = withRouter(PretreatmentExperimentComponent)

export default PretreatmentExperiment
