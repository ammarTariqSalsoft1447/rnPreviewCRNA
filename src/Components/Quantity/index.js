import React from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import vw from "../../Units/vw";
import vh from "../../Units/vh";
import CircularBook from "../CircularBook";
import { icons } from "../../assets/images/index";
import TouchableHOC from "../TouchableHOC";

export default class CategoryDraopdown extends React.Component {
  constructor(props) {
    super(props);
    this.btn = {};
    this.icon = {};
    if (props.size) {
      this.btn = {
        height: props.size,
        width: props.size,
        borderRadius: props.size / 2,
      };
      this.icon = { width: props.size - vh * 1, height: props.size - vh * 1 };
      this.text = { fontSize: props.size };
    }
  }
  state = { quantity: 1 };
  // plus = () => {
  //   console.log('called plus :');
  //   this.setState({
  //     quantity: this.state.quantity + 1
  //   })
  // }
  // minus = () => {

  //   if (this.state.quantity > 1) {
  //     this.setState({
  //       quantity: this.state.quantity - 1
  //     })
  //   }

  // }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHOC
          hitSlop={{
            top: 2 * vh,
            bottom: 2 * vh,
            left: 2 * vw,
            right: 2 * vw,
          }}
          style={[
            styles.btn,
            this.btn,
            this.props.ConfigReducer.primary_border_color,
          ]}
          // style={{backgroundColor: 'red'}}
          onPress={() => this.props.minus()}
        >
          <Image
            source={icons.minus}
            style={[styles.icon, this.icon]}
            resizeMode="contain"
          />
        </TouchableHOC>

        <CircularBook
          style={[
            styles.text,
            this.text,
            this.props.ConfigReducer.primary_font_color,
          ]}
        >
          {this.props.quantity}
        </CircularBook>
        <TouchableHOC
          hitSlop={{
            top: 2 * vh,
            bottom: 2 * vh,
            left: 2 * vw,
            right: 2 * vw,
          }}
          style={[
            styles.btn,
            this.btn,
            this.props.ConfigReducer.primary_border_color,
          ]}
          onPress={() => this.props.plus()}
        >
          <Image
            source={icons.plus}
            style={[styles.icon, this.icon]}
            resizeMode="contain"
          />
        </TouchableHOC>
      </View>
    );
  }
}
