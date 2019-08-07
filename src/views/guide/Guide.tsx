import React from 'react'
import styles from "./Guide.module.less"

const Guide = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.topContainer}>
        <div className={styles.topTitle}>实验指导</div>
        <div className={styles.subTitle}>Experimental Instruction</div>
      </div>
      <div className={styles.videoContainer}>
          放引导视频
      </div>
    </div>
  )
}

export default Guide
