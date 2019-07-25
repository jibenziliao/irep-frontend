import { Store, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { create } from 'redux-react-hook'
import { Actions } from './Actions'
import reducer from './Reducer'

/**
 * 实验流程卡片数组接口
 */
export interface ExperimentCard {
  name: string
  current: boolean
  disabled: boolean
  index: number
}

/**
 * 全局state接口
 */
export interface State {
  pageLoading: boolean
  entryExperimentCards: ExperimentCard[]
  steps: { name: string }[]
}

/**
 * 创建全局store
 */
export const makeStore = (): Store<State, Actions> => {
  return createStore(reducer, INITIAL_STATE, composeWithDevTools())
}

const entryExperimentCards: ExperimentCard[] = [
  {
    name: '构建我的索引器',
    current: false,
    disabled: false,
    index: -1
  },
  {
    name: '构建布尔模型',
    current: false,
    disabled: false,
    index: -1
  },
  {
    name: '构建向量空间模型',
    current: false,
    disabled: false,
    index: -1
  },
  {
    name: '构建预处理器',
    current: false,
    disabled: false,
    index: -1
  },
  {
    name: '构建倒排索引表',
    current: false,
    disabled: false,
    index: -1
  },
  {
    name: '构建我的检索器',
    current: false,
    disabled: false,
    index: -1
  },
  {
    name: '构建概率检索模型',
    current: false,
    disabled: false,
    index: -1
  },
  {
    name: '构建语言模型',
    current: false,
    disabled: false,
    index: -1
  },
  {
    name: '分析检索模型性能',
    current: false,
    disabled: false,
    index: -1
  },
  {
    name: '仿真我的搜索引擎',
    current: false,
    disabled: false,
    index: -1
  }
]

const steps = [
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  },
  {
    name: ''
  }
]

/**
 * 全局初始状态
 */
export const INITIAL_STATE: State = {
  pageLoading: false,
  entryExperimentCards,
  steps
}

export const { StoreContext, useDispatch, useMappedState } = create<State, Actions, Store<State, Actions>>()
