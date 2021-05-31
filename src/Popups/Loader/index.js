import React, { Component } from "react";
import { View, Modal, ActivityIndicator, StatusBar } from "react-native";
import styles from "./styles";
import {
  icons,
  assets,
  backgrounds,
  samplePictures,
} from "../../assets/images";

import Button from "../../Components/Button";
import TouchableHOC from "../../Components/TouchableHOC";

import TextRegular from "../../Components/TextRegular";
import MainInput from "../../Components/MainInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";

import reduxProps from "../../WooCommerceWrapper/store/reduxProps";

import { store } from "../../WooCommerceWrapper/store";
const state = store.getState();
const config = state.ConfigReducer;
const { secondary_font_color } = config;
class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: this.props.value ? true : false,
      text: "",
      visible: false,
      imagesShown: false,
    };
  }

  show = (data) => {
    this.setState((p) => {
      return {
        ...p,
        visible: true,
      };
    });
  };
  hide = () => {
    this.setState((p) => {
      return {
        ...p,
        visible: false,
      };
    });
  };
  onCross = () => {
    this.hide();
    if (this.props.onCross) {
      this.props.onCross();
    }
  };
  onSuccess = () => {
    this.hide();
    this.props.onSuccess();
  };
  componentWillUnmount() {
    StatusBar.setHidden(false);
    StatusBar.setTranslucent(false);
  }
  render() {
    console.log("Props:", this.props.Reducer.loading);

    return (
      <Modal
        key={"cbt"}
        // visible={this.state.visible}
        visible={this.props.Reducer.loading}
        transparent={true}
        animationType="fade"
      >
        <View
          style={[
            styles.modalTouchable,
            {
              backgroundColor:
                this.props.ConfigReducer.primary_background_color,
            },
          ]}
        >
          <View
            style={[
              styles.imageBg,
              { backgroundColor: this.props.ConfigReducer.secondaryColor },
            ]}
          >
            {/* <TouchableHOC style={styles.crossContainer} onPress={this.onCross}>
              <Image source={icons.cross} style={styles.cross} resizeMode="contain" />
            </TouchableHOC> */}
            <View style={styles.container}>
              {/* <Image source={this.props.icon?this.props.icon:assets.checkcircle} style={styles.checkMark} resizeMode="contain" /> */}

              <ActivityIndicator size="small" color="black" />
              <TextRegular
                style={[
                  styles.text,
                  { color: this.props.ConfigReducer.primary_heading_color },
                ]}
              >
                Loading...
              </TextRegular>
              {this.props.onSuccess2 ? (
                <View style={styles.btnsContainer}>
                  <Button
                    btnContainer={[
                      styles.yesBtn,
                      {
                        backgroundColor:
                          this.props.ConfigReducer.secondary_font_color,
                      },
                    ]}
                    onPress={this.onSuccess}
                    title="Yes"
                  ></Button>
                  <Button
                    btnContainer={[
                      styles.noBtn,
                      {
                        backgroundColor:
                          this.props.ConfigReducer.secondaryColor,
                        color: this.props.ConfigReducer.secondary_font_color,
                        borderColor:
                          this.props.ConfigReducer.secondary_font_color,
                      },
                    ]}
                    labelStyle={{
                      color: this.props.ConfigReducer.secondary_font_color,
                    }}
                    onPress={this.hide}
                    title="No"
                  ></Button>
                </View>
              ) : this.props.onSuccess ? (
                <Button
                  btnContainer={[
                    styles.request,
                    {
                      backgroundColor:
                        this.props.ConfigReducer.secondary_font_color,
                    },
                    this.props.btntxt ? { width: "50%" } : {},
                  ]}
                  onPress={this.onSuccess}
                  title={this.props.btntxt ? this.props.btntxt : "OK"}
                ></Button>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps
)(Loader);
