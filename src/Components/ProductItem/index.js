import React from "react";
import {
  Image,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import vw from "../../Units/vw";
import vh from "../../Units/vh";
import { Fonts } from "../../assets/fonts";
import { icons, samplePictures } from "../../assets/images/index";
import DropDownPicker from "react-native-dropdown-picker";
import TextMedium from "../TextMedium";
import CircularBook from "../CircularBook";
import Alert from "../../Popups/Alert";
import TouchableHOC from "../TouchableHOC";
import HTML from "react-native-render-html";
import reduxProps from "../../WooCommerceWrapper/store/reduxProps";
import { connect } from "react-redux";
import Toast from "react-native-toast";

// this.props.RemoveFromCart(id)
class ProductItem extends React.Component {
  state = {
    liked: this.props.Reducer.wishlist.find(
      (id) => id == this.props.item?.item.id
    )
      ? true
      : false,
  };

  handelSelect = (id) => {
    if (this.state.liked) {
      this.props.RemoveFromWishlist(id, (success) => {
        this.removeWishlist.show();
        this.props.onRerender(id);

        Toast.show(success);

        this.setState({ liked: false });
      });
    } else {
      this.props.AddtoWishlist(id, (success) => {
        this.wishlist.show();
        Toast.show(success);
        this.setState({ liked: true });
      });
    }
  };

  handleCartToggle = (isInCart) => {
    if (isInCart) {
      this.props.RemoveFromCart(this.props.item.item.id);
    } else {
      let Product = {
        product_id: this.props.item.item.id,
        quantity: 1,
      };
      this.props.AddToCart(
        Product,
        (success) => {
          if (success) {
            Toast.show("Added to cart");
            // this.success.show()
          }
        },
        (error) => {
          if (error) {
            Toast.show("Already in cart");
          }
        },
        this.props.item.item
      );
    }
  };
  render() {
    var isInCart = false;
    // if(this.props.item.item.id)
    var index = this.props.Reducer.cart.findIndex(
      (x) => x.product_id === this.props.item.item.id
    );
    if (index > -1) {
      isInCart = true;
    } else {
      isInCart = false;
    }

    let imageSrc = null;

    if (this.props.item.item && this.props.item.item.images) {
      if (this.props.item.item.images.length > 0) {
        imageSrc = this.props.item.item.images[0].src;
      }
    }

    return (
      <View
        style={[
          styles.prodCont,
          this.props.ConfigReducer.primaryColor,
          this.props.ConfigReducer.secondaryColor,
        ]}
      >
        <Alert
          text={"Product Added to\nWish List!"}
          ref={(e) => (this.wishlist = e)}
        />
        <Alert
          text={"Product has been removed\nfrom your Wish List."}
          onSuccess={() => {}}
          ref={(e) => (this.removeWishlist = e)}
        />

        <TouchableHOC
          style={styles.detailContainer}
          onPress={() => this.props.onPress(this.props.item.item.id)}
        >
          <ImageBackground
            source={imageSrc ? { uri: imageSrc } : samplePictures.prod1}
            style={styles.prodImg}
            imageStyle={styles.prodImg_1}
          ></ImageBackground>

          <TextMedium
            numberOfLines={1}
            style={[styles.prodName, this.props.ConfigReducer.primaryColor]}
          >
            {this.props.item.item.name}
          </TextMedium>
          {/* <CircularBook numberOfLines={2} style={styles.prodDetail}>{this.props.item.item.short_description}</CircularBook> */}

          <TextMedium
            numberOfLines={1}
            style={[
              styles.catName,
              this.props.ConfigReducer.drawer_inActive_Color,
            ]}
          >
            {this.props.item.item.categories.length == 0
              ? ""
              : this.props.item.item.categories[0].name}
          </TextMedium>
        </TouchableHOC>

        <View
          style={styles.actionCont}
          // onPress={() => this.handleCartToggle(isInCart)}
        >
          <CircularBook
            style={[styles.price, this.props.ConfigReducer.primary_font_color]}
          >
            {this.props.item.item.price ? (
              <Text>${this.props.item.item.price}</Text>
            ) : (
              <Text>$0.00</Text>
            )}
          </CircularBook>

          {this.props.item.item.price ? (
            <>
              {isInCart === false ? (
                <TouchableOpacity
                  onPress={() => this.handleCartToggle(isInCart)}
                >
                  <Image
                    source={icons.cart}
                    style={styles.cart}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.handleCartToggle(isInCart)}
                >
                  <Image
                    source={icons.filledCart}
                    style={styles.cart}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </>
          ) : null}
        </View>

        <TouchableHOC
          style={{ alignSelf: "flex-end", zIndex: 9999, position: "absolute" }}
          onPress={() => this.handelSelect(this.props.item.item.id)}
        >
          <Image
            source={this.state.liked ? icons.heartFill : icons.heart}
            style={styles.heart}
            resizeMode="contain"
          />
        </TouchableHOC>
      </View>
    );
  }
}
export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps
)(ProductItem);
