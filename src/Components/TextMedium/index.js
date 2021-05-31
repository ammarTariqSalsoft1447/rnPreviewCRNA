import React from "react";
import { Text } from "react-native";
import styles from "./styles";

export default (props) => {
  return (
    <Text
      ellipsizeMode="tail"
      allowFontScaling={false}
      {...props}
      style={[styles.text, props.style, this.props.ConfigReducer.primaryColor]}
    >
      {props.children}
    </Text>
  );
};
