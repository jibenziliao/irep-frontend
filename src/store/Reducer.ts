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

    case 'update_loadindex': {
      return {
        ...state,
        loadindexLoading: action.payload.loadindexLoading,
        ...(action.payload.loadindexSuccess !== undefined ? { loadindexSuccess: action.payload.loadindexSuccess } : {})
      }
    }

    case 'handle_vectorSpace_card': {
      const newvectorSpaceCards = state.vectorSpaceCards.map((i, index) => {
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
      const newSteps = state.vectorSteps.map((i, index) => {
        const currentIndex = newvectorSpaceCards.findIndex(i => i.current)
        if (action.payload.type === 'add') {
          return {
            name: currentIndex > -1 && index === action.payload.index ? newvectorSpaceCards[currentIndex].name : i.name
          }
        } else if (action.payload.type === 'remove') {
          return {
            name: index === action.payload.index ? '' : i.name
          }
        } else {
          return i
        }
      })

      const finalVectorSpaceCards = newvectorSpaceCards.map(i => {
        return {
          ...i,
          current: action.payload.type === 'add' ? false : i.current
        }
      })

      return {
        ...state,
        vectorSpaceCards: finalVectorSpaceCards,
        vectorSteps: newSteps
      }
    }

    case 'handle_languageExperiment_card': {
      const newlanguageExperimentCards = state.languageExperimentCards.map((i, index) => {
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
      const newSteps = state.languageExperimentSteps.map((i, index) => {
        const currentIndex = newlanguageExperimentCards.findIndex(i => i.current)
        if (action.payload.type === 'add') {
          return {
            name: currentIndex > -1 && index === action.payload.index ? newlanguageExperimentCards[currentIndex].name : i.name
          }
        } else if (action.payload.type === 'remove') {
          return {
            name: index === action.payload.index ? '' : i.name
          }
        } else {
          return i
        }
      })

      const finallanguageExperimentCards = newlanguageExperimentCards.map(i => {
        return {
          ...i,
          current: action.payload.type === 'add' ? false : i.current
        }
      })

      return {
        ...state,
        languageExperimentCards: finallanguageExperimentCards,
        languageExperimentSteps: newSteps
      }
    }

    case 'handle_booleanExperiment_card': {
      const newboolExperimentCards = state.booleanExperimentCards.map((i, index) => {
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
      const newSteps = state.booleanExperimentSteps.map((i, index) => {
        const currentIndex = newboolExperimentCards.findIndex(i => i.current)
        if (action.payload.type === 'add') {
          return {
            name:
              currentIndex > -1 && index === action.payload.index ? newboolExperimentCards[currentIndex].name : i.name
          }
        } else if (action.payload.type === 'remove') {
          return {
            name: index === action.payload.index ? '' : i.name
          }
        } else {
          return i
        }
      })

      const finalBooleanCards = newboolExperimentCards.map(i => {
        return {
          ...i,
          current: action.payload.type === 'add' ? false : i.current
        }
      })

      return {
        ...state,
        booleanExperimentCards: finalBooleanCards,
        booleanExperimentSteps: newSteps,
        saveOrderBtn: {
          ...state.saveOrderBtn,
          bool: {
            ...state.saveOrderBtn.bool,
            completed: finalBooleanCards.every(i => i.disabled)
          }
        }
      }
    }

    case 'update_saveOrderBtnStatus':
      return {
        ...state,
        saveOrderBtn: {
          ...state.saveOrderBtn,
          [`${action.payload.field}`]: {
            ...state.saveOrderBtn[`${action.payload.field}`],
            saved: true
          }
        }
      }

    default:
      return state
  }
}
