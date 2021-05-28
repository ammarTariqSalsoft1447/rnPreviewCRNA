import React from 'react';
import {View, ImageBackground, Image} from 'react-native';
import {backgrounds, assets} from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import TextRegular from '../../Components/TextRegular';
import MainInput from '../../Components/MainInput';
import CircleBtn from '../../Components/CircleBtn';
import Alert from '../../Popups/Alert';
import TouchableHOC from '../../Components/TouchableHOC';
import {connect} from 'react-redux';
import Toast from 'react-native-toast';
import reduxProps from '../../WooCommerceWrapper/store/reduxProps';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {icons} from '../../assets/images';

class LogIn extends React.Component {
  state = {
    step: 1,
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
  };
  btnPress = () => {
    switch (this.state.step) {
      case 1:
        {
          this.handleCodeSend();
        }
        break;
      case 2: {
        this.handleCodeVerification();
        break;
      }
      case 3: {
        this.handlePasswordSet();
        break;
      }
    }

    // if (this.state.step < 3) {

    //     // this.setState({ step: this.state.step + 1 })

    // }
    // else {
    //     this.props.navigation.navigate("Login")
    // }
  };
  handleCodeVerification = () => {
    this.props.VerifyCode(
      {code: this.state.code},
      (success) => {
        Toast.show('Code verified successfully');
        this.setState({step: 3});
      },
      (error) => {
        Toast.show(error);
        this.enterCode.show();
      },
    );
  };

  handleCodeSendagain = () => {
    this.props.RequestCode(
      {email: this.state.email},
      (success) => {
        Toast.show('Email sent successfully');
      },
      (error) => {
        Toast.show(error);
      },
    );
  };

  handleCodeSend = () => {
    this.props.RequestCode(
      {email: this.state.email},
      (success) => {
        Toast.show('Email sent successfully');
        this.setState({step: this.state.step + 1});
      },
      (error) => {
        Toast.show(error);
      },
    );
  };
  handlePasswordSet = () => {
    this.props.ResetPassword(
      {
        code: this.state.code,
        password: this.state.password,
        confirm: this.state.confirmPassword,
      },
      (success) => {
        Toast.show('Password reset successfully');
        this.success.show();
        // this.props.navigation.pop();
      },
      (error) => {
        Toast.show(error);
      },
    );
  };
  renderBody = () => {
    switch (this.state.step) {
      case 1:
        return (
          <>
            <TextRegular style={styles.SignUp}>PASSWORD RECOVERY</TextRegular>

            <MainInput
              placeholder="Email Address"
              value={this.state.email.email}
              onChangeText={(text) => this.setState({email: text})}
              label="Enter your email address"
              key="email"
              style={styles.field}
              keyboardType="email-address"
            />
          </>
        );
        break;
      case 2:
        return (
          <>
            <KeyboardAwareScrollView>
              <TextRegular style={[styles.SignUp, {marginBottom: 0}]}>
                PASSWORD RECOVERY
              </TextRegular>
              <TextRegular style={styles.message}>
                A Verification email was sent to your email address:
                {this.state.email.trim() != ''
                  ? this.state.email
                  : 'example@email.com'}
              </TextRegular>
              <View style={styles.sendAgainRow}>
                <TextRegular style={styles.haveAccount}>
                  Didn't receive it yet ?{' '}
                </TextRegular>

                <TouchableHOC onPress={() => this.handleCodeSendagain()}>
                  <TextRegular style={styles.sendAgain}>
                    {' '}
                    Send it Again
                  </TextRegular>
                </TouchableHOC>
              </View>
              <MainInput
                onChangeText={(text) => this.setState({code: text})}
                key="code"
                placeholder="Code"
                label="Enter Verification Code"
                style={styles.field}
              />
            </KeyboardAwareScrollView>
          </>
        );
        break;

      case 3:
        return (
          <>
            <MainInput
              key="password"
              onChangeText={(t) => {
                this.setState({password: t});
              }}
              placeholder="password"
              secureTextEntry={true}
              label="Enter New Password"
              style={styles.field}
            />
            <MainInput
              key="passwordXC"
              onChangeText={(t) => {
                this.setState({confirmPassword: t});
              }}
              placeholder="Re-enter Password"
              secureTextEntry={true}
              style={styles.field}
            />
          </>
        );
        break;
    }
  };
  render() {
    return (
      <ImageBackground style={styles.bg} source={backgrounds.BG}>
        <Alert
          ref={(e) => (this.success = e)}
          text="Password Updated Successfully!"
          onCross={() => this.props.navigation.pop()}
        />

        <Alert
          text="Invalid Code"
          btntxt="ENTER AGAIN"
          ref={(e) => (this.enterCode = e)}
          icon={icons.caution}
          onSuccess={() => {}}
          // onSuccess={() => {
          //   this.setState({ discount: true });
          // }}
        />

        <Image source={assets.logo} style={styles.logo} resizeMode="contain" />
        <View style={styles.container}>
          {this.renderBody()}

          <CircleBtn onPress={this.btnPress} />
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              paddingBottom: vh * 8,
            }}>
            <TouchableHOC
              style={styles.row}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Image
                source={assets.arrowBack}
                style={styles.arrow}
                resizeMode="contain"
              />
              <TextRegular style={styles.signin}> Back to login</TextRegular>
            </TouchableHOC>
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
