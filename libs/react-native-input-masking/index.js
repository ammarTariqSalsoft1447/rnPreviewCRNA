import React from "react";

const { TextInput } = require("react-native");

export default class extends React.Component{
    render(){
        return(
            <TextInput {...this.props}/>
        )
    }
}