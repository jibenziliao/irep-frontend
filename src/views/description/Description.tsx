import React from 'react'
import styles from './Description.module.less'

const Description = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.topContainer}>
        <div className={styles.topTitle}>考核说明</div>
        <div className={styles.subTitle}>Inspection Instructions</div>
      </div>
      <div className={styles.Content}>
        <p>
          本虚拟仿真项目采用多指标考核的方式对学生的学习效果进行考核，具体分为知识点考核、操作考核、实验分析和模型性能考核四部分组成。各种考核方式总分值100分。
        </p>
        <p>
          （1）知识点考核——知识点考核是在学生掌握相关知识背景之后、在每项子实验之前进行的。该层次考核的目的是判断学生是否有足够的知识储备进行网络大数据搜索引擎设计虚拟仿真实验，从而保证虚拟仿真实验的效果。该层次考核以选择题和填空题形式进行，每个子实验4道选择题4道填空题。该部分总分值14分。
        </p>
        <p>
          （2）操作过程考核——操作过程考核考核学生是否在实验过程中准确无遗漏的完成了实验操作。目的是考核学生是否对实验有准确清晰的理解。该部分总分值49分。
        </p>
        <p>
          （3）实验分析——在每个重要实验阶段，学生需要对该阶段的实验效果做总结分析，以帮助学生更深刻理解前面的每个步骤。提升实验的效果。学生提交分析结果后，该部分成绩及评语由实验负责老师在管理系统中给出。该部分总分值12分。
        </p>
        <p>
          （4）模型性能考核——模型性能考核是在学生完成模型检索设计操作后进行的，以考察学生对搜索引擎的系统的理解程度。最后选择仿真模型，考察学生对检索模型性能指标的理解程度。该部分总分25分，具体评分标准如下：
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;（a）各检索模型NDCG@20>0.5，评分为5分；0.4≤NDCG,评分为4分；0.3≤NDCG,评分为3分；0.2≤NDCG,评分为2分；0.1≤NDCG,评分为1分。
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;（b）选择仿真模型，选择NDCG@20排名第一的模型，10分，选择NDCG@20排名第二的模型5分，选择NDCG@20排名第三的模型2分，选择布尔模型0分。
        </p>
      </div>
    </div>
  )
}

export default Description
