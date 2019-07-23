import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styles from './Announcement.module.less'

const notices = [
  {
    title: '教育部高等教育司关于开展2019年国家精品在先开发课程认定工作的通知（教高司函【2019】33号）',
    date: '07-02',
    year: '2019'
  },
  {
    title: '关于开展2019年度国家虚拟仿真实验教学项目认定工作的通知（教高司函【2019】33号）',
    date: '07-02',
    year: '2019'
  }
]

/**
 * 登录页的通知公告组件
 */
const AnnouncementComponet = (props: RouteComponentProps) => {
  const goRoute = (path: string) => {
    props.history.push(path)
  }

  const renderNotices = () => {
    return notices.map((i, index: number) => {
      return (
        <div key={index} className={styles.NoticeItem} onClick={() => goRoute('/notice')}>
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
      <div className={styles.TitleRow}>
        <div className={styles.Label}></div>
        <span className={styles.Title}>通知公告</span>
        <span className={styles.Description}>announcement</span>
      </div>
      {renderNotices()}
    </div>
  )
}

const Announcement = withRouter(AnnouncementComponet)

export default Announcement
