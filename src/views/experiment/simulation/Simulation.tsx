import React, { useState } from 'react'
import { Input } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router'
import styles from './Simulation.module.less'
import Steps from '../../../components/steps/Steps'

const { Search } = Input

/**
 * 仿真我的搜索引擎
 */
const SimulationComponent = (props: RouteComponentProps) => {
  const [serachResult, setserachResult] = useState(true)
  const [search, setSearch] = useState('')

  const handleClick = () => {
    props.history.replace('/report')
  }

  const handleSearch = (value: string) => {
    setserachResult(false)
    setSearch(value)
  }

  const ResultList = [
    {
      title: '我的世界Minecraft中国版官方网站——你想玩的,这里都有',
      url: 'http://mc.163.com/',
      content:
        '网易游戏代理的《我的世界》(Minecraft)手游,你想玩的,这里都有!作为中国顶尖UGC游戏平台,《我的世界》汇聚全球优秀创造者提供海量玩法内容。赶紧和你的小伙伴一...'
    },
    {
      title: "Ant Design - The world's second most popular React UI framework",
      url: 'https://ant.design/',
      content:
        'An enterprise-class UI design language and React implementation with a set of high-quality React components, one of best React UI library for enterprises'
    },
    {
      title: "Ant Design - The world's second most popular React UI framework",
      url: 'https://ant.design/',
      content:
        'An enterprise-class UI design language and React implementation with a set of high-quality React components, one of best React UI library for enterprises'
    },
    {
      title: '我的世界Minecraft中国版官方网站——你想玩的,这里都有',
      url: 'http://mc.163.com/',
      content:
        '网易游戏代理的《我的世界》(Minecraft)手游,你想玩的,这里都有!作为中国顶尖UGC游戏平台,《我的世界》汇聚全球优秀创造者提供海量玩法内容。赶紧和你的小伙伴一...'
    },
    {
      title: '我的世界Minecraft中国版官方网站——你想玩的,这里都有',
      url: 'http://mc.163.com/',
      content:
        '网易游戏代理的《我的世界》(Minecraft)手游,你想玩的,这里都有!作为中国顶尖UGC游戏平台,《我的世界》汇聚全球优秀创造者提供海量玩法内容。赶紧和你的小伙伴一...'
    }
  ]

  // 渲染结果
  const renderResult = () => {
    if (ResultList.length > 0) {
      return ResultList.map(i => {
        return (
          <div className={styles.Result}>
            <a className={styles.resultTitle} href={i.url}>
              {i.title}
            </a>
            <div className={styles.resultContent}>{i.content.substring(0, 140)}</div>
          </div>
        )
      })
    } else {
      return <div>找不到搜索结果</div>
    }
  }

  return (
    <div className={styles.Container}>
      <Steps current="仿真我的搜索引擎" finishedItems={9} />
      <div className={styles.Content}>
        <div className={styles.MiddleSection} hidden={!serachResult}>
          <h1 className={styles.SectionTitle}>仿真我的搜索引擎</h1>
          <Search
            className={styles.InputSection}
            placeholder="输入检索式"
            enterButton="搜索"
            size="large"
            onSearch={handleSearch}
          />
        </div>
        <div hidden={serachResult}>
          <div className={styles.topSection}>
            <div className={styles.topTitle}>仿真我的搜索引擎</div>
            <Search
              className={styles.InputSection}
              placeholder={search}
              enterButton="搜索"
              size="large"
              onSearch={handleSearch}
            />
          </div>
          <div className={styles.ResultSection}>{renderResult()}</div>
        </div>
        <div></div>
        <button onClick={handleClick} className={styles.button}>
          跳实验报告的下一步
        </button>
      </div>
    </div>
  )
}

const Simulation = withRouter(SimulationComponent)

export default Simulation
