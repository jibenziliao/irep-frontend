import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styles from './Background.module.less'

const BackgroundComponet = (props: RouteComponentProps) => {
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
            <button className={styles.activeButton} onClick={() => switchRoute('/introduction/background')}>
              实验背景
            </button>
            <button className={styles.commonButton} onClick={() => switchRoute('/introduction/team')}>
              支持团队
            </button>
            <button className={styles.commonButton} onClick={() => switchRoute('/introduction/architecture')}>
              系统架构
            </button>
          </div>
        </div>
        <div className={styles.rightDiv}>
          <div className={styles.mainContent}>
            <div className={styles.title}>
              <div className={styles.titleIcon}></div>实验目的
            </div>
            <div className={styles.texts}>
              <div>
                网络搜索引擎（谷歌、百度、中国知网、Web of
                Science、微信搜一搜等）是获取各类互联网大数据的门户，是各类互联网应用的基石。掌握网络搜索引擎构架、了解信息检索技术、掌握构建信息检索系统的方法是信息管理与信息系统专业学生的所必须的基本素养。
              </div>
              <div>
                然而一个实用网络搜索引擎依托于多种技术，如网络爬虫技术、检索排序技术、网页处理技术、大数据处理技术、自然语言处理技术等，以为信息检索用户提供快速、高相关性的信息服务。通过多年的教学实践，让一个或一组学生在有限的课时内搭建一个完整搜索引擎系统有许多瓶颈：
              </div>
              <p></p>
              <div>
                1.互联网信息纷繁复杂，学生使用网络搜索引擎所用到的网络爬虫技术，稍有不当容易造成侵犯他人知识产权，侵犯企业或国家信息安全的问题。有一定的法律风险。
              </div>
              <div>
                2.搭建搜索引擎所涉及技术与算法繁多复杂，在实际生产中往往需要多位有多年算法和架构经验的工程师才能实现。信息管理与信息系统专业学生所掌握计算机软件与编程方面的知识对于完成该任务依然相去甚远。
              </div>
              <div>
                3.评价搜索引擎性能是搭建网络搜索引擎的重要任务之一。实现该任务需要花费一定的人力物力构建一定量的标准数据集。同时也许搭建专业的性能评价软件。用于测试检索系统性能的数据集往往是各大公司的商业机密。因此以往的教学实践中，该部分的内容仅限于理论课教学，学生缺乏实践机会。
              </div>
              <div>
                4.索引是支持搜索引擎系统的核心。每个搜索引擎都有数量庞大的索引。由于学生学习过程中每位学生搭建的搜索引擎的技术不同，因此会产生数量众多的索引。为支持索引的存储和大数据的检索，需要专业的服务器做存储和算力上的支持。
              </div>
              <div>
                网络大数据搜索引擎设计虚拟仿真实验系统，将网络搜索引擎所涉及到的与信息检索无关的关键技术进行封装。学生可以将精力集中理解信息检索系统的实现。将所使用到的核心技术与算法进行模块化拆解，帮助学生理清学习思路。在该平台上，学生可以自主搭建四种主流的搜索引擎模型，通过调整参数，设计自己的网络搜索引擎的模型。借助平台的标准大数据支持，进行参数调优，对自主设计的搜索引擎进行性能评价。通过仿真，体验自主设计的搜索引擎检索效果，提升学生的学习兴趣，达到让学生知其然并知其所以然的目的。
                综上，该平台有效的解决了信息检索实验课程的难点，为学生今后从事有关检索方面的研究打下了良好的基础。
              </div>
              <p></p>
            </div>
          </div>
          <div className={styles.mainContent}>
            <div className={styles.title}>
              <div className={styles.titleIcon}></div>实验原理
            </div>
            <div className={styles.texts}>
              <div>
                通过对主流搜索引擎的分析与调研，建立检索系统架构模型，包括索引器，检索器，评价器，仿真单元；索引器部分，基于Lucene
                结合IK，jieba，hanlp等主流中文分词工具建立预处理器模块；基于倒排索引方法，通过统计学方法建立索引模块。检索器部分，通过统计学方法建立布尔模型模块；基于TF-IDF算法建立向量空间模型模块；基于BM25算法建立概率检索模型模块；基于概率估计方法建立语言模型模块。评价器部分，全面综合了有关评价指标，包括传统的正确率、召回率、F1值，MAP（平均正确率均值）以及一种常用于机器学习排序算法的评价指标NDCG（归一化折损累计增益），同时对检索模型返回的前5项，前10项和前20项的指标进行了重点关注。仿真单元部分，在后端对学生建立的模型进行集成封装以提供检索服务，利用前端技术对标主流搜素引擎建立检索接口，对检索系统进行真实还原。
              </div>
              <div>
                通过将网络大数据搜索引擎设计过程进行模块化处理，建立网络大数据搜索引擎设计过程模型，从信息流的视角出发，面向实践与教学，引导学生理解并掌握信息检索的相关理论方法和实现技术，提高学生的实践实验能力和创新精神，为进一步开展科学研究和从事相关社会实践工作打下坚实的基础。
              </div>
              <p></p>
            </div>
          </div>
          <div className={styles.mainContent}>
            <div className={styles.title}>
              <div className={styles.titleIcon}></div>实验教学方法
            </div>
            <div className={styles.texts}>
              <div>
                本实验教学项目依托武汉大学图书情报国家级实验教学示范中心，利用自然语言处理、大数据分析与可视化、虚拟仿真等技术，大力推进实验教学改革，采用沉浸式、自主式、交互式、研讨式和反思式实验教学方法，致力于培养学生的分析解决问题的能力、主动学习能力和创新能力，提高学生的问题意识和信息素养。
              </div>
              <div>（1） 采用沉浸式教学方法感知实验环境</div>
              <div>
                沉浸式教学方法主要通过搜索引擎仿真单元实现。在系统搭建步骤结束后，学生可以通过仿真单元真实的操作自己搜索引擎，学生如同操作真实的操作百度等搜索引擎，沉浸在真实的情境中，直观形象、立体生动地体验、感知与领略自己搭建的搜索引擎有助于给学生成就感与获得感，提升学生的学习兴趣。通过配音解说，加强学生对实验的了解，从而使学生能够充分了解实验环境。
              </div>
              <div>（2） 采用自主式教学方法学习信息检索相关知识</div>
              <div>
                自主式学习教学法主要通过各个子实验的“知识自查”模块实现。通过“温故知新”模块，学生可以复习和掌握基本的信息检索知识，了解信息检索系统的架构，掌握常用的信息检索模型与算法，为进行搜索引擎设计与优化打好坚实的基础。同时，在本模块提供相关的学习和参考资料，如书籍、论文和教学ppt等，为学生自主学习提供帮助。相对于专业知识本身,该教学方法更加注重让学生探索知识的来源。本虚拟仿真试验项目将预处理结果、检索模型性能等结果通过词云分析、雷达图分析等大数据可视化的方式展现出来，让学生研究直观的分析停用词对检索模型性能的影响以及各个检索模型的优势和劣势。
              </div>
              <div>（3）采用交互式教学方法完成搜索引擎设计实验</div>
              <div>
                在给定的检索模型架构下，通过改变不同预处理参数（如分词器类型、是否去停用词、TF模型类型、BM25模型A参数、BM25模型K参数、平滑系数等）来模拟检索模型在不同参数下的性能响应（如查准率分析、查全率分析、F1值分析、MAP分析、NDCG分析），分析检索模型在不同参数情况下的性能。通过实验，学生将会了解搜索引擎性能的影响因素，并结合不同索引器和检索器（各种参数设置），虚拟再现对应不同索引器和检索器下搜索引擎性能变化，定量评价方案的实施效果。在交互式教学中进行的虚拟仿真实验，均采用权威专业的评价数据集。能够训练学生深刻了解各种影响因素综合作用下信息检索系统的性能，有效帮助学生提升专业综合思考能力。
              </div>
              <div>（4）采用研讨式教学方法加深学生如何对信息检索系统优化的认识</div>
              <div>
                在网络大数据搜索引擎设计仿真实验中，影响搜索引擎性能的因素有很多，因此不同的设计方法与搜索引擎性能密切相关。该部分的实验主要通过生生和师生互动的模式，让学生掌握搜索引擎的设计方法。在研究型教学和互动教学的基础上，将学生分为若干个小组，每一个小组通过对搜索引擎的设计，研究某一种参数对搜索引擎性能的影响，提出该参数的最优设计方案。例如，针对TF模型对检索模型性能的影响，小组内成员可以在保持其他参数不变的情况下选择亚线性尺度变换TF模型或基于最大值的
                tf
                归一化模型，对比不同TF模型对搜索引擎性能的影响。在此基础上各一个小组对自己的方案进行汇总讨论，最终得到最优化的搜索引擎模型。该教学方法涉及多层次方案的集成仿真，引导学生自主、开放性提出搜索引擎优化设计的总体要求、特色要求，并通过团队合作的方式对上述各种相关参数的改变，提升虚拟仿真搜索引擎性能，进而不断优化设计方案。
              </div>
              <div>（5）采用反思式教学方法对实验效果进行总结</div>
              <div>
                反思式教学方法是通过实验报告模块和实验问答题模块组成。学生的模拟操作和练习均被自动记录，学生既能被及时纠错，又能在自主练习后通过实验报告反思自己的全部操作；又可以通过出题模式个性化、差异化地考核每一个学生。学生在练习的每一个环节里犹如“教师”随时陪伴左右。此外，在实验过程中添加了“知识自查”（预习考核）等互动环节，便于学生及时了解与掌握学习的进程，保证学生能够真正掌握相关知识，提高学习的效果。
              </div>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Background = withRouter(BackgroundComponet)

export default Background
