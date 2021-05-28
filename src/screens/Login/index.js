import React from 'react';
import {View, ImageBackground, Image, Keyboard} from 'react-native';
import {backgrounds, assets} from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import TextRegular from '../../Components/TextRegular';
import MainInput from '../../Components/MainInput';
import CircleBtn from '../../Components/CircleBtn';
import Alert from '../../Popups/Alert';
import Toast from 'react-native-toast';
import {connect} from 'react-redux';
import reduxProps from '../../WooCommerceWrapper/store/reduxProps';
class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      visible: false,
    };
  }

  onPress = () => {
    this.props.Login(
      this.state,
      (success) => {
        if (success) {
          this.props.UserInfo(
            this.props.Reducer.userId,
            (success) => {
              Toast.show('Login Successful');

              this.props.navigation.navigate('Home');
            },
            (error) => {},
          );
        }
      },
      (err) => {
        Toast.show(err);
      },
    );
    // this.props.navigation.navigate("Home")
  };
  render() {
    return (
      <ImageBackground style={styles.bg} source={backgrounds.BG}>
        <Alert
          ref={(e) => (this.success = e)}
          text="Password Updated Successfully!"
        />
        <Image source={assets.logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.container}>
          <TextRegular style={styles.SignUp}>LOG IN</TextRegular>
          <TextRegular style={styles.detail}>Login your Account</TextRegular>

          <MainInput
            placeholder="Email Address"
            style={styles.field}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            keyboardType='email-address'
          />

          <MainInput
            placeholder="Password"
            secureTextEntry={true}
            style={[styles.field, {marginBottom: vh * 1}]}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
          />

          <TextRegular
            onPress={() => this.props.navigation.navigate('PasswordRecovery')}
            style={styles.forgot}>
            Forgot Password?
          </TextRegular>

          {/* <CircleBtn onPress={()=>this.props.navigation.navigate("Home")}/> */}
          <CircleBtn onPress={() => this.onPress()} />
          <View style={styles.row}>
            <TextRegular style={styles.haveAccount}>New Here </TextRegular>
            <TextRegular
              onPress={() => this.props.navigation.navigate('SignUp')}
              style={styles.signin}>
              {' '}
              Sign Up
            </TextRegular>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps,
)(LogIn);
