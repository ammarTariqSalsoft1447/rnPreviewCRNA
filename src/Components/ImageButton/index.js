import React from 'react'
import {
    Text,
    View,
    Image
} from 'react-native'
import TextSemi from '../TextSemi'
import styles from './styles'
import TouchableHOC from '../../Components/TouchableHOC'
import { icons } from '../../assets/images'


export default  (props) => {
    return (
        <TouchableHOC style={[styles.container, props.btnContainer]} onPress={props.onPress}>
            <TextSemi style={[styles.label, props.labelStyle]}>{props.title}</TextSemi>
            <Image source={icons.backArrow} style={[styles.image, props.imageStyle]} resizeMode="contain" />
        </TouchableHOC>
    )
}