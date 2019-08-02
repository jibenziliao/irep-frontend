import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styles from './notice.module.less'
import { number } from 'prop-types'
import { Pagination } from 'antd'

const notices = [
  {
    title:
      '教育部高等教育司关于开展2019年国家精品在先开发课程认定工作的通知（教高司函【2019】33号）教育部高等教育司关于开展2019年国家精品在先开发课程认定工作的通知（教高司函【2019】33号）',
    date: '07-02',
    year: '2019'
  },
  {
    title: '关于开展2019年度国家虚拟仿真实验教学项目认定工作的通知（教高司函【2019】33号）',
    date: '07-02',
    year: '2019'
  },
  {
    title: '关于开展2019年度国家虚拟仿真实验教学项目认定工作的通知（教高司函【2019】33号）',
    date: '07-02',
    year: '2019'
  },
  {
    title: '关于开展2019年度国家虚拟仿真实验教学项目认定工作的通知（教高司函【2019】33号）',
    date: '07-02',
    year: '2019'
  },
  {
    title: '关于开展2019年度国家虚拟仿真实验教学项目认定工作的通知（教高司函【2019】33号）',
    date: '07-02',
    year: '2019'
  },
  {
    title: '关于开展2019年度国家虚拟仿真实验教学项目认定工作的通知（教高司函【2019】33号）',
    date: '07-02',
    year: '2019'
  }
]

function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <a>上一页</a>
  }
  if (type === 'next') {
    return <a>下一页</a>
  }
  return originalElement
}

const NoticeConmponet = (props: RouteComponentProps) => {
  const switchRoute = (path: string) => {
    props.history.replace(path)
  }
  const renderNotices = () => {
    return notices.map((i, index: number) => {
      return (
        <div key={index} className={styles.NoticeItem}>
          <div className={styles.NoticeTitle}>{i.title}</div>
          <div className={styles.Time}>
            <p className={styles.Date}>{i.date}</p>
            <p className={styles.Year}>{i.year}</p>
          </div>
        </div>
      )
    })
  }

  return (
    <div className={styles.Container}>
      <div className={styles.topContainer}>
        <div className={styles.topTitle}>系统通知</div>
        <div className={styles.subTitle}>System Notifiction</div>
      </div>
      <div className={styles.Content}>
        <div className={styles.notices}>
          {renderNotices()}
          <div className={styles.Pagination}>
            <Pagination defaultCurrent={1} total={100} itemRender={itemRender} defaultPageSize={5} />
          </div>
        </div>
      </div>
    </div>
  )
}

const Notice = withRouter(NoticeConmponet)

export default Notice
