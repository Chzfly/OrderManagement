import React from 'react';
import Sales from "../../containers/Sales"; 
export default class PromotionManagement extends React.Component{
    constructor(){
        super()
 
    }
 
    render(){
        return(
            <Sales current="PromotionManagement">
                <h1>促销管理</h1>
            </Sales>
        )
    }
}