import React, { useState, useEffect } from 'react'
import { Form, Input, Checkbox, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import styles from './EntryExam.module.less'
import titleLeftImg from '../../../assets/experiment/exam/completion_title_left.png'
import titleRightImg from '../../../assets/experiment/exam/completion_title_right.png'
import { OriginCompletionQuestion, ChoiceQuestion, ProcessedCompletionQuestion, Option } from '../../../modal/Question'

const CheckboxGroup = Checkbox.Group

interface EntryExamFormProps extends FormComponentProps {
  completionQuestions: OriginCompletionQuestion[]
  choiceQuestions: ChoiceQuestion[]
}

/**
 * 知识自查
 */
const EntryExamForm = (props: EntryExamFormProps) => {
  const [completionQuestions, setCompletionQuestions] = useState<ProcessedCompletionQuestion[]>([])
  const { getFieldDecorator } = props.form

  useEffect(() => {
    /**
     * 将原始完成题目处理成页面可用的完成题目
     */
    const handleCompletionQuestions = (questions: OriginCompletionQuestion[]) => {
      const newCompletionQuestions = questions.map(i => {
        return {
          prefix: i.title.split(/([_]){3,}/g)[0],
          suffix: i.title.split(/([_]){3,}/g)[1],
          answer: i.answer,
          score: i.score
        }
      })
      setCompletionQuestions(newCompletionQuestions)
    }

    handleCompletionQuestions(props.completionQuestions)
  }, [props.completionQuestions])

  /**
   * 渲染完成题组件
   */
  const renderCompletionQuestion = () => {
    return completionQuestions.map((i, index) => {
      return (
        <div key={index} className={styles.Item}>
          <span className={styles.QuestionText}>{`${index + 1}.${i.prefix}`}</span>
          <Form.Item className={`GlobalExamItem ${styles.FormInput}`}>
            {getFieldDecorator(`completion_${index + 1}`, {})(<Input placeholder="" />)}
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
        <Checkbox key={index} value={i.value} className={styles.Checkbox}>
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
          <Form.Item className={styles.ChoiceQuestionFormItem}>
            {getFieldDecorator(`choice_${index + 1}`, {})(
              <CheckboxGroup className="GlobalExamCheckboxGroup">{renderCheckbox(i.options)}</CheckboxGroup>
            )}
          </Form.Item>
        </div>
      )
    })
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
      <Button type="primary" className={styles.ConfirmBtn}>
        确认答案
      </Button>
    </div>
  )
}

/**
 * 知识自查
 */
const EntryExam = Form.create<EntryExamFormProps>({ name: 'EntryExamForm' })(EntryExamForm)

export default EntryExam
