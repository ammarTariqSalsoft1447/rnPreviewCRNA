import React from "react";
import { Text, View, Image } from "react-native";
import TextSemi from "../TextSemi";
import styles from "./styles";
import TouchableHOC from "../../Components/TouchableHOC";
import { icons } from "../../assets/images";
import { connect } from "react-redux";
import reduxProps from "../../WooCommerceWrapper/store/reduxProps";


class ImageButton extends React.Component {
  render() {
    return (
      <TouchableHOC
        style={[
          styles.container,
          this.props.btnContainer,
          {
            backgroundColor: this.props.ConfigReducer.secondary_font_color,
            shadowColor:this.props.ConfigReducer.primaryColor,
          }
        ]}
        onPress={this.props.onPress}
      >
        <TextSemi
          style={[
            styles.label,
            this.props.labelStyle,
            { color: this.props.ConfigReducer.primaryColor }
          ]}
        >
          {this.props.title}
        </TextSemi>
        <Image
          source={icons.backArrow}
          style={[styles.image, this.props.imageStyle]}
          resizeMode="contain"
        />
      </TouchableHOC>
    );
  }
}
export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps
)(ImageButton)