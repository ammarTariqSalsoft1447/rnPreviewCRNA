import React from 'react';
import {Image, Text, View} from 'react-native';
import TextMedium from '../TextMedium';
import styles from './styles';
import TouchableHOC from '../../Components/TouchableHOC';
import {connect} from 'react-redux';
import reduxProps from '../../WooCommerceWrapper/store/reduxProps';
import {icons} from '../../assets/images';
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import {
  primary_font_color,
  secondaryColor
} from '../../../config.json';

const CartButton = (props) => {
  let cartLength = props.Reducer.cartProduct.length;

  if (cartLength > 9) {
    cartLength = '9+';
  }

  return (
    <TouchableHOC style={{}} onPress={() => props.navigation.navigate('Cart')}>
      <Image
        source={icons.cart}
        style={{width: 4.5 * vw, height: 4 * vh, resizeMode: 'contain'}}
      />

      {props.Reducer.cartProduct.length > 0 && (
        <View
          style={{
            position: 'absolute',
            width: 3.5 * vw,
            height: 3.5 * vw,
            backgroundColor: primary_font_color,
            right: -1.5 * vw,
            top: -0.2 * vh,
            borderRadius: 1.75 * vw,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <TextMedium
            style={{
              color: secondaryColor,
              fontSize: 1.3 * vh,
              textAlign: 'center',
            }}>
            {cartLength}
          </TextMedium>
        </View>
      )}
    </TouchableHOC>
  );
};

export default connect(reduxProps.mapStateToProps, null)(CartButton);
