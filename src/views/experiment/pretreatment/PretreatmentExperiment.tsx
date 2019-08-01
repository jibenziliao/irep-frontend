import React, { useCallback } from 'react'
import { Button,Col,Row, Select,Radio,Input,Checkbox} from 'antd'
import { withRouter, RouteComponentProps } from 'react-router'
import { Dispatch } from 'redux'
import { useDispatch, useMappedState, State } from '../../../store/Store'
import { Actions } from '../../../store/Actions'
import styles from './PretreatmentExperiment.module.less'
import { stat } from 'fs';
import { number } from 'prop-types';
import { render } from 'react-dom';


//文章加减选择框
class Box extends React.Component{
    state={
        num:0
    }
    
     add(){
         this.setState({
            num:(this.state.num === 165)?165:(this.state.num+1)
         })
     }
 
     minus(){
         this.setState({
             num:(this.state.num === 0)?0:(this.state.num-1)
         }) 
     }
 
     change(event){
        var input=event.target.value.replace(/\D/g,'')
        if(input===''){
            input=0
        }
        if(input>165||input<0){
            alert("输入0-165的整数")
        }else{
            this.setState({
                num:parseInt(input)
            })
        }
     }
 
     render(){
         return(
             <div className={styles.articelNumberBox}>
                 <label className={styles.title}>示例文档：</label>
                 <input className={styles.numberChangeBox} type="button" value="-" onClick={this.minus.bind(this)}/>
                 <input className={styles.numberBox} type="text" min={0} max={165}  value={this.state.num} onChange={this.change.bind(this)}/>
                 <input className={styles.numberChangeBox} type="button" value="+" onClick={this.add.bind(this)}/>
             </div>
         )
     }
 
}

//获取原文
const originalArticle=''


//词云部分
class WordCloud extends React.Component{
    state={
        segement:'',
        isRemoveStopWord:true,
    }
   
    handleChoose(value) {
        this.setState({
            segement:value,
        })
    }

    handleChecked = (event) => {
        this.setState({ isRemoveStopWord: event.target.checked });
    };

    render(){
        return(
            <div className={styles.wordSection}>
            <div className={styles.wordCloudSectionTitle}>
                <text>词云分析</text>
            </div>
            <div className={styles.wordCloudBox}>{this.state.segement}</div>
            <div className={styles.wordCloudChoose}>
                <Select defaultValue="standard" style={{ width: 150 }} onChange={this.handleChoose.bind(this)}>
                    <option value="standard">标准分词器</option>
                    <option value="whitespace">空格分词器</option>
                    <option value="simple">简单分词器</option>
                    <option value="CJK">二分法分词器</option>
                    <option value="smartChinese">中文智能分词器</option>
                </Select>
                <Checkbox onChange={this.handleChecked}>去停用词</Checkbox>
                <Button className={styles.button}>分析</Button>
            </div>
        </div>
        )
    }

}

const PretreatmentExperimentComponent = (props: RouteComponentProps) =>{
    const dispatch: Dispatch<Actions> = useDispatch()
    const state: State = useMappedState(useCallback((globalState: State) => globalState, []))
    const { TextArea } = Input;
    const { Option } = Select;

    const handleClick = () => {
        props.history.replace('/experiment/boolean')
    }  

    const handleChoose=(value)=> {
        alert(`selected ${value}`);
    }

    const handleChecked = (event) => {
        alert(event.target.checked)
    };

    return(
        <div className={styles.Section}>
            <div className={styles.articleNavBar}>
                <div className={styles.title}>原文件</div>
                <Box/>
            </div>
            <div className={styles.originalArticleBox}>{originalArticle}</div>
            <div className={styles.wordCloudSection}>
               <WordCloud/>
               <WordCloud/>   
            </div>
            <div className={styles.concludeSection}>
                <div className={styles.title}>请结合词云分析结果简要概述各预处理器处理效果：</div>
                <TextArea rows={6} />
                <Button className={styles.button}>确定</Button>
            </div>
           
            <div className={styles.experimentSection}>
                <div className={styles.title}>请确认我的预处理器参数：</div>
                <div className={styles.experimentChoose}>
                    <Select defaultValue="standard" style={{ width: 180 }} onChange={handleChoose}>
                        <Option value="standard">标准分词器</Option>
                        <Option value="whitespace">空格分词器</Option>
                        <Option value="simple">简单分词器</Option>
                        <Option value="CJK">二分法分词器</Option>
                        <Option value="smartChinese">中文智能分词器</Option>
                    </Select>
                    <Checkbox onChange={handleChecked}>是否去停用词</Checkbox>
                    <Button className={styles.button}>分析</Button>
                </div>
                <div className={styles.title}>预处理结果：</div>
                <div className={styles.resultBox}></div>
            </div>
            <Button onClick={handleClick} className={styles.button}>下一步</Button>
        </div>
        
    )
}


const PretreatmentExperiment = withRouter(PretreatmentExperimentComponent)

export default PretreatmentExperiment

