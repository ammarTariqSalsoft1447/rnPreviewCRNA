import React from 'react'
import {

} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from './styles'
import vh from '../../Units/vh';
import vw from '../../Units/vw';


export default (props) => {
    return (
        <Ripple
            rippleColor='black'
            hitSlop={{ height: 4 * vh, width: 4 * vw }}
            {...props}
        >
            {props.children}</Ripple>
    )
}