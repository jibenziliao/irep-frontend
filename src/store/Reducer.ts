import { Actions } from './Actions'
import { State, INITIAL_STATE } from './Store'

/**
 * 导出默认reducer
 */
export default function reducer(state: State = INITIAL_STATE, action: Actions) {
  switch (action.type) {
    case 'fetch_begin': {
      return {
        ...state,
        pageLoading: action.payload.pageLoading
      }
    }

    case 'fetch_success': {
      return {
        ...state,
        pageLoading: action.payload.pageLoading
      }
    }

    case 'fetch_failed': {
      return {
        ...state,
        pageLoading: action.payload.pageLoading
      }
    }

    case 'handle_entry_card': {
      const newEntryExperimentCards = state.entryExperimentCards.map((i, index) => {
        return {
          ...i,
          current:
            action.payload.name === i.name && action.payload.type === 'selected' && action.payload.index === index
              ? true
              : action.payload.type !== 'selected'
              ? i.current
              : false,
          disabled:
            i.current && action.payload.type === 'add'
              ? true
              : action.payload.type === 'remove' && action.payload.index === i.index
              ? false
              : i.disabled,
          index:
            action.payload.type === 'add' && i.current
              ? action.payload.index
              : action.payload.type === 'remove' && action.payload.index === i.index
              ? -1
              : i.index
        }
      })
      const newSteps = state.steps.map((i, index) => {
        const currentIndex = newEntryExperimentCards.findIndex(j => j.current)
        if (action.payload.type === 'add') {
          return {
            name:
              currentIndex > -1 && index === action.payload.index ? newEntryExperimentCards[currentIndex].name : i.name
          }
        } else if (action.payload.type === 'remove') {
          return {
            name: index === action.payload.index ? '' : i.name
          }
        } else {
          return i
        }
      })
      const finalEntryExperimentCards = newEntryExperimentCards.map(i => {
        return {
          ...i,
          current: action.payload.type === 'add' ? false : i.current
        }
      })
      return {
        ...state,
        entryExperimentCards: finalEntryExperimentCards,
        steps: newSteps
      }
    }

    case 'handle_inverted_card': {
      const newInvertedIndexExperimentCards = state.invertedIndexCards.map((i, index) => {
        return {
          ...i,
          current:
            action.payload.name === i.name && action.payload.type === 'selected' && action.payload.index === index
              ? true
              : action.payload.type !== 'selected'
              ? i.current
              : false,
          disabled:
            i.current && action.payload.type === 'add'
              ? true
              : action.payload.type === 'remove' && action.payload.index === i.index
              ? false
              : i.disabled,
          index:
            action.payload.type === 'add' && i.current
              ? action.payload.index
              : action.payload.type === 'remove' && action.payload.index === i.index
              ? -1
              : i.index
        }
      })
      const newSteps = state.invertedSteps.map((i, index) => {
        const currentIndex = newInvertedIndexExperimentCards.findIndex(i => i.current)
        if (action.payload.type === 'add') {
          return {
            name:
              currentIndex > -1 && index === action.payload.index
                ? newInvertedIndexExperimentCards[currentIndex].name
                : i.name
          }
        } else if (action.payload.type === 'remove') {
          return {
            name: index === action.payload.index ? '' : i.name
          }
        } else {
          return i
        }
      })

      const finalInvertedIndexExperimentCards = newInvertedIndexExperimentCards.map(i => {
        return {
          ...i,
          current: action.payload.type === 'add' ? false : i.current
        }
      })

      return {
        ...state,
        invertedIndexCards: finalInvertedIndexExperimentCards,
        invertedSteps: newSteps
      }
    }

    default:
      return state
  }
}
