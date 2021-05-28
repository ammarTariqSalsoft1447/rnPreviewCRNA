import React from 'react'
import {
    Text,
    View,
    Image
} from 'react-native'
import styles from './styles'
import TouchableHOC from '../TouchableHOC'
import { icons } from '../../assets/images'


export default (props) => {
    return(
        <TouchableHOC style={[styles.container,props.btnContainer]} onPress={props.onPress}>
                <Image source={icons.arrow} style={styles.arrow} resizeMode="contain"/>
              </TouchableHOC>
    )
}