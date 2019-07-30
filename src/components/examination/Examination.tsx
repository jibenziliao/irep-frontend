import React, { useState, useEffect } from 'react'
import { Form, Input, Checkbox, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import styles from './Examination.module.less'
import titleLeftImg from '../../assets/experiment/exam/completion_title_left.png'
import titleRightImg from '../../assets/experiment/exam/completion_title_right.png'
import { OriginCompletionQuestion, ChoiceQuestion, ProcessedCompletionQuestion, Option } from '../../modal/Question'

const CheckboxGroup = Checkbox.Group

/**
 * 保存分数方法接口
 */
export interface ScoreObj {
  completionSore: number
  choiceScore: number
}

/**
 * 知识自查表单组件接口
 */
interface ExamFormProps extends FormComponentProps {
  completionQuestions: OriginCompletionQuestion[]
  choiceQuestions: ChoiceQuestion[]
  save: (param: ScoreObj) => void
  loading: boolean
  saveAnswer?: (param: any) => void
}

/**
 * 知识自查表单组件
 */
const ExamForm = (props: ExamFormProps) => {
  const [completionQuestions, setCompletionQuestions] = useState<ProcessedCompletionQuestion[]>([])
  const [validError, setValidError] = useState(false)
  const { getFieldDecorator, validateFields, getFieldsValue } = props.form

  useEffect(() => {
    /**
     * 将原始完成题目处理成页面可用的完成题目
     */
    const handleCompletionQuestions = (questions: OriginCompletionQuestion[]) => {
      const newCompletionQuestions = questions.map(i => {
        return {
          prefix: i.title.split(/[_]{3,}/g)[0],
          suffix: i.title.split(/[_]{3,}/g)[1],
          answer: i.answer,
          score: i.score
        }
      })
      setCompletionQuestions(newCompletionQuestions)
    }

    handleCompletionQuestions(props.completionQuestions)
  }, [props.completionQuestions])

  /**
   * 点击确认答案
   */
  const confirmAnswer = () => {
    validateFields((err: any) => {
      if (!err) {
        setValidError(false)
        const fieldValue = getFieldsValue()
        // const scoreObj = caclulateScore(fieldValue)
        // props.save(scoreObj)
        if (props.saveAnswer) {
          const newFiledValue = handleAnser(fieldValue)
          console.log(newFiledValue)
          props.saveAnswer(newFiledValue)
        }
      } else {
        setValidError(true)
      }
    })
  }

  const handleAnser = (answer: any) => {
    for (let i of Object.keys(answer)) {
      if (answer[i] instanceof Array) {
        answer[i] = answer[i].reduce((pre: string, cur: string) => pre + cur)
      }
    }
    return answer
  }

  /**
   * 计算完成题和选择题分数
   */
  const caclulateScore = (fieldValue: any) => {
    let completionSore = 0
    let choiceScore = 0
    for (let i = 0; i < completionQuestions.length; i++) {
      if (fieldValue[`completion${i + 1}`] === completionQuestions[i].answer) {
        completionSore += completionQuestions[i].score
      }
    }
    for (let i = 0; i < props.choiceQuestions.length; i++) {
      if (
        fieldValue[`choice${i + 1}`] &&
        fieldValue[`choice${i + 1}`].length === 1 &&
        fieldValue[`choice${i + 1}`][0] === props.choiceQuestions[i].answer
      ) {
        choiceScore += props.choiceQuestions[i].score
      }
    }
    return { completionSore, choiceScore }
  }

  /**
   * 清除提示信息
   */
  const clearErrorTips = () => {
    setValidError(false)
  }

  /**
   * 渲染完成题组件
   */
  const renderCompletionQuestion = () => {
    return completionQuestions.map((i, index) => {
      return (
        <div key={index} className={styles.Item}>
          <span className={styles.QuestionText}>{`${index + 1}.${i.prefix}`}</span>
          <Form.Item className={`GlobalExamItem ${styles.FormInput}`}>
            {getFieldDecorator(`completion${index + 1}`, {
              rules: [{ required: true, message: '请输入答案' }]
            })(<Input placeholder="" onChange={clearErrorTips} />)}
          </Form.Item>
          <span className={styles.QuestionText}>{`${i.suffix}`}</span>
        </div>
      )
    })
  }

  /**
   * 渲染选择题的选项框
   */
  const renderCheckbox = (options: Option[]) => {
    return options.map((i, index) => {
      return (
        <Checkbox key={index} value={i.key} className={styles.Checkbox}>
          {i.key}.&nbsp;&nbsp;{i.value}
        </Checkbox>
      )
    })
  }

  /**
   * 渲染选择题组件
   */
  const renderChoiceQuestion = () => {
    return props.choiceQuestions.map((i: ChoiceQuestion, index) => {
      return (
        <div key={index} className={styles.ChoiceQuestionItem}>
          <p className={styles.ChoiceQuestionTitle}>{`${index + 1}.${i.title}`}</p>
          <Form.Item className={`GlobalExamItem ${styles.ChoiceQuestionFormItem}`}>
            {getFieldDecorator(`choice${index + 1}`, {
              rules: [{ required: true, message: '请至少勾选一项' }]
            })(
              <CheckboxGroup className="GlobalExamCheckboxGroup" onChange={clearErrorTips}>
                {renderCheckbox(i.options)}
              </CheckboxGroup>
            )}
          </Form.Item>
        </div>
      )
    })
  }

  const renderTips = () => {
    return <p className={styles.Tips}>{validError ? '请完成所有的题目' : ''}</p>
  }

  return (
    <div>
      <div className={styles.PageTitle}>
        <img src={titleLeftImg} alt="icon" />
        <span>阅读知识卡片，完成以下问题</span>
        <img src={titleRightImg} alt="icon" />
      </div>
      <p className={styles.QuestionTitle}>填空题（在横线处填写答案）</p>
      <div className={styles.QuestionsWrapper}>{renderCompletionQuestion()}</div>
      <p className={styles.QuestionTitle}>选择题（既有单选也有多选）</p>
      <div className={styles.QuestionsWrapper}>{renderChoiceQuestion()}</div>
      {renderTips()}
      <Button type="primary" className={styles.ConfirmBtn} onClick={confirmAnswer} loading={props.loading}>
        确认答案
      </Button>
    </div>
  )
}

/**
 * 知识自查
 *
 * 所有的实验项目通用
 */
const Examination = Form.create<ExamFormProps>({ name: 'ExamForm' })(ExamForm)

export default Examination
