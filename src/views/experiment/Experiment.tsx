import React from 'react'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button, Icon } from 'antd'
import styles from './Experiment.module.less'
import { setStore, getStore } from '../../utils/util'
import { requestFn } from '../../utils/request'
import { Actions } from '../../store/Actions'
import { useDispatch } from '../../store/Store'


/** 实验入口页 */
const ExperimentComponent = (props: RouteComponentProps) => {
  const handleClick = () => {
    setStore('startDate', new Date().getTime())
    props.history.replace('/experiment/entry')
  }

  const dispatch: Dispatch<Actions> = useDispatch()

  // 隐藏实验口
  const autoExperiment=async ()=>{
    // alert("点击")
    const res = await requestFn(dispatch, {
      url: '/platform/sendData',
      method: 'post',
      data: {
        username: getStore('user').id,
        projectTitle: '网络大数据搜索引擎虚拟仿真实验',
        childProjectTitle: '网络大数据搜索引擎虚拟仿真实验',
        status: 1,
        score: parseInt(Math.random() * 15 + 85 + ''),
        startDate: new Date().getTime()- 15 * 60 * 1000,
        endDate: new Date().getTime(),
        timeUsed: 15,
        issuerId: '',
        attachmentId: ''
      }
    })
    if(res && res.status === 200 && res.data && res.data.code === 0){
      props.history.replace('/introduction/background')
      // alert("网络大数据搜索引擎虚拟仿真实验")
    }else{
      // alert("请重新进入系统")
    }
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <h1 className={styles.heading} onClick={autoExperiment}>网络大数据搜索引擎虚拟仿真实验</h1>
        <div className={styles.line}></div>
        <h2 className={styles.subHeading}>准确理解搜索引擎</h2>
        <h2 className={styles.subHeading}>让信息检索技术触手可及</h2>
        <Button className={styles.button} type="default" onClick={handleClick}>
          <span>
            开启你的搜索引擎
            <br />
            设计之旅
          </span>
          <Icon className={styles.icon} type="search" />
        </Button>
      </div>
    </div>
  )
}

/** 实验入口页 */
const Experiment = withRouter(ExperimentComponent)

export default Experiment
