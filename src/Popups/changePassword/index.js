import React, { Component } from 'react';
import { View, Modal, Image, ImageBackground } from 'react-native';
import styles from './styles';
import { icons, assets, backgrounds, samplePictures } from '../../assets/images';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import Button from '../../Components/Button';
import TouchableHOC from '../../Components/TouchableHOC';
import { connect } from 'react-redux';

import TextRegular from '../../Components/TextRegular';
import TextSemi from '../../Components/TextSemi';
import MainInput from '../../Components/MainInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StarRating from 'react-native-star-rating';
import Toast from 'react-native-toast';
import reduxProps from '../../WooCommerceWrapper/store/reduxProps';
class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: this.props.value ? true : false,
      text: '',
      visible: false,
      imagesShown: false,
      password: '',
      confirm: '',
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
    if (this.props.onSuccess) {
      this.props.onSuccess();
    }
  };
  _update = () => {
    this.props.UpdatePassword(
      { password: this.state.password, confirm: this.state.confirm },
      this.props.Reducer.userId,
      (success) => {
        if (success) {
          this.onSuccess();
          setTimeout(() => {
            Toast.show('Password Updated');
          }, 500);
        }
      },
      (error) => {
        console.log('error', error);

        Toast.show(error);
      },
    );
  };
  render() {
    return (
      <Modal
        key={'cbt'}
        visible={this.state.visible}
        transparent={true}
        animationType="fade">
        <KeyboardAwareScrollView enableOnAndroid>
          <View style={styles.modalTouchable}>
            <View style={styles.imageBg}>
              <TouchableHOC style={styles.crossContainer} onPress={this.onCross}>
                <Image
                  source={icons.cross}
                  style={styles.cross}
                  resizeMode="contain"
                />
              </TouchableHOC>
              <View style={styles.container}>
                <Image
                  source={icons.key}
                  style={styles.checkMark}
                  resizeMode="contain"
                />
                <TextSemi style={[styles.feedback, this.props.ConfigReducer.feedback]}>Update Password</TextSemi>
                {/* <MainInput style={styles.field} secureTextEntry={true} placeholder="Old Password"/> */}

                <MainInput
                  style={styles.field}
                  placeholder="New Password"
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={(text) => this.setState({ password: text })}
                />

                <MainInput
                  style={styles.field}
                  placeholder="Re-Type New Password"
                  secureTextEntry={true}
                  value={this.state.confirm}
                  onChangeText={(text) => this.setState({ confirm: text })}
                />

                {/* OLD   <Button title="UPDATE" onPress={this.onSuccess} btnContainer={styles.btn}/> */}

                <Button
                  title="UPDATE"
                  onPress={() => this._update()}
                  btnContainer={styles.btn}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    );
  }
}

export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps,
  null,
  { forwardRef: true },
)(Feedback);
