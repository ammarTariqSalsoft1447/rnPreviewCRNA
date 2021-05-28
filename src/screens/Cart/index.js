import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  ScrollView,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import Alert from '../../Popups/Alert';
import TextMedium from '../../Components/TextMedium';
import TouchableHOC from '../../Components/TouchableHOC';
import CircularBook from '../../Components/CircularBook';
import CartItem from '../../Components/CartItem';
import {connect} from 'react-redux';
import Toast from 'react-native-toast';
import reduxProps from '../../WooCommerceWrapper/store/reduxProps';
import Api from '../../WooCommerceWrapper/Api';
import {
  primary_font_color
} from '../../../config.json'

class Cart extends React.Component {
  state = {
    refreshing: false,
  };
  ß;
  checkout = () => {
    this.props.navigation.navigate('Checkout');
  };
  getProducts = () => {
    if (this.props.Reducer.cart.length > 0) {
      this.setState({
        refreshing: true,
        // cartProduct: this.props.Reducer.cartProduct,
      });

      this.props.CartProduct(
        this.props.Reducer.cart,
        (success) => {
          this.setState({
            refreshing: false,
          });
        },
        (error) => {
          this.setState({
            refreshing: false,
          });
        },
      );

      // var productsToFetch = [];
      // this.props.Reducer.cart.map((item) => {
      //   productsToFetch.push(item.product_id);
      // });
      // Api.get(
      //   `products`,
      //   {include: productsToFetch},
      //   (success) => {
      //     console.log('Api.get(`products` : ', success);
      //     this.setState({cartProduct: success, refreshing: false});
      //   },
      //   (e) => {
      //     console.log('Api.get(`products` e : ', e);
      //     this.setState({refreshing: false});
      //   },
      // );
    }
  };
  componentDidMount() {
    this.props.navigation.addListener('focus', this.getProducts);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus');
  }
  getSubTotal = () => {
    var total = 0;
    this.props.Reducer.cartProduct.map((item, index) => {
      total = total + item.price * this.props.Reducer.cart[index].quantity;
    });
    return total;
  };

  render() {
    var subTotal = this.getSubTotal();
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, paddingHorizontal: vw * 5, paddingTop: vh * 2}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.getProducts}
          />
        }>
        {this.props.Reducer.cart.length == 0 || this.state.refreshing ? (
          <View
            style={{
              height: 100 * vh,
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Text>
              {this.state.refreshing
                ? ' Getting Products '
                : 'Cart is empty! please add some products'}
            </Text>

            {this.state.refreshing === false && (
              <Button
                title="Shop More"
                onPress={() => this.props.navigation.navigate('Products')}
                btnContainer={{width: '41%'}}
              />
            )}
          </View>
        ) : (
          <>
            {this.props.Reducer.cartProduct.map((item, index) => (
              <CartItem item={item} />
            ))}

            <View style={styles.detailCont}>
              {/* <View style={styles.detailItem}>
                <CircularBook style={styles.detailTxt}>Sub Total</CircularBook>
                <CircularBook style={styles.detailTxt}>
                  ${this.props.Reducer.cartTotal.toFixed(2)}
                </CircularBook>
              </View> */}
              {/* <View style={styles.detailItem}>
                <CircularBook style={styles.detailTxt}>
                  Delivery Charges
                </CircularBook>
                <CircularBook style={styles.detailTxt}>$0</CircularBook>
              </View>
              <View style={styles.detailItem}>
                <CircularBook style={styles.detailTxt}>Tax</CircularBook>
                <CircularBook style={styles.detailTxt}>$0</CircularBook>
              </View>
              <View style={styles.detailItem}>
                <CircularBook style={styles.detailTxt}>Discount</CircularBook>
                <CircularBook style={styles.detailTxt}>$0</CircularBook>
              </View> */}
              <View
                style={[
                  styles.detailItem,
                  {borderBottomWidth: 0, marginBottom: 0},
                ]}>
                <CircularBook style={styles.detailTxt}>Total</CircularBook>
                <CircularBook style={styles.detailTxt}>
                  ${this.getSubTotal().toFixed(2)}
                </CircularBook>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh * 2,
                marginBottom: 4 * vh,
              }}>
              <Button
                title="Shop More"
                onPress={() => this.props.navigation.navigate('Products')}
                btnContainer={{width: '41%'}}
              />
              <Button
                title="Proceed To Checkout"
                onPress={() => this.checkout()}
                btnContainer={{width: '56%', backgroundColor: primary_font_color}}
              />
            </View>
          </>
        )}
      </ScrollView>
    );
  }
}

export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps,
)(Cart);
