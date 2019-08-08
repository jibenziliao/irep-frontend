import React, { useState } from 'react'
import { Dispatch } from 'redux'
import { Input, notification, Button } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router'
import styles from './Simulation.module.less'
import Steps from '../../../components/steps/Steps'
import { requestFn } from '../../../utils/request'
import { useDispatch } from '../../../store/Store'
import { Actions } from '../../../store/Actions'
import { SearchResult } from '../../../modal/Search'

const ResultList: SearchResult[] = [
  {
    title: '我的世界Minecraft中国版官方网站——你想玩的,这里都有',
    url: 'http://mc.163.com/',
    content:
      '网易游戏代理的《我的世界》(Minecraft)手游,你想玩的,这里都有!作为中国顶尖UGC游戏平台,《我的世界》汇聚全球优秀创造者提供海量玩法内容。赶紧和你的小伙伴一...',
    docId: 1
  },
  {
    title: "Ant Design - The world's second most popular React UI framework",
    url: 'https://ant.design/',
    content:
      'An enterprise-class UI design language and React implementation with a set of high-quality React components, one of best React UI library for enterprises',
    docId: 2
  },
  {
    title: "Ant Design - The world's second most popular React UI framework",
    url: 'https://ant.design/',
    content:
      'An enterprise-class UI design language and React implementation with a set of high-quality React components, one of best React UI library for enterprises',
    docId: 3
  },
  {
    title: '我的世界Minecraft中国版官方网站——你想玩的,这里都有',
    url: 'http://mc.163.com/',
    content:
      '网易游戏代理的《我的世界》(Minecraft)手游,你想玩的,这里都有!作为中国顶尖UGC游戏平台,《我的世界》汇聚全球优秀创造者提供海量玩法内容。赶紧和你的小伙伴一...',
    docId: 4
  },
  {
    title: '我的世界Minecraft中国版官方网站——你想玩的,这里都有',
    url: 'http://mc.163.com/',
    content:
      '网易游戏代理的《我的世界》(Minecraft)手游,你想玩的,这里都有!作为中国顶尖UGC游戏平台,《我的世界》汇聚全球优秀创造者提供海量玩法内容。赶紧和你的小伙伴一...',
    docId: 5
  }
]

const { Search } = Input

/**
 * 仿真我的搜索引擎
 */
const SimulationComponent = (props: RouteComponentProps) => {
  const dispatch: Dispatch<Actions> = useDispatch()
  const [showResult, setShowResult] = useState(true)
  const [results, setResults] = useState<SearchResult[]>(ResultList)

  /**
   * 点击完成按钮，前往试验报告页面
   */
  const handleClick = () => {
    props.history.replace('/report')
  }

  /**
   * 搜索
   */
  const search = async (value: string) => {
    const res = await requestFn(dispatch, {
      url: '/IRforCN/Simulation/selectModel',
      method: 'post',
      params: {
        query: value
      }
    })
    if (res && res.status === 200 && res.data && !res.data.msg) {
      if (res.data.push) {
        const newResults = res.data.filter((_: SearchResult, index: number) => index < 5)
        setResults(newResults)
      }
    } else {
      errorTips('检索失败', res && res.data && res.data.msg ? res.data.msg : '请求错误，请重试！')
    }
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
   * 点击搜索按钮
   */
  const handleSearch = (value: string) => {
    setShowResult(false)
    search(value)
  }

  /**
   * 渲染搜索结果
   */
  const renderResult = () => {
    if (results.length > 0) {
      return results.map((i, index) => {
        return (
          <div key={index} className={styles.Result}>
            <a className={styles.resultTitle} href={i.url} target="_black" rel="noopener noreferrer">
              {i.title}
            </a>
            <div className={styles.resultContent}>{i.content}</div>
          </div>
        )
      })
    } else {
      return <div className={styles.EmptyResult}>找不到搜索结果</div>
    }
  }

  return (
    <div className={styles.Container}>
      <Steps current="仿真我的搜索引擎" finishedItems={9} />
      <div className={styles.Content}>
        <div className={styles.MiddleSection} hidden={!showResult}>
          <h1 className={styles.SectionTitle}>仿真我的搜索引擎</h1>
          <Search
            className={styles.InputSection}
            placeholder="输入检索式"
            enterButton="搜索"
            size="large"
            onSearch={handleSearch}
          />
        </div>
        <div hidden={showResult}>
          <div className={styles.topSection}>
            <div className={styles.topTitle}>仿真我的搜索引擎</div>
            <Search
              className={styles.InputSection}
              placeholder="输入检索式"
              enterButton="搜索"
              size="large"
              onSearch={handleSearch}
            />
          </div>
          <div className={styles.ResultSection}>{renderResult()}</div>
        </div>
        <Button type="primary" hidden={showResult} onClick={handleClick} className={styles.NextBtn}>
          完成
        </Button>
      </div>
    </div>
  )
}

const Simulation = withRouter(SimulationComponent)

export default Simulation
