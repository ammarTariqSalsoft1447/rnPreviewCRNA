import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import {backgrounds, assets, icons, samplePictures} from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import DropDown from '../../Components/DropDown';
import TextSemi from '../../Components/TextSemi';
import CircularBook from '../../Components/CircularBook';
import MainInput from '../../Components/MainInput';
import CircleBtn from '../../Components/CircleBtn';
import Alert from '../../Popups/Alert';
import TextMedium from '../../Components/TextMedium';
import FilterDropdown from '../../Components/FilterDropdown';
import TouchableHOC from '../../Components/TouchableHOC';
import ProductItem from '../../Components/ProductItem';
import {connect} from 'react-redux';

import reduxProps from '../../WooCommerceWrapper/store/reduxProps';
import Toast from 'react-native-toast';
import {
  drawer_inActive_Color,
  default_color
} from '../../../config.json'
const data = [
  {image: samplePictures.prod1},
  {image: samplePictures.prod2},
  {image: samplePictures.prod1},
  {image: samplePictures.prod2},
  {image: samplePictures.prod1},
  {image: samplePictures.prod2},
  {image: samplePictures.prod1},
  {image: samplePictures.prod2},
];
class Products extends React.Component {
  state = {
    allproduct: [],
    refreshing: false,
    filter: null,
  };
  _renderItem = (item, index) => {
    return (
      <ProductItem
        item={item}
        onRerender={(id) => this.check(id)}
        onPress={() =>
          this.props.navigation.navigate('ProductDetail', {
            productID: item.item.id,
            imgSrc: item.item.images[0].src,
          })
        }
        selected={true}
      />
    );
  };
  check = (id) => {
    const array = this.state.allproduct.filter(function (obj) {
      return obj.id != id;
    });
    this.setState({
      allproduct: array,
    });
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this._getWishList();
    });
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus');
  }

  onSort = (data) => {
    this.setState({
      filter: data,
    });
    if (data.value == 'on_sale') {
      let param = {
        on_sale: true,
      };

      this._getWishList(param);
    } else if (data.value == 'asc' || data.value == 'desc') {
      let param = {
        order: data.value,
      };

      this._getWishList(param);
    } else if (data.value == 'date') {
      let param = {
        orderby: data.value,
      };

      this._getWishList(param);
    }
  };

  onEmptyShow = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        {this.state.refreshing ? null : (
          <Text style={{color: drawer_inActive_Color}}>No Item in the Wishlsit</Text>
        )}
      </View>
    );
  };

  _getWishList = (params = null) => {
    //  alert('ok')
    if (this.props.Reducer.wishlist.length > 0) {
      this.setState({
        refreshing: true,
      });
      this.props.wishlistAPI(
        this.props.Reducer.wishlist,
        params,
        (success) => {
          if (params) {
            if (success.length <= 0) {
              return Toast.show('No products found for this filer');
            } else {
              this.setState({
                allproduct: success,
                refreshing: false,
              });
            }
          } else {
            this.setState({
              allproduct: success,
              refreshing: false,
            });
          }
        },
        (error) => {},
      );
    } else {
      Toast.show('No Item in the Wishlsit');
    }
  };

  onSelector = () => {
    let _options = [
      {label: 'On Sale', value: 'on_sale'},
      {label: 'A to Z', value: 'asc'},
      {label: 'Z to A', value: 'desc'},
      {label: 'Newest', value: 'date'},
    ];

    if (this.DropDownRef) {
      this.DropDownRef.show(
        'label',
        _options,
        'Select a variation',
        (data) => this.onSort(data),
        null,
        null,
      );
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <DropDown ref={(_ref) => (this.DropDownRef = _ref)} />
        <View style={styles.header}>
          <View style={styles.headerInner}>
            <Image
              source={icons.sort}
              style={styles.sort}
              resizeMode="contain"
            />
            <TextMedium style={styles.sortText}>Sort By</TextMedium>
          </View>

          <TouchableOpacity
            style={{
              paddingHorizontal: 1 * vw,
              paddingVertical: 0.5 * vh,
              backgroundColor: default_color,
              borderRadius: 1 * vw,
            }}
            onPress={this.onSelector}>
            <TextSemi style={{fontSize: vh * 2}}>
              {this.state.filter?.label ?? 'Latest'}
            </TextSemi>
          </TouchableOpacity>

          {/* 
          <FilterDropdown
            onChangeItem={this.onSort}
            items={[
              {label: 'On Sale', value: 'on_sale'},
              {label: 'A to Z', value: 'asc'},
              {label: 'Z to A', value: 'desc'},
              {label: 'Newest', value: 'date'},
            ]}
          /> */}
        </View>
        <FlatList
          data={this.state.allproduct}
          style={styles.flatlist}
          renderItem={this._renderItem}
          numColumns={2}
          ListEmptyComponent={() => this.onEmptyShow()}
          refreshControl={<RefreshControl refreshing={this.state.refreshing} />}
        />
      </View>
    );
  }
}

export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps,
)(Products);
