import React from "react";
import { Text, View, Image } from "react-native";
import styles from "./styles";
import TouchableHOC from "../TouchableHOC";
import { icons } from "../../assets/images";
import { connect } from "react-redux";
import reduxProps from "../../WooCommerceWrapper/store/reduxProps";


class CircleBtn extends React.Component {
  render() {
    return (
      <TouchableHOC
        style={[
          styles.container,
          this.props.btnContainer,
          {
            backgroundColor: this.props.ConfigReducer.primary_font_color,
            shadowColor: this.props.ConfigReducer.primaryColor,
          }
        ]}
        onPress={this.props.onPress}
      >
        <Image source={icons.arrow} style={styles.arrow} resizeMode="contain" />
      </TouchableHOC>
    );
  }
}
export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps,
  null,
  { forwardRef: true }
)(CircleBtn)