import React from "react";
import { Image, View, ImageBackground, Text } from "react-native";
import styles from "./styles";
import vw from "../../Units/vw";
import vh from "../../Units/vh";
import { Fonts } from "../../assets/fonts";
import { icons, samplePictures } from "../../assets/images/index";
import DropDownPicker from "react-native-dropdown-picker";
import TextMedium from "../TextMedium";
import CircularBook from "../CircularBook";
import Alert from "../../Popups/Alert";
import Quantity from "../Quantity";
import TouchableHOC from "../../Components/TouchableHOC";
import ProductItem from "../ProductItem";
import { connect } from "react-redux";
import reduxProps from "../../WooCommerceWrapper/store/reduxProps";

class CartItem extends React.Component {
  state = {};
  _removeFromCart = (id) => {
    this.props.RemoveFromCart(id);
  };

  plus = () => {
    this.props.IncrementProduct(this.props.item.id, this.props.item.price);
  };
  minus = () => {
    this.props.DecrementProduct(this.props.item.id, this.props.item.price);
  };

  //calculating the quantity of product from cart array
  calculateQuantity = () => {
    let index = this.props.Reducer.cart.findIndex(
      (x) => x.product_id === this.props.item.id
    );
    return this.props.Reducer.cart[index].quantity;
    // const foundItem = this.props.Reducer.cart.find(val => {
    //   return val.product_id == this.props.item.id
    // })
    // return foundItem.quantity
    3;
  };

  render() {
    return (
      <View style={[styles.card, this.props.ConfigReducer.secondaryColor]}>
        {/* here checking if iamges exist or not */}
        {this.props.item.images && (
          <Image
            source={
              this.props.item.images.length == 0
                ? { uri: "https://via.placeholder.com/300/09f/fff.png" }
                : { uri: this.props.item.images[0].src }
            }
            style={styles.img}
            resizeMode="cover"
          />
        )}

        <View style={styles.details}>
          {this.props.cross ? null : (
            <TouchableHOC
              onPress={() => this._removeFromCart(this.props.item.id)}
              style={{ alignSelf: "flex-end" }}
            >
              <Image
                source={icons.crossBorder}
                style={styles.cross}
                resizeMode="contain"
              />
            </TouchableHOC>
          )}
          <TextMedium
            style={[styles.name, this.props.ConfigReducer.primaryColor]}
          >
            {this.props.item.name}
          </TextMedium>
          <View style={styles.priceContainer}>
            <CircularBook
              style={[
                styles.price,
                this.props.ConfigReducer.primary_font_color,
              ]}
            >
              $ {parseFloat(this.props.item.price).toFixed(2)}
            </CircularBook>

            {this.props.orderDetailCart ? (
              <View>
                <Text>Quantity :{this.props.item.quantity}</Text>
              </View>
            ) : (
              <Quantity
                minus={() => this.minus()}
                plus={() => this.plus()}
                size={vh * 2.5}
                quantity={this.calculateQuantity()}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps
)(CartItem);
