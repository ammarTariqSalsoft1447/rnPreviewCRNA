import React from 'react'
import {
    Text
} from 'react-native'
import styles from './styles'


export default TextBold = (props) => {
    return(
        <Text  
            ellipsizeMode='tail'
            allowFontScaling={false}
            {...props} 
            style={[styles.text,props.style]}
        >{props.children}</Text>
    )
}