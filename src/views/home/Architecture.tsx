import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styles from './Architecture.module.less'

const ArchitectureComponet = (props: RouteComponentProps) => {
  const switchRoute = (path: string) => {
    props.history.replace(path)
  }
  return (
    <div className={styles.Container}>
      <div className={styles.topContent}>
        <div className={styles.top}>
          <div className={styles.introductionText}>
            <p>
              信息检索（information
              retrieval，简称IR）是从大规模非结构化数据（通常是文本）的集合（通常保存在计算机上）中找出满足用户需求的资料（通常是文档）的过程
              。
            </p>
            <p>
              以下为您详细展示中文文档信息检索的全过程。采用了布尔模型、向量空间模型、语言模型。并对不同模型的检索性能进行定量评价。
            </p>
          </div>
          <div className={styles.introductionVideo}></div>
        </div>
      </div>
      <div className={styles.Content}>
        <div className={styles.leftDiv}>
          <div className={styles.visitors}>
            <img src={require('../../assets/introduction/visitor.png')} alt=""></img>
          </div>
          <div className={styles.courseIntro}>
            <div>
              <div className={styles.infoTitle}>
                <img src={require('../../assets/introduction/subject.png')} className={styles.icon} alt=""></img>
                <span>面向专业</span>
              </div>
              <div className={styles.infoText}>信息管理与信息系统</div>
            </div>
          </div>
          <div className={styles.courseIntro}>
            <div>
              <div className={styles.infoTitle}>
                <img src={require('../../assets/introduction/course.png')} className={styles.icon} alt=""></img>
                <span>所属课程</span>
              </div>
              <div className={styles.infoText}>信息检索实验</div>
            </div>
          </div>
          <div className={styles.courseIntro}>
            <div>
              <div className={styles.infoTitle}>
                <img src={require('../../assets/introduction/time.png')} className={styles.icon} alt=""></img>
                <span>实验课时 </span>
              </div>
              <div className={styles.infoText}>实验课时20</div>
            </div>
          </div>
          <div className={styles.chooseButton}>
            <button className={styles.commonButton} onClick={() => switchRoute('/introduction/background')}>
              实验背景
            </button>
            <button className={styles.commonButton} onClick={() => switchRoute('/introduction/team')}>
              支持团队
            </button>
            <button className={styles.activeButton} onClick={() => switchRoute('/introduction/architecture')}>
              系统架构
            </button>
          </div>
        </div>
        <div className={styles.rightDiv}>
          <div className={styles.mainContent}>
            <div className={styles.title}>
              <div className={styles.titleIcon}></div>系统架构与简要说明：
            </div>
            <div className={styles.texts}>
              <div>
                根据信息检索的流程和基本步骤，将实验分为信息检索模型架构、构建索引器、构建检索器、分析检索模型新能、仿真搜索引擎五个子实验。
              </div>
              <div>
                学生在操作网络大数据搜索引擎虚拟仿真实验系统的过程中，可以采用控制变量法和比较法等实验方法，以理解不同设计参数下搜索引擎的性能和优化方法。由于影响墩柱抗爆性能的因素众多，所以可以采用控制变量法让学生掌握影响搜索引擎性能的参数。在预先设定的搜索引擎系统架构的基础上，由学生用户交互式调整一些关键参数（如分词器模型类型，TF模型类型，平滑系数等），由此建立一系列参数化的搜素引擎模型。然后进行不同条件下的检索模型性能响应的虚拟仿真实验。该实验方法可以配合研讨式教学方法，让学生组成小组研讨某个参数单独变化时，对检索模型性能的影响，从而提高了教学效率。
              </div>
              <div>
                比较法可以让学生比较搜索引擎在不同参数情况下的性能响应，从而搜索引擎的设计。在索引器和检索器设计完毕后，由实验平台返回搜索引擎的各种数据指标，查准率、查全率、F１值、MAP、NDCG等，从而对不同参数的设计效果进行比较。
              </div>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Architecture = withRouter(ArchitectureComponet)

export default Architecture
