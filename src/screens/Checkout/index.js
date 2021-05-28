import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  TextInput,
  LayoutAnimation,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { icons } from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import Alert from '../../Popups/Alert';
import TextMedium from '../../Components/TextMedium';
import TextSemi from '../../Components/TextSemi';
import TouchableHOC from '../../Components/TouchableHOC';
import FilterDropdown from '../../Components/FilterDropdown';
import CircularBook from '../../Components/CircularBook';
import CartItem from '../../Components/CartItem';
import MainInput from '../../Components/MainInput';
import Button from '../../Components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextRegular from '../../Components/TextRegular';
import Payment from '../../Popups/Payment';
import { connect } from 'react-redux';
import Toast from 'react-native-toast';
import DropDown from '../../Components/DropDown';
import {
  primary_font_color,
  secondaryColor,
  primaryColor,
  default_color
} from '../../../config.json'
import reduxProps from '../../WooCommerceWrapper/store/reduxProps';

class Checkout extends React.Component {
  state = {
    step: 1,
    filter: {},
    discount: false,
    user: true,
    Address: '',
    coupon: '',
    visible: true,
    customer_note: '',

    first_name: '',
    last_name: '',
    address_1: '',
    email: '',
    phone: '',
  };
  userfields = () => {
    if (this.props.Reducer.userId == null) {
      return (
        <View style={styles.userInputs}>
          <MainInput
            placeholder="First Name"
            style={styles.userinput}
            value={this.state.first_name}
            onChangeText={(text) => this.setState({ first_name: text })}
          />
          <MainInput
            placeholder="Last Name"
            style={styles.userinput}
            value={this.state.last_name}
            onChangeText={(text) => this.setState({ last_name: text })}
          />
          <MainInput
            placeholder="Email Address"
            style={styles.userinput}
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
            keyboardType="email-address"
          />
          <MainInput
            placeholder="phone #"
            keyboardType="phone-pad"
            style={styles.userinput}
            value={this.state.phone}
            onChangeText={(text) => this.setState({ phone: text })}
          />
        </View>
      );
    } else {
      return null;
    }
  };
  signupMessage = () => {
    if (this.props.Reducer.userId == null) {
      return (
        <View style={styles.signupRow}>
          <TextMedium style={styles.newhere}>New Here?</TextMedium>
          <TouchableHOC
            onPress={() => this.props.navigation.navigate('SignUp')}>
            <TextMedium style={styles.signup}>Sign Up</TextMedium>
          </TouchableHOC>
        </View>
      );
    } else {
      return null

    }
  };
  calculateTotalAmount = () => {
    let total = 0,
      subTotal = 0,
      discount = 0;

    if (this.props.Reducer.coupon) {
      discount = this.props.Reducer.coupon[0]?.amount ?? 0;
    }

    subTotal = this.getSubTotal();
    total = parseFloat(subTotal) - parseFloat(discount);

    return parseFloat(total).toFixed(2);
  };

  onOkPress = (id) => {
    this.props.navigation.popToTop();
    this.props.navigation.navigate('OrderDetails', { id: id });
  };

  //calcualting coupon
  calculateCoupon = () => {
    if (this.state.coupon) {
      this.setState({
        visible: false,
      });

      this.props.VarifyCoupon(
        this.state.coupon,
        (success) => {
          if (success === undefined || success.length == 0) {
            Toast.show('Invalid Coupon');

            this.setState({
              visible: true,
            });
          } else {
            this.setState({
              visible: true,
            });
          }
        },
        (error) => { },
      );
      // this.props.SingleCoupon()
    } else {
      Toast.show('Please add coupon first');
    }
  };
  _removeCoupon = () => {
    this.props.EmptyCoupon();

    this.setState({
      coupon: '',
    });
  };

