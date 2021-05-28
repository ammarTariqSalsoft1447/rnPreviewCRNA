import React, {Component, forwardRef} from 'react';
import {View, Modal, Image, ImageBackground} from 'react-native';
import styles from './styles';
import {icons, assets, backgrounds, samplePictures} from '../../assets/images';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import Button from '../../Components/Button';
import TouchableHOC from '../../Components/TouchableHOC';

import TextRegular from '../../Components/TextRegular';
import TextSemi from '../../Components/TextSemi';
import MainInput from '../../Components/MainInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import StarRating from 'react-native-star-rating';
import {connect} from 'react-redux';
import {withNavigation} from '@react-navigation/compat';
import {WebView} from 'react-native-webview';
import reduxProps from '../../WooCommerceWrapper/store/reduxProps';
import Toast from 'react-native-toast';
class ImagePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: this.props.value ? true : false,
      text: '',
      visible: false,
      imagesShown: false,
      reviewer: this.props.Reducer.userInfo?.first_name ?? '', //name
      reviewer_email: this.props.Reducer.userInfo?.email ?? '', //email
      review: '',
      rating: 0,
      id: 0,
      uri: '',
    };
  }

  show = (source) => {
    console.log('source', source);
    this.setState((p) => {
      return {
        ...p,
        visible: true,
        // id: id,
        // rating,
        uri: source,
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
  onSuccess = () => {
    this.hide();
    this.props.onSuccess();
  };

  onPublish = () => {
    // alert('asdad');
    if (this.state.rating == 0) {
      Toast.show('Please put the rating');
    }
    if (this.state.review.trim() == '') {
      Toast.show('Please enter review');
    }

    if (this.state.reviewer == '') {
      Toast.show('Please enter name');
    }

    if (this.state.reviewer_email.trim() == '') {
      Toast.show('Please enter email');
    }

    this.props.CreateRating(
      {
        product_id: this.state.id,
        review: this.state.review,
        reviewer: this.state.reviewer,
        reviewer_email: this.state.reviewer_email,
        rating: this.state.rating,
      },
      (success) => {
        Toast.show(success);
        this.hide();
      },
      (error) => {
        Toast.show(error);
        this.hide();
      },
    );
  };

  render() {
    console.log('this.state.rating', this.state.rating);
    return (
      <Modal
        key={'cbt'}
        visible={this.state.visible}
        transparent={false}
        animationType="fade">
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <TouchableHOC style={styles.crossContainer} onPress={this.onCross}>
            <Image
              source={icons.cross}
              style={styles.cross}
              resizeMode="contain"
            />
          </TouchableHOC>
          <WebView source={{uri: this.state.uri}} style={{marginTop: 20}} />
        </View>
      </Modal>
    );
  }
}
export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps,
  null,
  {forwardRef: true},
)(ImagePreview);
