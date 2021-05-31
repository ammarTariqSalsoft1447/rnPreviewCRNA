import React from "react";
import {
  View,
  ImageBackground,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  backgrounds,
  assets,
  icons,
  samplePictures,
} from "../../assets/images";
import styles from "./styles";
import vh from "../../Units/vh";
import vw from "../../Units/vw";
import TextSemi from "../../Components/TextSemi";
import CircularBold from "../../Components/CircularBold";
import CircularBook from "../../Components/CircularBook";
import MainInput from "../../Components/MainInput";
import CircleBtn from "../../Components/CircleBtn";
import Alert from "../../Popups/Alert";
import TextMedium from "../../Components/TextMedium";
import FilterDropdown from "../../Components/FilterDropdown";
import TouchableHOC from "../../Components/TouchableHOC";
import ProductItem from "../../Components/ProductItem";
import Button from "../../Components/Button";
import { connect } from "react-redux";
import DropDown from "../../Components/DropDown";
import { store } from "../../WooCommerceWrapper/store";
import Toast from "react-native-toast";
import reduxProps from "../../WooCommerceWrapper/store/reduxProps";

// const data = [{ image: samplePictures.prod1 }, { image: samplePictures.prod2 }, { image: samplePictures.prod1 }, { image: samplePictures.prod2 },
// { image: samplePictures.prod1 }, { image: samplePictures.prod2 }, { image: samplePictures.prod1 }, { image: samplePictures.prod2 }]
const data = [];
const state = store.getState();
const config = state.ConfigReducer;
const { primary_font_color, primaryColor, default_color } = config;
class Products extends React.Component {
  state = {
    activeSlide: 1,
    refreshing: false,
    page: 1,
    allproducts: [],
    filter: null,
  };
  _renderItem = (item, index) => {
    console.log("item :", item);
    return (
      <ProductItem
        item={item}
        onPress={(id) =>
          this.props.navigation.navigate("ProductDetail", {
            productID: id,
            imgSrc:
              item.item.images.length == 0 ? null : item.item.images[0].src,
          })
        }
      />
    );
  };
  footer = () => {
    return (
      <View>
        {this.state.refreshing || this.state.allproducts.length == 0 ? null : (
          <Button
            onPress={() =>
              this.setState({ page: this.state.page + 1 }, () =>
                this.getProducts()
              )
            }
            title="View More"
            btnContainer={{
              backgroundColor: this.props.ConfigReducer.primary_font_color,
              width: "30%",
              height: vh * 4,
              alignSelf: "flex-end",
              marginBottom: vh * 2,
            }}
          />
        )}
      </View>
    );
  };

  _onRefresh = (params = null) => {
    this.setState(
      {
        refreshing: true,
        allproducts: [],
      },
      () => {
        this.props.AllProduct(
          this.props.route.params?.categoryID ?? null,
          1,
          params,
          (success) => {
            this.setState({
              refreshing: false,
              allproducts: success,
            });
          },
          (error) => {}
        );
      }
    );
  };

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.getProducts();
    });
    this.props.navigation.addListener("blur", () => {
      this.setState({
        allproducts: [],
      });
    });
  }

  onSort = (data) => {
    this.setState({
      filter: data,
    });

    if (data.value == "on_sale") {
      let param = {
        featured: true,
      };
      this.getProducts(param);
    } else if (data.value == "asc" || data.value == "desc") {
      let param = {
        order: data.value,
      };

      this.getProducts(param);
    } else if (data.value == "date") {
      let param = {
        orderby: data.value,
      };

      this.getProducts(param);
    }
  };

  getProducts = (params = null) => {
    this.setState({
      refreshing: true,
      // allproducts: [],
    });
    this.props.AllProduct(
      this.props.route.params?.categoryID ?? null,
      this.state.page,
      params,
      (success) => {
        if (success.length === 0) {
          this.setState({
            refreshing: false,
          });
          Toast.show("No more products found");
        } else {
          if (this.state.page == 1) {
            this.setState({
              refreshing: false,
              allproducts: success,
            });
          } else {
            this.setState({
              refreshing: false,
              allproducts: [...this.state.allproducts, ...success],
            });
          }
        }
      },

      (err) => {}
    );
  };

  componentWillUnmount() {
    this.props.navigation.removeListener("focus");
    this.props.navigation.removeListener("blur");
  }

  onSelector = () => {
    let _options = [
      { label: "On Sale", value: "on_sale" },
      { label: "A to Z", value: "asc" },
      { label: "Z to A", value: "desc" },
      { label: "Newest", value: "date" },
    ];

    if (this.DropDownRef) {
      this.DropDownRef.show(
        "label",
        _options,
        "Sort by",
        (data) => this.onSort(data),
        null,
        null
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <DropDown ref={(_ref) => (this.DropDownRef = _ref)} />
        <View style={styles.header}>
          <View style={styles.headerInner}>
            <Image
              source={icons.sort}
              style={styles.sort}
              resizeMode="contain"
            />
            <TextMedium style={[styles.sortText,{
              color: this.props.ConfigReducer.primaryColor
            }]}>Sort By</TextMedium>
          </View>

          <TouchableOpacity
            style={{
              paddingHorizontal: 1 * vw,
              paddingVertical: 0.5 * vh,
              backgroundColor: this.props.ConfigReducer.default_color,
              borderRadius: 1 * vw,
            }}
            onPress={this.onSelector}
          >
            <TextSemi style={{ fontSize: vh * 2 }}>
              {this.state.filter?.label ?? "Latest"}
            </TextSemi>
          </TouchableOpacity>

          {/* <FilterDropdown
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
          // data={this.props.Reducer.allproduct}
          data={this.state.allproducts}
          style={styles.flatlist}
          renderItem={this._renderItem}
          numColumns={2}
          ListFooterComponent={this.footer}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this._onRefresh()}
              tintColor={this.props.ConfigReducer.primaryColor}
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
)(Products);
