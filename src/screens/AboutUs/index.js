import React from 'react';
import { View, ImageBackground, ScrollView, RefreshControl } from 'react-native';
import { backgrounds, assets } from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import TextRegular from '../../Components/TextRegular';
import PlayBold from '../../Components/PlayBold';
import MainInput from '../../Components/MainInput';
import CircleBtn from '../../Components/CircleBtn';
import Alert from '../../Popups/Alert';
import TextMedium from '../../Components/TextMedium';
import { connect } from 'react-redux';
import reduxProps from '../../WooCommerceWrapper/store/reduxProps';
class AboutUs extends React.Component {
  state = {
    refreshing: true,
  };

  _getAboutUsData = () => {
    this.props.GetCustomData(
      (success) => {
        console.log('success succes:',success);
        if (success) {
          this.setState({
            refreshing: false,
          });
        }
      },
      (error) => { 
        console.log('error succes:',error);

      },
    );
  };

  componentDidMount() {
    // this._getAboutUsData();
  }

  render() {
    console.log('this staet asdasdsd:', this.props.Reducer.customData);
    return (
      <ScrollView
        style={{ flex: 1, paddingHorizontal: vw * 5 }}
     >
        <ImageBackground
          source={{ uri: this.props.Reducer.customData && this.props.Reducer.customData?.aboutUs?.image }}
          style={styles.banner}
          imageStyle={{ borderRadius: vw * 1 }}>
          <PlayBold style={styles.title}>
            {'She is Strength &\nDignity Without\n Fear of the Failure'}
          </PlayBold>
        </ImageBackground>
        <TextMedium style={styles.heading}>
          {this.props.Reducer.customData &&  this.props.Reducer.customData?.aboutUs?.title}
        </TextMedium>
        <TextRegular style={styles.p1}>
          {this.props.Reducer.customData &&    this.props.Reducer.customData?.aboutUs?.content}
        </TextRegular>
      </ScrollView>
    );
  }
}

export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps,
)(AboutUs);
