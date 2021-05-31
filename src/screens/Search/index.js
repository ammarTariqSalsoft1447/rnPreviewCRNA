import React from "react";
import {
  View,
  ImageBackground,
  Image,
  Text,
  TextInput,
  FlatList,
  RefreshControl,
} from "react-native";
import { backgrounds, assets } from "../../assets/images";
import styles from "./styles";
import vh from "../../Units/vh";
import vw from "../../Units/vw";
import ProductItem from "../../Components/ProductItem";
import TextRegular from "../../Components/TextRegular";
import PlayBold from "../../Components/PlayBold";
import MainInput from "../../Components/MainInput";
import CircleBtn from "../../Components/CircleBtn";
import Alert from "../../Popups/Alert";
import TextMedium from "../../Components/TextMedium";
import TouchableHOC from "../../Components/TouchableHOC";
import { connect } from "react-redux";
import reduxProps from "../../WooCommerceWrapper/store/reduxProps";

import { store } from "../../WooCommerceWrapper/store";
const state = store.getState();
const config = state.ConfigReducer;
const { secondary_font_color, primary_placeholder_Color } = config;
class Search extends React.Component {
  state = {
    searchProduct: "",
    searchedProducts: [],
  };
  _renderItem = (item, index) => {
    return (
      <ProductItem
        item={item}
        onPress={(id) =>
          this.props.navigation.navigate("ProductDetail", { productID: id })
        }
      />
    );
  };

  _onSearch = () => {
    let params = {
      search: this.state.searchProduct,
    };
    this.setState({
      refreshing: true,
    });

    this.props.SearchList(
      this.state.searchProduct,
      (success) => {
        this.setState({
          refreshing: false,
          searchedProducts: success,
        });
      },
      (err) => {}
    );
  };
  render() {
    return (
      <View style={{ flex: 1, paddingHorizontal: vw * 5 }}>
        <View style={styles.searchbar}>
          <TextInput
            placeholder="Search Products"
            placeholderTextColor={primary_placeholder_Color}
            selectionColor={secondary_font_color}
            style={styles.input}
            value={this.state.searchProduct}
            autoCorrect={false}
            onChangeText={(text) => {
              this.setState({ searchProduct: text }, () => {
                this._onSearch();
              });
            }}
          />
          <TouchableHOC onPress={() => this._onSearch()}>
            <Image
              source={assets.search}
              style={styles.search}
              resizeMode="contain"
            />
          </TouchableHOC>
        </View>

        <FlatList
          data={this.state.searchedProducts}
          style={styles.flatlist}
          renderItem={this._renderItem}
          numColumns={2}
          ListFooterComponent={this.footer}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              // onRefresh={() => this._onRefresh()}
              tintColor="black"
              colors={["black"]}
            />
          }
        />
      </View>
    );
  }
}

export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps
)(Search);
