import React from 'react'
import {
    Text
} from 'react-native'
import styles from './styles'


const CircularBook = (props) => {
    return(
        <Text  
            ellipsizeMode='tail'
            allowFontScaling={false}
            {...props} 
            style={[styles.text,props.style]}
        >{props.children}</Text>
    )
}
export default CircularBook