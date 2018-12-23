import React from 'react';
import Sales from "../../containers/Sales"; 
export default class OrderManagement extends React.Component{
    constructor(){
        super()
 
    }
 
    render(){
        return(
            <Sales current="OrderManagement">
                <h1>订单管理</h1>
            </Sales>
        )
    }
}