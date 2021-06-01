import React from 'react'
import {
    Text
} from 'react-native'
import { connect } from 'react-redux'
import reduxProps from '../../WooCommerceWrapper/store/reduxProps'
import styles from './styles'


class TextRegular extends React.Component {
    render() {
        return (
            <Text
                ellipsizeMode='tail'
                allowFontScaling={false}
                {...this.props}
                style={[styles.text, this.props.style, {color:this.props.ConfigReducer.primary_heading_color}]}
            >{this.props.children}</Text>
        )
    }

}
export default connect(reduxProps.mapStateToProps, reduxProps.mapDispatchToProps)(TextRegular)