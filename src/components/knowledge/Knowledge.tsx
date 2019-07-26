import React from 'react'
import styles from './Knowledge.module.less'

interface KnowledgeProps {
  knowledge: { title: string; content: string }[]
}

/**
 * 温故知新
 */
const Knowledge = (props: KnowledgeProps) => {
  const renderContent = () => {
    return props.knowledge.map((i, index) => {
      return (
        <div key={index}>
          <div className={styles.KnowledgeWrapper}>
            <div className={styles.TitleWrapper}>
              <span>{i.title}</span>
            </div>
            <div className={styles.Content} dangerouslySetInnerHTML={{ __html: i.content }} />
          </div>
        </div>
      )
    })
  }

  return <div>{renderContent()}</div>
}

export default Knowledge
