import React, { Component } from "react";
import { View, Modal, Image, TouchableOpacity } from "react-native";
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
import TextSemi from "../../Components/TextSemi";
import MainInput from "../../Components/MainInput";
import MaskInput from "../../Components/MaskInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast";
import { connect } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import vh from "../../Units/vh";

import reduxProps from "../../WooCommerceWrapper/store/reduxProps";

import { store } from "../../WooCommerceWrapper/store";
const state = store.getState();
const config = state.ConfigReducer;
const { primary_background_color } = config;
class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: this.props.value ? true : false,
      text: "",
      visible: false,
      imagesShown: false,

      cardName: "",
      cardNumber: "",
      cardExpMonth: 23,
      expiryValue: "",
      cardCvc: "",
      expiry: false,
      expiryValue: "",
    };
  }
  hideDatePicker = () => {
    this.setState({ expiry: false });
  };

  handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    this.setState({ expiryValue: moment(date).format("MM/YY") });
    this.hideDatePicker();
  };
  show = (data) => {
    this.setState((p) => {
      return {
        ...p,
        visible: true,
      };
    });
  };
  hide = () => {
    // console.log("hide");

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

  onChangeText = ({ nativeEvent }) => {
    this.setState({ cardNumber: nativeEvent.text });
  };
  onChangeCVV = (text) => {
    this.setState({ cardCvc: text });
  };

  onChangeExpiryDate = ({ nativeEvent }) => {
    this.setState({ expiryValue: nativeEvent.text });
  };
  onSuccess = () => {
    if (!this.state.cardName) {
      return Toast.show("Cardholder  name is required");
    }
    if (!this.state.cardNumber) {
      return Toast.show("Card Number is required");
    }
    if (!this.state.cardCvc) {
      return Toast.show("Card CVV is required");
    }

    if (this.state.expiryValue == "") {
      return Toast.show("Card Expiry Date is required");
    }

    let Data = {
      "card[name]": this.state.cardNumber,
      "card[number]": this.state.cardNumber,
      "card[exp_month]": this.state.expiryValue.split("/")[0],
      "card[exp_year]": this.state.expiryValue.split("/")[1],
      // 'card[exp_month]':this.state.expiryValue,
      // 'card[exp_year]' : this.state.expiryValue,
      "card[cvc]": this.state.cardCvc,
      amount: this.props.total,
    };
    this.setState({ visible: false });
    this.props.managePayment(
      Data,
      (succes) => {
        // this.props.setIsPaid();
        this.props.onSuccess();
      },
      (error) => {
        // this.setState({visible: true});
      }
    );
  };
  render() {
    return (
      <Modal
        key={"cbt"}
        visible={this.state.visible}
        transparent={true}
        animationType="fade"
      >
        <TouchableOpacity
          onPress={() => this.hide()}
          style={{
            height: 100 * vh,
            width: 100 * vh,
            position: "absolute",
            top: 0,
            backgroundColor: this.props.ConfigReducer.primary_background_color,
          }}
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.modalTouchable}
        >
          <View
            style={[
              styles.imageBg,
              {
                backgroundColor: this.props.ConfigReducer.secondaryColor,
              },
            ]}
          >
            <TouchableHOC style={styles.crossContainer} onPress={this.onCross}>
              <Image
                source={icons.cross}
                style={styles.cross}
                resizeMode="contain"
              />
            </TouchableHOC>
            <View style={styles.container}>
              <Image
                source={icons.cardGreen}
                style={styles.checkMark}
                resizeMode="contain"
              />
              <TextRegular
                style={[styles.text, { color: primary_heading_color }]}
              >
                Amount
              </TextRegular>
              <TextSemi
                style={[
                  styles.amount,
                  {
                    color: this.props.ConfigReducer.secondary_font_color,
                  },
                ]}
              >
                ${this.props.total}
              </TextSemi>
              <MainInput
                placeholder="Cardholder name"
                style={styles.input}
                value={this.state.cardName}
                onChangeText={(text) => this.setState({ cardName: text })}
              />
              {/* <MainInput
                placeholder="Card number"
                keyboardType="number-pad"
                value={this.state.cardNumber}
                onChangeText={(text) => this.setState({ cardNumber: text })}
                style={styles.input}
              /> */}
              <MaskInput
                placeholder="Card number"
                style={styles.input}
                value={this.state.cardNumber}
                keyboardType="number-pad"
                onChangeText={this.onChangeText}
                maskFormat="DDDD-DDDD-DDDD-DDDD"
              />

              <MainInput
                placeholder="CVV Code"
                keyboardType="number-pad"
                style={styles.input}
                value={this.state.cardCvc}
                onChangeText={this.onChangeCVV}
                maxLength={3}
              />

              <MaskInput
                placeholder="Expiry Date"
                rightIcon={icons.calendar}
                style={styles.input}
                value={this.state.expiryValue}
                onChangeText={this.onChangeExpiryDate}
                maskFormat="DD/DD"
              />

              <Button
                btnContainer={[
                  styles.yesBtn,
                  {
                    backgroundColor:
                      this.props.ConfigReducer.secondary_font_color,
                  },
                ]}
                onPress={this.onSuccess}
                title="PAY"
              ></Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <DateTimePickerModal
          isVisible={this.state.expiry}
          mode="date"
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicker}
          isDarkModeEnabled={true}
        />
      </Modal>
    );
  }
}

export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps,
  null,
  { forwardRef: true }
)(Alert);
