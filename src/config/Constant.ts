import { Choice, ChoiceQuestion, OriginCompletionQuestion } from '../modal/Question'
/**
 * api请求地址
 */
export const API_URL: string = process.env.NODE_ENV === 'development' ? '' : ''

/**
 * 默认请求超时时间
 */
export const REQUEST_TIME_OUT = 10000

/**
 * mock请求延时
 */
export const RESPONSE_DELAY = 1000

/**
 * 入口实验--原始填空题数据(需要处理下划线)
 */
export const entryCompletionQuestions: OriginCompletionQuestion[] = [
  {
    title:
      '信息检索是从大规模_________________的集合（通常保存在计算机上）中找出满足用户需求的资料（通常是文档）的过程。',
    score: 25,
    answer: '非结构化数据'
  },
  {
    title: '信息检索实验包含_________、建立倒排索引表、构建检索模型、评价检索模型四个步骤。',
    score: 25,
    answer: '文档预处理'
  },
  {
    title:
      '本实验要求通过完成文档预处理、构建倒排索引、构建检索模型三个子实验设计一个__________，并对自己搭建的搜索引擎性能的进行评价。',
    score: 25,
    answer: '搜索引擎'
  },
  {
    title: '检索模型包含空间向量模型、概率模型、__________、语言模型。',
    score: 25,
    answer: '布尔模型'
  }
]

/**
 * 入口实验--原始选择题数据(不需要处理)
 */
export const entryChoiceQuestions: ChoiceQuestion[] = [
  {
    title: '以下哪个选项是信息检索的英文简称？',
    answer: Choice.C,
    score: 25,
    options: [
      {
        key: Choice.A,
        value: 'IS'
      },
      {
        key: Choice.B,
        value: 'IT'
      },
      {
        key: Choice.C,
        value: 'IR'
      },
      {
        key: Choice.D,
        value: 'IE'
      }
    ]
  },
  {
    title: '以下哪个选项不属于文档预处理的步骤？',
    answer: Choice.B,
    score: 25,
    options: [
      {
        key: Choice.A,
        value: '中文分词'
      },
      {
        key: Choice.B,
        value: '建立倒排索引表'
      },
      {
        key: Choice.C,
        value: '去停用词'
      },
      {
        key: Choice.D,
        value: '词干化'
      }
    ]
  },
  {
    title: '“从大规模非结构化数据的集合中找出满足用户需求的资料”这一过程称为？',
    answer: Choice.A,
    score: 25,
    options: [
      {
        key: Choice.A,
        value: '信息检索'
      },
      {
        key: Choice.B,
        value: '信息查询'
      },
      {
        key: Choice.C,
        value: '数据检索'
      },
      {
        key: Choice.D,
        value: '数据查询'
      }
    ]
  },
  {
    title: '以下哪个选项不属于信息检索实验的子实验？',
    answer: Choice.D,
    score: 25,
    options: [
      {
        key: Choice.A,
        value: '文档预处理'
      },
      {
        key: Choice.B,
        value: '构建倒排索引'
      },
      {
        key: Choice.C,
        value: '构建检索模型'
      },
      {
        key: Choice.D,
        value: '改进检索模型'
      }
    ]
  }
]

/**
 * 入口实验--温故知新知识点富文本
 */
export const entryKnowledges = [
  {
    title: '术语',
    items: [
      {
        content: `<p><em>1.词项(term)</em>是索引的单位，通常可以用词来表示。</p>
        <p><em>2.文档(document)</em>信息系统检索的对象</p>
        <p><em>3.语言学预处理目的:</em></p>监理此条的等价类`,
        expressionId: '' // 公式id 前端根据不同的id渲染不同的公式，可在前端写死
      },
      {
        content: '<em>语言学预处理目的:</em>建立此条的等价类...',
        expressionId: '1' // 公式id 前端根据不同的id渲染不同的公式，可在前端写死
      }
    ]
  }
]
