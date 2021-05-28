import React from 'react'
import {
    Image
} from 'react-native'
import Ripple from "react-native-material-ripple"
import { icons } from '../../assets/images'
import styles from './style'

class IconButton extends React.Component {
    render() {
        return (
            <Ripple
                {...this.props}
                rippleColor='#15C6EA'
            >
                <Image style={[styles.icon, this.props.iconStyle]} source={this.props.icon ? this.props.icon : icons.Search} />
            </Ripple>
        )
    }
}
export default IconButton