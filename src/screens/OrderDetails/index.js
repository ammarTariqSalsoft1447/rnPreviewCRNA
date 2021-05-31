import React from "react";
import { View, RefreshControl } from "react-native";
import {
  backgrounds,
  assets,
  samplePictures,
  icons,
} from "../../assets/images";
import styles from "./styles";
import vh from "../../Units/vh";
import vw from "../../Units/vw";
import TextSemi from "../../Components/TextSemi";
import ImageButton from "../../Components/ImageButton";
import MainInput from "../../Components/MainInput";
import ChangePassword from "../../Popups/changePassword";
import Alert from "../../Popups/Alert";
import TextMedium from "../../Components/TextMedium";
import CircularBook from "../../Components/CircularBook";
import TouchableHOC from "../../Components/TouchableHOC";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import CartItem from "../../Components/CartItem";
import TextRegular from "../../Components/TextRegular";
import { connect } from "react-redux";
import moment from "moment";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast";
import reduxProps from "../../WooCommerceWrapper/store/reduxProps";
import { store } from "../../WooCommerceWrapper/store";
const state = store.getState();
const config = state.ConfigReducer;
const { primary_heading_color, primaryColor } = config;
class OrderDetails extends React.Component {
  state = {
    singleorderDetails: {},
    refreshing: false,
  };

  onCancelOrder = (id) => {
    this.props.CancelOrder(
      id,
      (Success) => {
        if (Success) {
          Toast.show("Order Cancelled successfully!");
          this.props.navigation.navigate("Home");
        }
      },
      (error) => {}
    );
  };

  _getSingleOrderDetails = () => {
    this.setState({
      refreshing: true,
    });

    this.props.SingleOrder(
      this.props.route.params.id,
      (Success) => {
        console.log("Success singleordrer", Success);
        this.setState({
          singleorderDetails: Success,
          refreshing: false,
        });
      },
      (error) => {
        Toast.show(error);
      }
    );
  };
  componentDidMount() {
    this.props.navigation.addListener("focus", this._getSingleOrderDetails);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener("focus");
  }

