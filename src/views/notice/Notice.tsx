import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import styles from './notice.module.less'

const defaultPageSize = 5

const defaultNotices = [
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
    return <span>上一页</span>
  }
  if (type === 'next') {
    return <span>下一页</span>
  }
  return originalElement
}

const Notice = () => {
  const [notices, setNotices] = useState<{ title: string; date: string; year: string }[]>([])
  const [currentPageIndex, setCurrentPageIndex] = useState(1)

  useEffect(() => {
    const initNotices = () => {
      const newNotices = defaultNotices.filter((i, index) => {
        return index >= (currentPageIndex - 1) * defaultPageSize && index < currentPageIndex * defaultPageSize
      })
      setNotices(newNotices)
    }

    initNotices()
  }, [currentPageIndex])

  const onPageChange = (page: number) => {
    setCurrentPageIndex(page)
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
            <Pagination
              defaultCurrent={currentPageIndex}
              total={defaultNotices.length}
              itemRender={itemRender}
              defaultPageSize={defaultPageSize}
              onChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notice
