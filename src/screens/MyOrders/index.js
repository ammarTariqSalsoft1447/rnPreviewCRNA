import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  LayoutAnimation,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {backgrounds, assets} from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import TextSemi from '../../Components/TextSemi';
import ImageButton from '../../Components/ImageButton';
import MainInput from '../../Components/MainInput';
import ChangePassword from '../../Popups/changePassword';
import Alert from '../../Popups/Alert';
import TextMedium from '../../Components/TextMedium';
import CircularBook from '../../Components/CircularBook';
import TouchableHOC from '../../Components/TouchableHOC';
import {FlatList, ScrollView, TextInput} from 'react-native-gesture-handler';
import CartItem from '../../Components/CartItem';
import {connect} from 'react-redux';
import moment from 'moment';
import reduxProps from '../../WooCommerceWrapper/store/reduxProps';

const All = [
  {status: 'Pending'},
  {status: 'Cancelled'},
  {status: 'Refund'},
  {status: 'Delivered'},
];
const Current = [
  {status: 'Pending'},
  {status: 'Pending'},
  {status: 'Pending'},
  {status: 'Pending'},
];
const Previous = [
  {status: 'Cancelled'},
  {status: 'Delivered'},
  {status: 'Cancelled'},
  {status: 'Delivered'},
];
class MyOrders extends React.Component {
  state = {edit: true, current: 0, refreshing: false};
  setType = (type) => {
    this.setState({current: type});
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };
  renderStatus = (status) => {
    switch (status) {
      case 'pending':
        return (
          <View style={styles.statusCont}>
            <TextMedium style={styles.statusTxt}>Pending</TextMedium>
          </View>
        );
        break;
      case 'cancelled':
        return (
          <View style={styles.statusCont}>
            <TextMedium style={styles.statusTxt}>Cancelled</TextMedium>
          </View>
        );
        break;
      case 'Refund':
        return (
          <View style={styles.statusCont}>
            <TextMedium style={styles.statusTxt}>Refund</TextMedium>
          </View>
        );
        break;
      case 'processing':
        return (
          <View style={[styles.statusCont, {backgroundColor: '#42C93E'}]}>
            <TextMedium style={styles.statusTxt}>Processing</TextMedium>
          </View>
        );
      case 'completed':
        return (
          <View style={[styles.statusCont, {backgroundColor: '#42C93E'}]}>
            <TextMedium style={styles.statusTxt}>Delivered</TextMedium>
          </View>
        );
        break;
    }
  };
  renderItem = ({item, index}) => {
    return (
      //    old <TouchableHOC style={styles.card} onPress={() => this.props.navigation.navigate("OrderDetails", { status: item.status })}>
      <TouchableHOC
        style={styles.card}
        onPress={() =>
          this.props.navigation.navigate('OrderDetails', {id: item.id})
        }>
        <View>
          <TextMedium style={styles.orderTxt}>Order # {item.id}</TextMedium>
          <TextMedium style={styles.orderTxt}>
            {moment(item.date_created).format('DD-MMM-YYYY')}
          </TextMedium>
          <TextMedium style={[styles.orderTxt, {marginBottom: 0}]}>
            {item.line_items.length} Items
          </TextMedium>
        </View>
        <View style={styles.priceCont}>
          {this.renderStatus(item.status)}
          <TextSemi style={styles.price}>${item.total}</TextSemi>
        </View>
      </TouchableHOC>
    );
  };
  renderData = () => {
    switch (this.state.current) {
      case 0:
        return this.props.Reducer.order;
        break;
      case 1:
        return this.props.Reducer.order.filter(
          (item) => item.status == 'pending',
        );
        break;
      case 2:
        return this.props.Reducer.order.filter(
          (item) => item.status == 'cancelled' || item.status == 'completed',
        );
        break;
    }
  };

  _onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.props.GetOrders(
      (complete) => {
        if (complete) {
          this.setState({
            refreshing: false,
          });
        }
      },
      this.props.Reducer.userId,
      1,
    );
  };

  _getOrders = () => {
    this.setState({
      refreshing: true,
    });
    this.props.GetOrders(
      (complete) => {
        if (complete) {
          this.setState({
            refreshing: false,
          });
        }
      },
      this.props.Reducer.userId,
      1,
    );
  };
  componentDidMount() {
    this.props.navigation.addListener('focus', this._getOrders);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus');
  }

  render() {
    return (
      <View style={{flex: 1, paddingHorizontal: vw * 5, paddingTop: vh * 4}}>
        {this.state.refreshing ? (
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                // onRefresh={this._onRefresh}
              />
            }>
            {/* <Text style={{alignSelf: 'center', justifyContent: 'center'}}>
              Geting Listings
            </Text> */}
          </ScrollView>
        ) : (
          <>
            <View style={styles.tabs}>
              <TouchableHOC
                onPress={() => this.setType(0)}
                style={[
                  styles.btn,
                  styles.borderLeft,
                  this.state.current == 0 ? styles.pinkBg : {},
                ]}>
                <TextMedium
                  style={[
                    styles.btnTxt,
                    this.state.current == 0 ? styles.whiteTxt : {},
                  ]}>
                  All
                </TextMedium>
              </TouchableHOC>
              <TouchableHOC
                onPress={() => this.setType(1)}
                style={[
                  styles.btn,
                  this.state.current == 1 ? styles.pinkBg : {},
                ]}>
                <TextMedium
                  style={[
                    styles.btnTxt,
                    this.state.current == 1 ? styles.whiteTxt : {},
                  ]}>
                  Current
                </TextMedium>
              </TouchableHOC>
              <TouchableHOC
                onPress={() => this.setType(2)}
                style={[
                  styles.btn,
                  styles.borderRight,
                  this.state.current == 2 ? styles.pinkBg : {},
                ]}>
                <TextMedium
                  style={[
                    styles.btnTxt,
                    this.state.current == 2 ? styles.whiteTxt : {},
                  ]}>
                  Previous
                </TextMedium>
              </TouchableHOC>
            </View>
            <FlatList
              data={this.renderData()}
              style={{paddingTop: vh * 3}}
              renderItem={this.renderItem}
              // renderItem={this.props.Reducer.order}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
            />
          </>
        )}
      </View>
    );
  }
}

export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps,
)(MyOrders);