  state = { edit: true, current: 0 };
  render() {
    // console.log('this.state.singleorderDetails.status', this.state.singleorderDetails);
    // console.log('this.props.Reducer.userId', this.props.Reducer.userId);
    return (
      <ScrollView
        style={{ flex: 1, paddingHorizontal: vw * 4, paddingTop: vh * 2 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._getSingleOrderDetails}
          />
        }
      >
        {this.state.singleorderDetails == null ? null : (
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.orderRow}>
              <TextMedium
                style={[
                  styles.text,
                  {
                    color: this.props.ConfigReducer.primaryColor,
                  },
                ]}
              >
                Order # {this.state.singleorderDetails.number}
              </TextMedium>
              <TextMedium
                style={[
                  styles.text,
                  {
                    color: this.props.ConfigReducer.primaryColor,
                  },
                ]}
              >
                {moment(this.state.singleorderDetails.date_created).format(
                  "DD-MMM-YYYY"
                )}
              </TextMedium>
            </View>

            <Alert
              text="Cancel Order?"
              ref={(e) => (this.placeorder = e)}
              icon={icons.caution}
              onSuccess2={() => {}}
              onSuccess={(id) => this.onCancelOrder(id)}
              // onSuccess={() => { this.orderSuccess.show() }} //place order here, write function
            />
            {this.state.singleorderDetails.line_items.map((item) => (
              <CartItem item={item} cross={true} orderDetailCart={true} />
            ))}

            <View
              style={[
                styles.detailCont,
                {
                  backgroundColor: this.props.ConfigReducer.secondaryColor,
                },
              ]}
            >
              <View style={styles.detailItem}>
                <CircularBook
                  style={[
                    styles.detailTxt,
                    {
                      color: this.props.ConfigReducer.primaryColor,
                    },
                  ]}
                >
                  Sub Total
                </CircularBook>
                <CircularBook
                  style={[
                    styles.detailTxt,
                    {
                      color: this.props.ConfigReducer.primaryColor,
                    },
                  ]}
                >
                  ${this.state.singleorderDetails.total}
                </CircularBook>
              </View>
              <View style={styles.detailItem}>
                <CircularBook
                  style={[
                    styles.detailTxt,
                    {
                      color: this.props.ConfigReducer.primaryColor,
                    },
                  ]}
                >
                  Delivery Charges
                </CircularBook>
                <CircularBook
                  style={[
                    styles.detailTxt,
                    {
                      color: this.props.ConfigReducer.primaryColor,
                    },
                  ]}
                >
                  $0
                </CircularBook>
              </View>
              <View style={styles.detailItem}>
                <CircularBook
                  style={[
                    styles.detailTxt,
                    {
                      color: this.props.ConfigReducer.primaryColor,
                    },
                  ]}
                >
                  Tax
                </CircularBook>
                <CircularBook
                  style={[
                    styles.detailTxt,
                    {
                      color: this.props.ConfigReducer.primaryColor,
                    },
                  ]}
                >
                  $0
                </CircularBook>
              </View>
              <View style={styles.detailItem}>
                <CircularBook
                  style={[
                    styles.detailTxt,
                    {
                      color: this.props.ConfigReducer.primaryColor,
                    },
                  ]}
                >
                  Discount
                </CircularBook>
                <CircularBook
                  style={[
                    styles.detailTxt,
                    {
                      color: this.props.ConfigReducer.primaryColor,
                    },
                  ]}
                >
                  ${this.state.singleorderDetails.discount_total}
                </CircularBook>
              </View>
              <View style={[styles.detailItem]}>
                <CircularBook
                  style={[
                    styles.detailTxt,
                    {
                      color: this.props.ConfigReducer.primaryColor,
                    },
                  ]}
                >
                  Total
                </CircularBook>
                <CircularBook
                  style={[
                    styles.detailTxt,
                    {
                      color: this.props.ConfigReducer.primaryColor,
                    },
                  ]}
                >
                  ${this.state.singleorderDetails.total}
                </CircularBook>
              </View>
              <View style={[styles.detailItem]}>
                <CircularBook
                  style={[
                    styles.detailTxt,
                    {
                      color: this.props.ConfigReducer.primaryColor,
                    },
                  ]}
                >
                  Coupon Code
                </CircularBook>
                <CircularBook
                  style={[
                    styles.detailTxt,
                    {
                      color: this.props.ConfigReducer.primaryColor,
                    },
                  ]}
                >
                  --
                </CircularBook>
              </View>
              <View style={[styles.detailItem]}>
                <CircularBook
                  style={[
                    styles.detailTxt,
                    {
                      color: this.props.ConfigReducer.primaryColor,
                    },
                  ]}
                >
                  Payment Status
                </CircularBook>
                <CircularBook
                  style={[
                    styles.detailTxt,
                    {
                      color: this.props.ConfigReducer.primaryColor,
                    },
                  ]}
                >
                  {this.state.singleorderDetails.status}
                </CircularBook>
              </View>
              <View style={[styles.detailItem]}>
                <CircularBook
                  style={[
                    styles.detailTxt,
                    {
                      color: this.props.ConfigReducer.primaryColor,
                    },
                  ]}
                >
                  Payment Method
                </CircularBook>
                <CircularBook
                  style={[
                    styles.detailTxt,
                    {
                      color: this.props.ConfigReducer.primaryColor,
                    },
                  ]}
                >
                  {this.state.singleorderDetails.payment_method_title}
                </CircularBook>
              </View>
              <View style={[styles.detailItem, { borderBottomWidth: 0 }]}>
                <CircularBook
                  style={[
                    styles.detailTxt,
                    {
                      color: this.props.ConfigReducer.primaryColor,
                    },
                  ]}
                >
                  Order Status
                </CircularBook>
                <CircularBook
                  style={[
                    styles.detailTxt,
                    {
                      color: this.props.ConfigReducer.primaryColor,
                    },
                  ]}
                >
                  {this.state.singleorderDetails.status}
                </CircularBook>
              </View>
              <TextMedium
                style={{
                  color: this.props.ConfigReducer.primaryColor,
                  fontSize: vh * 2.2,
                  marginBottom: vh * 0.5,
                }}
              >
                ADDRESS DETAILS:
              </TextMedium>
              <TextRegular
                style={{
                  color: primary_heading_color,
                  fontSize: vh * 1.9,
                  marginBottom: vh * 2,
                }}
              >
                {this.state.singleorderDetails.billing.address_1}
              </TextRegular>
              <TextMedium
                style={{
                  color: this.props.ConfigReducer.primaryColor,
                  fontSize: vh * 2.2,
                  marginBottom: vh * 0.5,
                }}
              >
                ADDITIONAL NOTES:
              </TextMedium>
              <TextRegular
                style={{
                  color: primary_heading_color,
                  fontSize: vh * 1.9,
                  marginBottom: vh * 2,
                }}
              >
                {this.state.singleorderDetails.customer_note}
              </TextRegular>

              {this.state.singleorderDetails.status == "pending" &&
              this.props.Reducer.userId != null ? (
                <Button
                  title="Cancel Order"
                  onPress={() => {
                    this.placeorder.show(this.state.singleorderDetails.id);
                  }}
                />
              ) : null}
            </View>
          </KeyboardAwareScrollView>
        )}
      </ScrollView>
    );
  }
}

export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps
)(OrderDetails);
