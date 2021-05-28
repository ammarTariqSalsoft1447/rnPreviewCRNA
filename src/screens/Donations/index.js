import React from 'react';
import { View, ImageBackground, Image, Text } from 'react-native';
import { backgrounds, assets, icons } from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import ImageButton from '../../Components/ImageButton';
import MainInput from '../../Components/MainInput';
import MaskInput from '../../Components/MaskInput';

import CircleBtn from '../../Components/CircleBtn';
import Alert from '../../Popups/Alert';
import TextMedium from '../../Components/TextMedium';
import TextRegular from '../../Components/TextRegular';
import Toast from 'react-native-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import reduxProps from '../../WooCommerceWrapper/store/reduxProps';
const nameRegex = /^[a-zA-Z ]+$/;
class Donations extends React.Component {
  state = {
    name: '',
    number: '',
    cvc: '',
    em: '',
    ey: '',
    amount: 0,
  };
  donate = async () => {
    if (this.state.name === '') {
      Toast.show('Please enter your name');
      return;
    }
    if (!nameRegex.test(this.state.name)) {
      Toast.show('Please enter a valid name');
      return;
    }
    if (this.state.number === '') {
      Toast.show('Please enter your card number');
      return;
    }
    if (this.state.number.length < 16) {
      Toast.show('Please enter your valid card number');
      return;
    }
    if (this.state.cvc === '') {
      Toast.show('Please enter your cvc');
      return;
    }
    if (this.state.cvc.length < 3) {
      Toast.show('Please enter your valid cvc');
      return;
    }
    if (this.state.em === '') {
      Toast.show('Please enter your card expiry month');
      return;
    }
    let month = parseInt(this.state.em);
    if (month < 1 || month > 12) {
      Toast.show('Please enter a valid month');
      return;
    }
    var strMonth = month.toString();
    if (month < 10) {
      strMonth = '0' + strMonth;
    }
    if (this.state.ey === '') {
      Toast.show('Please enter your card expiry year');
      return;
    }
    if (this.state.ey.length < 4) {
      Toast.show('Please enter valid card expiry year');
      return;
    }
    let amount = parseFloat(this.state.amount);
    if (typeof amount === 'number') {
      if (amount < 1) {
        Toast.show('Please enter your amount');
        return;
      }
    }
    const data = {
      // holder_name: this.state.name,
      // number: this.state.number,
      cvv: this.state.cvc,
      // expiry: strMonth + '/' + this.state.ey,

      // name: this.state.name,
      // card_number: this.state.number,
      // cvc: this.state.cvc,
      // expiry_month: strMonth,
      // expiry_year: this.state.ey,
      amount: this.state.amount,

      month: strMonth,
      year: this.state.ey,

      card: this.state.number.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''),
      // month:'12',
      // year:'24',
      // amount:123
    };
    // Toast.show(data.card)
    this.props.loadingOn();
    try {
      const res = await fetch(
        'https://pinkpoppy-boutique.com/wp-json/api/v1/donation',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        },
      );
      const response = await res.json();
      this.props.loadingOff();

      setTimeout(() => {
        Toast.show('Payment succeful, thank you for your donations');
      }, 500);


      this.props.navigation.navigate('Home')
      this.setState({
        name: '',
        number: '',
        cvc: '',
        em: '',
        ey: '',
        amount: 0,
      });

    } catch (e) {
      Toast.show(getMessage(e));
      this.props.loadingOff();
    }
  };

  componentDidMount() { }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus');
  }
  onChangeText = ({ nativeEvent }) => {
    this.setState({
      // number: nativeEvent.text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''),
      number: nativeEvent.text
    });
  };

  render() {
    console.log('this,state', this.state);
    return (
      <KeyboardAwareScrollView>
        <View style={{ flex: 1, paddingHorizontal: vw * 5, paddingTop: vh * 4 }}>
          <MainInput
            placeholder="Card holder name"
            value={this.state.name}
            onChangeText={(text) => this.setState({ name: text })}
            key="Name"
            style={styles.input}
          />
          {/* <MainInput
            keyboardType="numeric"
            maxLength={17}
            placeholder="Card Number"
            value={this.state.number}
            onChangeText={(text) => {
              this.setState({
                number: text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''),
              });
            }}
            style={styles.input}
          /> */}

          <MaskInput
            placeholder="Card number"
            style={styles.input}
            value={this.state.number}
            keyboardType="number-pad"
            onChangeText={this.onChangeText}
            maskFormat="DDDD-DDDD-DDDD-DDDD"
          />
          {/* 
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
              /> */}

          <MainInput
            keyboardType="number-pad"
            placeholder="CVC"
            maxLength={4}
            value={this.state.cvc}
            onChangeText={(text) => {
              this.setState({
                cvc: text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''),
              });
            }}
            style={styles.input}
          />

          <MainInput
            keyboardType="number-pad"
            placeholder="Expiry Month"
            maxLength={2}
            value={this.state.em}
            onChangeText={(text) => {
              this.setState({
                em: text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''),
              });
            }}
            style={styles.input}
          />
          <MainInput
            keyboardType="number-pad"
            placeholder="Expiry Year"
            maxLength={4}
            value={this.state.ey}
            onChangeText={(text) => {
              this.setState({
                ey: text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''),
              });
            }}
            style={styles.input}
          />

          <MainInput
            keyboardType="decimal-pad"
            placeholder="Amount"
            value={this.state.amount}
            onChangeText={(text) => {
              this.setState({
                amount: text.replace(/[- #*;,<>\{\}\[\]\\\/]/gi, ''),
              });
            }}
            style={styles.input}
          />
          <ImageButton title="Donate Now" onPress={this.donate} />
        </View>
        <Alert
          text="Your message has been sent"
          ref={(e) => (this.success = e)}
          onSuccess={() => {
            this.props.navigation.pop();
          }}
        />
      </KeyboardAwareScrollView>
    );
  }
}
const mapState = (state) => {
  return {};
};
const mapDispatch = (dispatch) => {
  return {
    loadingOn: () => dispatch({ type: 'START_LOAD' }),
    loadingOff: () => dispatch({ type: 'CLOSE_LOAD' }),
  };
};
export default connect(mapState, mapDispatch)(Donations);

export const getMessage = (json) => {
  const message = 'Something went wrong';
  switch (typeof json) {
    case 'string': {
      return json;
    }
    case 'object': {
      if (Array.isArray(json)) {
        var data = json[0];
        return getMessage(data);
      } else {
        if (json.message) {
          return getMessage(json.message);
        } else if (json.error) {
          return getMessage(json.error);
        } else if (json.errors) {
          return getMessage(json.errors);
        } else {
          let values = Object.values(json);
          return getMessage(values);
        }
      }
    }
    default: {
      return message;
    }
  }
};
