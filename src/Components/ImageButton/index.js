import React from "react";
import { Text, View, Image } from "react-native";
import TextSemi from "../TextSemi";
import styles from "./styles";
import TouchableHOC from "../../Components/TouchableHOC";
import { icons } from "../../assets/images";

export default (props) => {
  return (
    <TouchableHOC
      style={[
        styles.container,
        props.btnContainer,
        this.props.ConfigReducer.secondary_font_color,
        this.props.ConfigReducer.primaryColor,
      ]}
      onPress={props.onPress}
    >
      <TextSemi
        style={[
          styles.label,
          props.labelStyle,
          this.props.ConfigReducer.primaryColor,
        ]}
      >
        {props.title}
      </TextSemi>
      <Image
        source={icons.backArrow}
        style={[styles.image, props.imageStyle]}
        resizeMode="contain"
      />
    </TouchableHOC>
  );
};
