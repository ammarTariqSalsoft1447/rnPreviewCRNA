import React from 'react';
import {View, ImageBackground, Image, Text} from 'react-native';
import {backgrounds, assets, icons} from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import ImageButton from '../../Components/ImageButton';
import MainInput from '../../Components/MainInput';
import CircleBtn from '../../Components/CircleBtn';
import Alert from '../../Popups/Alert';
import TextMedium from '../../Components/TextMedium';
import TextRegular from '../../Components/TextRegular';
import Toast from 'react-native-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import reduxProps from '../../WooCommerceWrapper/store/reduxProps';

import { store } from '../../WooCommerceWrapper/store';
const state = store.getState()
const config = state.ConfigReducer
const {
  primary_heading_color,
  primary_section_color,
  primary_font_color,
  secondary_font_color,
  primaryColor,
  secondaryColor,
  primary_placeholder_Color,
  primary_border_color,
  primary_background_color,
  secondary_background_color,
  primary_message_color,
  drawer_Active_Color,
  drawer_inActive_Color,
  default_color,
} = config
class AboutUs extends React.Component {
  state = {
    name: '',
    email: '',
    message: '',
    phone: '',
  };
  _onSend = () => {
    if (!this.state.name) {
      return Toast.show('Name is required');
    }
    if (!this.state.email) {
      return Toast.show('Email is required');
    }
    if (!this.state.phone) {
      return Toast.show('Phone is required');
    }
    if (this.state.phone.length < 12 || this.state.phone.length > 12) {
      return Toast.show('Please enter valid phhone no');
    }

    if (!this.state.message) {
      return Toast.show('Message is required');
    }

    this.props.SubmitContactForm(
      {
        name: this.state.name,
        email: this.state.email,
        message: this.state.message,
      },
      (success) => {
        this.success.show();
      },
      (error) => {
        Toast.show(error);
      },
    );
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      console.log('this.props.Reducer.userInfo', this.props.Reducer.userInfo);
      this.setState({
        // id: this.props.Reducer.userInfo.id,
        name: this.props.Reducer.userInfo?.first_name ?? '',
        email: this.props.Reducer.userInfo?.email ?? '',
        phone: this.props.Reducer.userInfo?.billing.phone ?? '',
      });
    });
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus');
  }

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={{flex: 1, paddingHorizontal: vw * 5, paddingTop: vh * 4}}>
          <Alert
            text="Your message has been sent"
            ref={(e) => (this.success = e)}
            onSuccess={() => {
              this.props.navigation.pop();
            }}
          />
          <TextRegular
            style={{
              color: primaryColor,
              fontSize: vh * 2.5,
              marginBottom: vh * 2.5,
            }}>
            Thank you for shopping with us. We hope you have enjoyed the
            experience. If we can help you with anything please contact us.
          </TextRegular>

          <MainInput
            placeholder="Name"
            value={this.state.name}
            onChangeText={(text) => this.setState({name: text})}
            key="Name"
            style={styles.input}
          />

          <MainInput
            placeholder="Email"
            value={this.state.email}
            onChangeText={(text) => this.setState({email: text})}
            style={styles.input}
            keyboardType="email-address"
          />

          <MainInput
            placeholder="Phone #"
            keyboardType="phone-pad"
            value={this.state.phone}
            onChangeText={(text) => this.setState({phone: text})}
            style={styles.input}
            
          />

          <MainInput
            placeholder="Type your message here"
            style={styles.txtArea}
            value={this.state.message}
            onChangeText={(text) => this.setState({message: text})}
            multiline={true}
          />

       
          <ImageButton title="Send" onPress={() => this._onSend()} />

          <TextMedium style={styles.contactTxt}>Contact Detail</TextMedium>
          <View style={styles.contactRow}>
            <Image
              source={icons.phone}
              style={styles.contacticon}
              resizeMode="contain"
            />
            <TextRegular style={styles.contact}>432-631-2028</TextRegular>
          </View>
          <View style={styles.contactRow}>
            <Image
              source={icons.mail}
              style={styles.contacticon}
              resizeMode="contain"
            />
            <TextRegular style={styles.contact}>
              jensmithers@pinkpoppy-boutique.com
            </TextRegular>
          </View>
          <View style={styles.contactRow}>
            <Image
              source={icons.location}
              style={styles.contacticon}
              resizeMode="contain"
            />
            <TextRegular style={styles.contact}>
              Walmart, Nuevo León 67117 Mexico, Independence, KS 67301
            </TextRegular>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps,
)(AboutUs);
