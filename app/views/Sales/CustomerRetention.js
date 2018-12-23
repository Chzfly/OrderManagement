import React from 'react';
import Sales from "../../containers/Sales"; 
export default class CustomerRetention extends React.Component{
    constructor(){
        super()
 
    }
 
    render(){
        return(
            <Sales current="CustomerRetention">
                <h1>客户挽留</h1>
            </Sales>
        )
    }
}