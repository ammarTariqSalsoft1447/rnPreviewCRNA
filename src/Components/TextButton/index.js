import React from 'react'
import {
    Text,
    View
} from 'react-native'
import TextRegular from '../TextRegular'
import styles from './styles'
import Ripple from 'react-native-material-ripple'


const TextButton = (props) => {
    return (
        <Ripple style={[ props.btnContainer]} onPress={props.onPress}>
            <TextRegular style={[styles.label, props.labelStyle]}>{props.text}</TextRegular>
        </Ripple>
    )
}
export default TextButton;