  onContinue = () => {
    console.log('continue', this.props.Reducer.cartDetail);
    if (this.props.Reducer.userId == null) {
      if (!this.state.first_name) {
        return Toast.show('First name is required');
      }
      if (!this.state.last_name) {
        return Toast.show('Last name is required');
      }
      if (!this.state.email) {
        return Toast.show('Email is required');
      }
      if (!this.state.phone) {
        return Toast.show('Phone no is required');
      }

      if (!this.state.address_1) {
        return Toast.show('Billing Address required');
      }
      if (!this.props.Reducer.cartDetail.payment_method) {
        return Toast.show('Payment Method required');
      }

      this.props.ManageCart(
        'BILLING_VIEW',
        {
          anonymous: true,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          phone: this.state.phone,
          email: this.state.email,
          address: this.state.address_1,
          customer_note: this.state.customer_note,
        },
        (success) => { },
        (error) => { },
      );

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ step: 2 });
    } else {
      if (!this.state.address_1) {
        return Toast.show('Billing Address required');
      }
      if (!this.props.Reducer.cartDetail.payment_method) {
        return Toast.show('Payment Method required');
      }

      this.props.ManageCart(
        'BILLING_VIEW',
        {
          anonymous: false,
          address: this.state.address_1,
          customer_note: this.state.customer_note,
        },
        (success) => { },
        (error) => { },
      );

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ step: 2 });
    }

    // this.props.ManageCart('PAYMENT_VIEW', this.state.paymentData, (success) => {

    // }, (error) => { })

    //  onPress={() => { LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); this.setState({ step: 2 }) } }
  };

  onplaceorder = () => {
    this.props.ManageCart(
      'PRODUCT_VIEW',
      (success) => { },
      (error) => { },
    );

    // this.props.ManageCart('BILLING_VIEW', this.props.Reducer.userInfo, (success) => { }, (error) => { })
    console.log('cartDetail', {
      ...this.props.Reducer.cartDetail,
      set_paid: true,
    });
    this.props.ManageCart(
      'CONFIRM_VIEW',
      { ...this.props.Reducer.cartDetail, set_paid: true },
      (success) => {
        // console.log('anony mous order succes ::', success);

        if (success) {
          Toast.show('Order Placed Successfully');
          this.paymentSuccess.show(success.id);
          //    this.props.navigation.navigate('OrderDetails',{id:success.id})
        }
      },
      (error) => { },
    );
    //    this.props.ManageCart('PRODUCT_VIEW',(success) =>{},(error) =>{})
  };

  getSubTotal = () => {
    var total = 0;
    this.props.Reducer.cartProduct.map((item, index) => {
      total = total + item.price * this.props.Reducer.cart[index].quantity;
    });
    return total;
  };
  _onDone = (data) => {
    console.log(data, 'payment data');
    this.setState({
      filter: data,
    });

    this.props.ManageCart(
      'PAYMENT_VIEW',
      data,
      (success) => { },
      (error) => { },
    );
  };
  _onPlaceOrder = () => {

    if (this.state.filter) {
      if (this.state.filter.label == 'Credit Cards') {
        this.CardPayment.show();

      } else {
        this.props.ManageCart(
          'PAYMENT_VIEW',
          { label: 'Cash on delivery', value: 'cod' },
          (success) => {
            this.onplaceorder();
          },
          (error) => { },
        );
      }

    } else {
      Toast.show('Please Select payment method')


    }




  };


  _selectMethod = (item) => {


    if (this.DropDownRef) {
      this.DropDownRef.show(
        'label',
        this.props.Reducer.paymentmethods,
        'Select payment method',
        (data) => this._onDone(data),
        null,
        null,
      );
    }
  };

  renderBody = () => {
    switch (this.state.step) {
      case 1:
        return (
          <View style={{ paddingHorizontal: vw * 5 }}>
            {this.userfields()}
            <TextMedium style={styles.label}>Enter Your Address</TextMedium>
            <MainInput
              placeholder="Enter Your Address Here"
              style={styles.txtArea}
              value={this.state.address_1}
              onChangeText={(text) => this.setState({ address_1: text })}
            />

            <TextMedium style={styles.label}>Additional Notes</TextMedium>

            <MainInput
              placeholder="Enter Your Additional Notes Here"
              style={styles.txtArea}
              value={this.state.customer_note}
              onChangeText={(text) => this.setState({ customer_note: text })}
            />

            <View style={styles.paymentRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={icons.card}
                  style={styles.card}
                  resizeMode="contain"
                />
                <TextMedium style={styles.methodHeading}>
                  Payment Method
                </TextMedium>
              </View>

              {this.props.Reducer.paymentmethods && (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 1 * vw,
                    paddingVertical: 0.5 * vh,
                    backgroundColor: default_color,
                    borderRadius: 1 * vw,
                  }}
                  onPress={this._selectMethod}>
                  <TextSemi style={{ fontSize: vh * 2 }}>
                    {this.state.filter?.label ?? 'Select'}
                  </TextSemi>
                </TouchableOpacity>

                //  <FilterDropdown
                //     containerStyle={{height: vh * 3.9}}
                //     items={this.props.Reducer.paymentmethods}
                //     placeholder={
                //       this.props.Reducer.cartDetail.payment_method_title ??
                //       'Select'
                //     }
                //     onChangeItem={() =>
                //       this._selectMethod(this.props.Reducer.paymentmethods)
                //     }
                //   />
              )}
            </View>
            {this.signupMessage()}
          </View>
        );
        break;
      case 2:
        let discount = 0;

        if (this.props.Reducer.coupon) {
          discount = this.props.Reducer.coupon[0]?.amount ?? 0;
        }

        return (
          <View style={{ paddingHorizontal: vw * 5, paddingTop: vh * 2 }}>
            {this.props.Reducer.cartProduct.map((item, index) => (
              <CartItem item={item} />
            ))}

            {this.props.Reducer.cartProduct.length > 0 && (
              <View style={styles.detailCont}>
                <View style={styles.detailItem}>
                  <CircularBook style={styles.detailTxt}>
                    Sub Total
                  </CircularBook>
                  <CircularBook style={styles.detailTxt}>
                    ${this.getSubTotal().toFixed(2)}
                  </CircularBook>
                </View>
                <View style={styles.detailItem}>
                  <CircularBook style={styles.detailTxt}>Discount</CircularBook>
                  <CircularBook style={styles.detailTxt}>
                    ${parseFloat(discount).toFixed(2)}
                  </CircularBook>
                </View>
                <View style={[styles.detailItem]}>
                  <CircularBook style={styles.detailTxt}>Total</CircularBook>
                  <CircularBook style={styles.detailTxt}>
                    ${this.calculateTotalAmount()}
                  </CircularBook>
                </View>

                <View style={[styles.detailItem, { borderBottomWidth: 0 }]}>
                  <CircularBook style={styles.detailTxt}>
                    Promocode
                  </CircularBook>
                  {this.props.Reducer.coupon ? (
                    <View>
                      <View style={styles.trashContainer}>
                        <TextSemi style={styles.promoCode}>
                          {this.state.coupon}
                        </TextSemi>

                        {/* <TouchableHOC onPress={() => this.setState({ discount: false })}>
                                            <Image source={icons.trash} style={styles.trash} resizeMode="contain" />
                                        </TouchableHOC> */}

                        <TouchableHOC onPress={() => this._removeCoupon()}>
                          <Image
                            source={icons.trash}
                            style={styles.trash}
                            resizeMode="contain"
                          />
                        </TouchableHOC>
                      </View>
                      <TextRegular style={styles.promoSucess}>
                        Promocode applied successfully
                      </TextRegular>
                    </View>
                  ) : this.state.visible ? (
                    <View style={styles.promoRow}>
                      <TextInput
                        value={this.state.coupon}
                        onChangeText={(text) => this.setState({ coupon: text })}
                        placeholder=""
                        style={styles.input}
                      />
                      {/* old */}
                      {/*  */}
                      {/* <TouchableHOC onPress={() => this.enterCode.show()}>
                      <Image source={icons.arrowBlue} style={styles.arrowBlue} resizeMode="contain" />
                     </TouchableHOC> */}

                      <TouchableHOC onPress={() => this.calculateCoupon()}>
                        <Image
                          source={icons.arrowBlue}
                          style={styles.arrowBlue}
                          resizeMode="contain"
                        />
                      </TouchableHOC>
                    </View>
                  ) : (
                        <ActivityIndicator size="small" color="black" />
                      )}
                </View>
              </View>
            )}

            {this.signupMessage()}
          </View>
        );
        break;
    }
  };

  renderButtons = () => {
    switch (this.state.step) {
      case 1:
        return (
          <View style={styles.btnContainer}>
            <Button title="Go To Cart" btnContainer={{ width: '45%' }} />

            <Button
              title="Continue"
              onPress={() => {
                this.onContinue();
              }}
              btnContainer={{ width: '45%', backgroundColor: primary_font_color }}
            />
          </View>
        );
        break;
      case 2:
        return (
          <View style={styles.btnContainer}>
            <Button title="Go To Cart" btnContainer={{ width: '47%' }} />
            {this.props.Reducer.cartProduct.length > 0 && (
              <Button
                title="Place Order"
                onPress={() => this._onPlaceOrder()}
                btnContainer={{ width: '47%', backgroundColor: primary_font_color }}
              />
            )}
          </View>
        );
        break;
    }
  };
  render() {
    return (
      <View style={{ flex: 1, paddingTop: vh * 2 }}>
        <DropDown ref={(_ref) => (this.DropDownRef = _ref)} />
        <Payment
          ref={(e) => (this.payment = e)}
          onSuccess={() => this.paymentSuccess.show()}
        />

        <Alert
          text="Invalid Coupon Code"
          btntxt="ENTER AGAIN"
          ref={(e) => (this.enterCode = e)}
          icon={icons.caution}
          // onSuccess2={() => { }}
          onSuccess={() => {
            this.setState({ discount: true });
          }}
        />

        <Alert
          text={'There was some error with\nyour payment'}
          icon={icons.crossCircle}
          ref={(e) => (this.paymentFail = e)}
          onSuccess={() => this.orderSuccess.show()}
        />

        <Alert
          text={'Your Order Has Been Placed'}
          ref={(e) => (this.paymentSuccess = e)}
          //    old onSuccess={() => this.paymentFail.show()} // on ok press

          onSuccess={(id) => this.onOkPress(id)}
        />
        <Alert
          text={'Your Order Has Been\nPlacedSuccessfully'}
          ref={(e) => (this.orderSuccess = e)}
          onSuccess={() => {
            this.state.user == false
              ? this.props.navigation.navigate('Home')
              : this.setState({ step: 1, user: false, discount: false });
          }}
        />

        {/* <Alert text="Place Order?"
                    ref={e => this.placeorder = e}
                    icon={icons.caution}
                    onSuccess2={() => { }}
                    onSuccess={() => { this.payment.show() }}
                /> */}

        {/* //working on cash on delivery order */}
        <Alert
          text="Place Order?"
          ref={(e) => (this.placeorder = e)}
          icon={icons.caution}
          onSuccess2={() => { }}
          onSuccess={() => this.onplaceorder()}
        // onSuccess={() => { this.orderSuccess.show() }} //place order here, write function
        />

        <Payment
          ref={(e) => (this.CardPayment = e)}
          total={this.calculateTotalAmount()}
          onSuccess={this.onplaceorder}
        />

        <View style={styles.OptionsContainer}>
          <View
            style={[
              styles.option1,
              { backgroundColor: this.state.step == 1 ? primary_font_color : secondaryColor },
            ]}>
            <TextMedium
              style={
                this.state.step == 1 ? styles.optionTxt1 : styles.optionTxt2
              }>
              Personal Details
            </TextMedium>
          </View>
          <View
            style={[
              styles.option2,
              { backgroundColor: this.state.step == 2 ? primary_font_color : secondaryColor },
            ]}>
            <TextMedium
              style={
                this.state.step == 2 ? styles.optionTxt1 : styles.optionTxt2
              }>
              Place Order
            </TextMedium>
          </View>
        </View>
        <KeyboardAwareScrollView>
          {this.renderBody()}
          {this.renderButtons()}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps,
)(Checkout);
