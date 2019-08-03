import React from 'react'
import styles from './Discussion.module.less'
import { Input, Button } from 'antd'
import addressImg from '../../assets/Discussion/address.png'
import answerImg from '../../assets/Discussion/answer.png'
import falseImg from '../../assets/Discussion/false.png'
import technologyImg from '../../assets/Discussion/technology.png'

const { TextArea } = Input

const Discussion = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.topContainer}>
        <div className={styles.topTitle}>联系我们</div>
        <div className={styles.subTitle}>Contact Us</div>
      </div>
      <div className={styles.Content}>
        <div className={styles.left}>
          <div className={styles.suggestion}>
            <h2 className={styles.title}>感谢您对实验平台进一步优化提出的宝贵意见！</h2>
            <h3 className={styles.subTitle}>请您描述实验中的具体问题，我们会及时向您反馈</h3>
            <div className={styles.form}>
              <label className={styles.label}>您的电话：</label>
              <Input className={styles.input} />
            </div>
            <div className={styles.form}>
              <label className={styles.label}>您的邮箱：</label>
              <Input className={styles.input} />
            </div>
            <div className={styles.form}>
              <label className={styles.textAreaLable}>详细描述：</label>
              <TextArea className={styles.textArea} rows={4} />
            </div>
            <Button className={styles.button} type="primary">
              提交
            </Button>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <label className={styles.label}>联系信息</label>
          </div>
          <div className={styles.contact}>
            <div className={styles.info}>
              <div className={styles.img}>
                <img src={answerImg} alt="icon" />
              </div>
              <div className={styles.subInfo}>
                <label className={styles.subInfo1}>实验答疑：郭晨睿</label>
                <label className={styles.subInfo2}>电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：18101930560</label>
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.img}>
                <img src={technologyImg} alt="icon" />
              </div>
              <div className={styles.subInfo}>
                <label className={styles.subInfo1}>技术支持：郭晨睿</label>
                <label className={styles.subInfo2}>电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：18101930560</label>
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.img}>
                <img src={falseImg} alt="icon" />
              </div>
              <div className={styles.subInfo}>
                <label className={styles.subInfo1}>实验答疑：郭晨睿</label>
                <label className={styles.subInfo2}>电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：18101930560</label>
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.img}>
                <img src={addressImg} alt="icon" />
              </div>
              <div className={styles.subInfo}>
                <label className={styles.subInfo2}>联系地址：湖北省武汉市武昌区武汉大学信息管理学院</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Discussion
