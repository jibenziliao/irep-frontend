import React from 'react'
import styles from './Guide.module.less'
import videoSource from '../../assets/videos/irep.mp4'

const Guide = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.topContainer}>
        <div className={styles.topTitle}>实验指导</div>
        <div className={styles.subTitle}>Experimental Instruction</div>
      </div>
      <div className={styles.videoContainer}>
        <video controls>
          <source src={videoSource} type="video/mp4" />
          {/* <source src="http://www.acef-apc.com/upload/1/editor/1554891927237.mp4" type="video/mp4" /> */}
        </video>
      </div>
    </div>
  )
}

export default Guide
