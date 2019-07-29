import React, { useCallback } from 'react'
import { Button, Icon, Row, Col } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router'
import { Dispatch } from 'redux'
import { useDispatch, useMappedState, State } from '../../../store/Store'
import { Actions } from '../../../store/Actions'
import styles from './InvertedIndexExperiment.module.less'

const InvertedIndexExperimentComponent = (props: RouteComponentProps) => {
  const dispatch: Dispatch<Actions> = useDispatch()
  const state: State = useMappedState(useCallback((globalState: State) => globalState, []))

  const handleClick = () => {
    props.history.replace('/experiment/boolean')
  }

  const removeCard = (name: string, index: number) => {
    dispatch({
      type: 'handle_inverted_card',
      payload: {
        name,
        type: 'remove',
        index
      }
    })
  }

  const addCard = (index: number) => {
    const currentIndex = state.invertedIndexCards.findIndex(i => i.current)
    if (currentIndex === -1) {
      return false
    }
    dispatch({
      type: 'handle_inverted_card',
      payload: {
        name: '',
        type: 'add',
        index
      }
    })
  }

  const selectCard = (name: string, index: number, disabled: boolean) => {
    if (disabled) {
      return false
    }
    dispatch({
      type: 'handle_inverted_card',
      payload: {
        name,
        type: 'selected',
        index
      }
    })
  }

  const renderCards = () => {
    return state.invertedIndexCards.map((i, index) => {
      return (
        <div
          key={index}
          className={`${styles.Card} ${i.disabled ? styles.CardDisabled : i.current ? styles.CurrentCard : ''}`}
          onClick={() => selectCard(i.name, index, i.disabled)}
        >
          {i.name}
        </div>
      )
    })
  }

  const renderCard = (name: string, index: number) => {
    if (name) {
      return (
        <span className={`${styles.Name}`} onClick={() => removeCard(name, index)}>
          {`${index + 1}.${name}`}
        </span>
      )
    } else {
      return (
        <span className={styles.Index} onClick={() => addCard(index)}>
          {index + 1}
        </span>
      )
    }
  }

  const renderCurrentCard = () => {
    const currentCards = state.invertedIndexCards.filter(i => i.current)
    if (currentCards.length > 0) {
      return (
        <div className={styles.CurrentCardTips}>
          <span>当前选中卡片: </span>
          <span className={styles.CurrentCardName}>{currentCards[0].name}</span>
        </div>
      )
    }
  }

  const renderInvertedIndexForm = () => {
    return (
      <div className={styles.InvertedIndexForm}>
        <p className={styles.FormTips}>以如下几篇文档为例，完成下方词典表格和schizophrenia的倒排记录</p>
        <ul className={styles.List}>
          <li>文档0 breakthough drug for schizophrenia</li>
          <li>文档1 new schizophrenia drug</li>
          <li>文档2 new hopes for schizophrenia patients</li>
        </ul>
        <Row className={styles.TitleRow}>
          <Col span={4} className={styles.FormTitle}>
            词项
          </Col>
          <Col span={4} className={styles.FormTitle}>
            文档频率
          </Col>
          <Col span={4} className={styles.FormTitle}>
            全体倒排记录表
          </Col>
          <Col span={4} className={styles.FormTitle}>
            文档ID
          </Col>
          <Col span={4} className={styles.FormTitle}>
            词频频率
          </Col>
          <Col span={4} className={styles.FormTitle}>
            位置索引
          </Col>
        </Row>
        <Row>
          <Col span={4} className={styles.FormItem}>
            breakthough
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
          <Col span={4} className={styles.FormItem}>
            0
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
        </Row>
        <Row>
          <Col span={4} className={styles.FormItem}>
            drug
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
          <Col span={4} className={styles.FormItem}>
            1
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
        </Row>
        <Row>
          <Col span={4} className={styles.FormItem}>
            for
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
          <Col span={4} className={styles.FormItem}>
            2
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
        </Row>
        <Row>
          <Col span={4} className={styles.FormItem}>
            schizophrenia
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
          <Col span={12} className={styles.TableName}>
            b.倒排记录表
          </Col>
        </Row>
        <Row>
          <Col span={4} className={styles.FormItem}>
            new
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
        </Row>
        <Row>
          <Col span={4} className={styles.FormItem}>
            hopes
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
        </Row>
        <Row>
          <Col span={4} className={styles.FormItem}>
            patients
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
          <Col span={4} className={styles.FormItem}>
            <input />
          </Col>
        </Row>
        <Row>
          <Col span={12} className={`${styles.TableName} ${styles.FirstTableName}`}>
            a.词典
          </Col>
        </Row>
        <div className={styles.ConfirmBtn}>
          <Button type="primary">确认</Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.Section}>
        <div className={styles.SectionTitle}>请正确构建倒排索引表架构:</div>
        <div className={styles.TopBoxWrapper}>
          <div className={styles.TopBox}>
            <div className={styles.BoxLeft}>
              <div className={`${styles.BoxLeftTop} ${styles.BoxItem}`}>
                {renderCard(state.invertedSteps[0].name, 0)}
              </div>
              <div className={styles.BoxLeftBottom}>
                <div className={styles.BoxItem}>{renderCard(state.invertedSteps[3].name, 3)}</div>
                <div className={styles.BoxItem}>{renderCard(state.invertedSteps[4].name, 4)}</div>
              </div>
            </div>
            <div className={`${styles.BoxMiddle} ${styles.BoxItem}`}>{renderCard(state.invertedSteps[1].name, 1)}</div>
            <div className={styles.BoxRight}>
              <div className={`${styles.BoxRightTop} ${styles.BoxItem}`}>
                {renderCard(state.invertedSteps[2].name, 2)}
              </div>
              <div className={styles.BoxRightBottom}>
                <div className={styles.BoxItem}>{renderCard(state.invertedSteps[5].name, 5)}</div>
                <div className={styles.BoxItem}>{renderCard(state.invertedSteps[6].name, 6)}</div>
                <div className={styles.BoxItem}>{renderCard(state.invertedSteps[7].name, 7)}</div>
              </div>
            </div>
          </div>
        </div>
        <p className={styles.BoxTips}>
          <span>点击下方卡片选中，再点击上面的方框，填入正确的架构。</span>
          {renderCurrentCard()}
        </p>
        <div className={styles.BoxWrapper}>{renderCards()}</div>
      </div>
      <div className={styles.Section}>
        <div className={styles.SectionTitle}>构建倒排索引表Demo:</div>
        {renderInvertedIndexForm()}
      </div>
      <div className={styles.Section}>
        <div className={styles.RunBtn}>构建我的倒排索引表</div>
        <table className={styles.Table}>
          <thead>
            <tr>
              <th colSpan={2} className={styles.ThColorBlue}>
                词典
              </th>
              <th rowSpan={2} colSpan={3} className={styles.ThColorBlue}>
                全体倒排记录
              </th>
              <th colSpan={3} className={styles.ThColorGreen}>
                全体倒排记录表
              </th>
            </tr>
            <tr>
              <th className={styles.ThColorBlue}>词项</th>
              <th className={styles.ThColorBlue}>文档频率</th>
              <th className={styles.ThColorGreen}>文档ID</th>
              <th className={styles.ThColorGreen}>词项频率</th>
              <th className={styles.ThColorGreen}>位置索引</th>
            </tr>
          </thead>
        </table>
      </div>
      <Button onClick={handleClick}>下一步</Button>
    </div>
  )
}

/**
 * 倒排索引--构建模型页
 */
const InvertedIndexExperiment = withRouter(InvertedIndexExperimentComponent)

export default InvertedIndexExperiment
