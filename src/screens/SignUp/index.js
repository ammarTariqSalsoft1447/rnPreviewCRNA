import React from 'react';
import { View, ImageBackground, Image } from 'react-native';
import { backgrounds, assets } from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import TextRegular from '../../Components/TextRegular';
import MainInput from '../../Components/MainInput';
import CircleBtn from '../../Components/CircleBtn';
import Alert from '../../Popups/Alert';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import reduxProps from '../../WooCommerceWrapper/store/reduxProps';
import Toast from 'react-native-toast';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      username: '',
      last_name: '',
      phoneNo: '',
      email: '',
      password: '',
      confirm: '',
    };
  }

  onPress = () => {
    this.props.SignUp(
      this.state,
      () => {
        Toast.show('Account created successfully');
        this.success.show();
      },
      (err) => {
        Toast.show(err);
      },
    );
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <ImageBackground style={styles.bg} source={backgrounds.BG}>
          <Alert
            ref={(e) => (this.success = e)}
            text={'Account created\nsuccessfully'}
            onCross={() => this.props.navigation.navigate('Login')}
          />

          <Image
            source={assets.logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.container}>
            <TextRegular style={[styles.SignUp, {
              color: this.props.ConfigReducer.secondary_font_color
            }]}>SIGN UP</TextRegular>
            <TextRegular style={[styles.detail, {
              color: this.props.ConfigReducer.primary_heading_color,

            }]}>
              Sign up your Account
            </TextRegular>
            <MainInput
              placeholder="First Name"
              style={styles.field}
              onChangeText={(text) => this.setState({ first_name: text })}
              value={this.state.first_name}
            />

            <MainInput
              placeholder="Last Name"
              style={styles.field}
              onChangeText={(text) => this.setState({ last_name: text })}
              value={this.state.last_name}
            />

            <MainInput
              placeholder="User Name"
              style={styles.field}
              onChangeText={(text) => this.setState({ username: text })}
              value={this.state.username}
            />

            <MainInput
              placeholder="Phone no."
              style={styles.field}
              onChangeText={(text) => this.setState({ phoneNo: text })}
              keyboardType="numeric"
              value={this.state.phoneNo}
            />

            <MainInput
              placeholder="Email Address"
              style={styles.field}
              onChangeText={(text) => this.setState({ email: text })}
              value={this.state.email}
              keyboardType="email-address"
            />

            <MainInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.field}
              onChangeText={(text) => this.setState({ password: text })}
              value={this.state.password}
            />

            <MainInput
              placeholder="Re-enter Password"
              secureTextEntry={true}
              style={styles.field}
              onChangeText={(text) => this.setState({ confirm: text })}
              value={this.state.confirm}
            />

            <CircleBtn onPress={() => this.onPress()} />

            <View style={styles.row}>
              <TextRegular style={[styles.haveAccount,{
                color:this.props.ConfigReducer.primary_heading_color
              }]}>
                Already have an account?
              </TextRegular>
              <TextRegular
                onPress={() => this.props.navigation.navigate('Login')}
                style={styles.signin}>
                Sign In
              </TextRegular>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps,
)(SignUp);
