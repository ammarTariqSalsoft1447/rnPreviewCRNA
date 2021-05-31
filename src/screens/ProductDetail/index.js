import React from "react";
import {
  View,
  ImageBackground,
  Image,
  FlatList,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import images, {
  backgrounds,
  assets,
  icons,
  samplePictures,
} from "../../assets/images";
import styles from "./styles";
import vh from "../../Units/vh";
import vw from "../../Units/vw";
import TextRegular from "../../Components/TextRegular";
import FilterDropdown from "../../Components/FilterDropdown";
import TextSemi from "../../Components/TextSemi";
import CircularBook from "../../Components/CircularBook";

import TextMedium from "../../Components/TextMedium";
import Quantity from "../../Components/Quantity";
import ImageButton from "../../Components/ImageButton";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Button from "../../Components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ProductItem from "../../Components/ProductItem";
import StarRating from "react-native-star-rating";
import Feedback from "../../Popups/Feedback";
import Alert from "../../Popups/Alert";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import HTML from "react-native-render-html";
import Toast from "react-native-toast";
import DropDown from "../../Components/DropDown";
import reduxProps from "../../WooCommerceWrapper/store/reduxProps";
import ImagePreview from "../../Popups/ImagePreview";

import TouchableHOC from "../../Components/TouchableHOC";

import { store } from "../../WooCommerceWrapper/store";
const state = store.getState();
const config = state.ConfigReducer;
const { primary_font_color, primaryColor } = config;
const features = [
  { text: "Fashionable For any wardrobe" },
  { text: "It has two-sided pockets" },
  { text: "Suitable for lounging work or on the go" },
];

const dummayImage = [
  { image: "https://pesmcopt.com/admin-media/images/dummy-product-image.jpg" },
];
class ProductDetail extends React.Component {
  state = {
    activeSlide: 0,
    singleProductDetails: [],
    quantity: 1,
    refreshing: false,
    variationList: [],
    variationFlag: false,
    variationProduct: null,
  };

  _renderRelatedItem = (item, index) => {
    return (
      <ProductItem
        item={item}
        onPress={(id) =>
          this.props.navigation.push("ProductDetail", { productID: id })
        }
      />
    );
  };
  _renderItem = (item) => {
    //render carousel image

    return (
      <TouchableOpacity onPress={() => this.imagepreview.show(item.item.src)}>
        <Image
          source={{ uri: item.item.src }}
          style={{ width: "100%", height: vh * 25 }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };
  addToCart = () => {
    const { id } = this.state.singleProductDetails;

    this.checkVariations();

    let data = null;
    if (this.state.variationFlag) data = this.state.variationProduct;
    else data = this.state.singleProductDetails;

    let tempFlag = false;
    if (this.state.singleProductDetails.attributes.length > 0) {
      this.state.singleProductDetails.attributes.map((val) => {
        if (tempFlag) {
          return;
        }

        if (val.variation) {
          if (this.state.variationList.length <= 0) {
            tempFlag = true;
            return Toast.show("Please select variations");
          }

          if (!this.state.variationFlag) {
            tempFlag = true;
            return Toast.show("Cannot avail these variations, select other !");
          }
        }
      });
    }

    if (tempFlag == false) {
      let Product;

      if (this.state.variationFlag) {
        Product = {
          product_id: id,
          variation_id: data.id,
          quantity: this.state.quantity,
        };

        this.props.AddVariation(this.state.variationProduct);
      } else {
        Product = {
          product_id: id,
          quantity: this.state.quantity,
        };
      }

      console.log(
        "this.props.Reducer.addedVariation ",
        this.props.Reducer.addedVariation,
        this.props.Reducer
      );

      this.props.AddToCart(
        Product,
        (success) => {
          if (success) {
            Toast.show("Added to cart");
            this.success.show();
          }
        },
        (error) => {
          if (error) {
            Toast.show("Already in cart");
          }
        },
        this.state.singleProductDetails
      );
    }
  };
  plus = () => {
    this.setState({
      quantity: this.state.quantity + 1,
    });
  };
  minus = () => {
    if (this.state.quantity > 1) {
      this.setState({
        quantity: this.state.quantity - 1,
      });
    }
  };

  _onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    const { productID } = this.props.route.params;
    this.props.SingleProduct(
      productID,
      (success) => {
        this.setState({
          singleProductDetails: success,
          refreshing: false,
        });
      },
      () => {}
    );
  };

  componentDidMount() {
    this.setState({
      refreshing: true,
    });
    const { productID } = this.props.route.params;
    this.props.navigation.addListener(
      "focus",
      () => {
        this.props.SingleProduct(
          productID,
          (success) => {
            this.props.GetVariations(
              productID,
              (done) => {
                this.setState({
                  singleProductDetails: success,
                  refreshing: false,
                });
              },
              (failed) => {
                this.setState({
                  singleProductDetails: success,
                  refreshing: false,
                });
              }
            );
          },
          (fail) => {}
        );
      },
      () => {}
    );

    // this.props.navigation.addListener('blur', () => {
    //   console.log('In blur');
    //   this.props.EmptyVariations();
    // });
  }

  componentWillUnmount() {
    this.props.navigation.removeListener("focus");
    // this.props.navigation.removeListener('blur');
  }

  _onVariationDropDown = (_options, name) => {
    if (this.DropDownRef) {
      this.DropDownRef.show(
        "title",
        _options,
        "Select a variation",
        (data) => this.handleVariations(data.title, name),
        null,
        null
      );
    }
  };

  handleVariations = (option, name) => {
    requestAnimationFrame(() => {
      let key_list = Object.keys(this.state.variationList);

      if (key_list) {
        if (option === this.state.variationList[name]) {
          delete this.state.variationList[name];
          this.setState(
            (p) => ({
              variationList: {
                ...p.variationList,
              },
              check: true,
            }),
            this.checkVariations
          );
          // setTimeout(() => this.checkVariations(), 400)
        } else {
          this.setState(
            (p) => ({
              variationList: {
                ...p.variationList,
                [name]: option,
              },
              check: false,
            }),
            this.checkVariations
          );
        }
      } else {
        this.setState({
          variationList: [...this.state.variationList, { [name]: option }],
          check: false,
        });
      }
    });
  };

  checkVariations = () => {
    // console.log(this.props.Reducer.productVariation);

    if (
      this.props.Reducer.productVariation &&
      this.props.Reducer.productVariation.length > 0
    ) {
      this.props.Reducer.productVariation.map((val, ind) => {
        let check = false;

        val.attributes.map((value, index) => {
          if (value.option === this.state.variationList[value.name]) {
            check = true;
          }

          if (check === true && val.attributes.length == index + 1) {
            this.setState({ variationFlag: true, variationProduct: val });
          }
        });
      });
    }
  };

  _renderVariations = () => {
    if (
      this.state.singleProductDetails &&
      this.state.singleProductDetails.attributes
    ) {
      return this.state.singleProductDetails.attributes.map((value, index) => {
        if (value.variation) {
          let _options;

          if (value.options) {
            _options = value.options.map((_opt, index) => {
              return {
                title: _opt,
                index,
              };
            });
          }

          return (
            <View style={[styles.row, { elevation: 10, marginTop: vh * 3 }]}>
              {value.options.length === 0 ? null : (
                <>
                  <TextSemi style={{ fontSize: vh * 2 }}>{value.name}</TextSemi>
                  <TouchableOpacity
                    onPress={() =>
                      this._onVariationDropDown(_options, value.name)
                    }
                  >
                    <TextSemi style={{ fontSize: vh * 2 }}>
                      {this.state.variationList[value.name] ??
                        "Select variation"}
                    </TextSemi>
                  </TouchableOpacity>
                </>
              )}

              {/* <FilterDropdown placeholder="Select" items={_options} /> */}
            </View>
          );
        }
      });
    }
  };

  render() {
    console.log(
      "this.state.singleProductDetails",
      this.state.singleProductDetails
    );

    let data = null;
    if (this.state.variationFlag) data = this.state.variationProduct;
    else data = this.state.singleProductDetails;

    return (
      <View style={{ flex: 1 }}>
        {!this.state.refreshing && this.state.singleProductDetails ? (
          <>
            <Feedback
              ref={(e) => (this.feedback = e)}
              onSuccess={() => this.success.show()}
            />
            <ImagePreview
              ref={(e) => (this.imagepreview = e)}
              onSuccess={() => this.success.show()}
            />
            <Alert
              ref={(e) => (this.success = e)}
              text="Product Added to Cart"
              onSuccess={() => {
                this.props.navigation.goBack();
              }}
            />

            <Carousel
              ref={(c) => {
                this._carousel = c;
              }}
              data={this.state.singleProductDetails.images}
              onScrollToIndexFailed={() => {}}
              renderItem={this._renderItem}
              sliderWidth={vw * 100}
              itemWidth={vw * 100}
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
              onSnapToItem={(index) => this.setState({ activeSlide: index })}
              initialScrollIndex={this.state.activeSlide}
              style={{}}
            />
            <TouchableHOC
              hitSlop={{
                top: 2 * vh,
                bottom: 2 * vh,
                left: 5 * vw,
                right: 5 * vw,
              }}
              onPress={() => this.props.navigation.goBack()}
              style={{ position: "absolute", top: vh * 3 }}
            >
              <Image
                source={icons.arrowHeader}
                style={{
                  width: vw * 6.5,
                  height: vh * 6,
                  marginLeft: 5.5 * vw,
                }}
                resizeMode="contain"
              />
            </TouchableHOC>

            <View style={styles.card}>
              <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this._onRefresh()}
                    tintColor="black"
                    colors={["black"]}
                  />
                }
              >
                <Pagination
                  dotsLength={
                    this.state.singleProductDetails.images == undefined
                      ? 1
                      : this.state.singleProductDetails.images.length
                  }
                  tappableDots={true}
                  carouselRef={this._carousel}
                  activeDotIndex={this.state.activeSlide}
                  containerStyle={{}}
                  dotStyle={styles.dot}
                  onScrollToIndexFailed={() => {}}
                  inactiveDotStyle={styles.inactiveDot}
                  dotContainerStyle={{ marginHorizontal: vw * 0.3 }}
                  inactiveDotOpacity={1}
                  inactiveDotScale={1}
                />
                <TextMedium style={styles.pname}>
                  {this.state.singleProductDetails.name}
                </TextMedium>
                <TextRegular style={styles.catName}>
                  Category
                  {!Object.keys(this.state.singleProductDetails).length == 0
                    ? this.state.singleProductDetails.categories[0].name
                    : null}
                </TextRegular>
                <View style={styles.featureCont}>
                  {/* <HTML
                    containerStyle={{paddingHorizontal: 5 * vw}}
                    baseFontStyle={{fontSize: 3 * vw, color: '#1D1D1D'}}
                    html={
                      this.state.singleProductDetails
                        ? this.state.singleProductDetails.short_description
                        : '<h1></h1>'
                    }
                    tagsStyles={{img: {height: 25 * vh, width: 80 * vw}}}
                  /> */}
                </View>
                <View style={styles.row}>
                  <CircularBook style={styles.price}>
                    ${data.price}
                  </CircularBook>

                  <Quantity
                    minus={() => this.minus()}
                    plus={() => this.plus()}
                    quantity={this.state.quantity}
                  />
                </View>
                {/* <View style={[styles.row, { zIndex: 9999, elevation: 10, marginTop: vh * 3 }]}>

                                    <TextSemi style={{ fontSize: vh * 2 }}>Variation</TextSemi>
                                    <FilterDropdown placeholder="Select" items={[
                                        { label: 'Option 1', value: 'Option 1' },
                                        { label: 'Option 2', value: 'Option 2' },
                                        { label: 'Option 3', value: 'Option 3' },
                                    ]} />
                                </View> */}

                {this._renderVariations()}

                {this.state.singleProductDetails.price ? (
                  <ImageButton
                    title="Add To Cart"
                    onPress={() => this.addToCart()}
                    btnContainer={styles.btn}
                  />
                ) : null}

                <TextMedium
                  style={{
                    color: primaryColor,
                    fontSize: vh * 2.4,
                    marginTop: vh * 3,
                    marginBottom: vh * 1.5,
                  }}
                >
                  Description
                </TextMedium>

                <HTML
                  containerStyle={{ paddingHorizontal: 5 * vw }}
                  baseFontStyle={{ fontSize: 3 * vw, color: "#1D1D1D" }}
                  html={
                    this.state.singleProductDetails
                      ? this.state.singleProductDetails.description == undefined
                        ? ""
                        : this.state.singleProductDetails.description
                      : "<h1></h1>"
                  }
                  tagsStyles={{ img: { height: 25 * vh, width: 80 * vw } }}
                />

                <View style={styles.row}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={parseInt(
                      this.state.singleProductDetails.average_rating
                    )}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                    fullStar={icons.star}
                    emptyStar={icons.emptyStar}
                    starSize={vh * 2.2}
                    buttonStyle={{ marginRight: vw * 1.8 }}
                  />

                  <Button
                    onPress={() =>
                      this.feedback.show(
                        this.state.singleProductDetails.id,
                        parseInt(this.state.singleProductDetails.average_rating)
                      )
                    }
                    title="Add a Review"
                    btnContainer={{ width: "40%", height: vh * 5.5 }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: vh * 2,
                  }}
                >
                  <TextMedium
                    style={{
                      color: primaryColor,
                      fontSize: vh * 2.4,
                      marginTop: vh * 3,
                    }}
                  >
                    RELATED PRODUCTS
                  </TextMedium>

                  <Button
                    title="View More"
                    onPress={() => this.props.navigation.pop()}
                    btnContainer={{
                      backgroundColor: primary_font_color,
                      width: "30%",
                      height: vh * 3.5,
                      alignSelf: "flex-end",
                    }}
                  />
                </View>
                <View style={styles.row}>
                  <FlatList
                    data={this.props.Reducer.relatedproduct}
                    style={styles.flatlist}
                    renderItem={this._renderRelatedItem}
                    numColumns={2}
                    ListFooterComponent={this.footer}
                  />
                </View>
              </ScrollView>

              <DropDown ref={(_ref) => (this.DropDownRef = _ref)} />
            </View>
          </>
        ) : (
          <View style={{ flex: 1, alignItems: "center" }}>
            <Image
              source={
                this.props.route.params.imgSrc
                  ? { uri: this.props.route.params.imgSrc }
                  : require("../../assets/images/banner.png")
              }
              style={{ width: "100%", height: vh * 25 }}
              resizeMode="cover"
            />

            <ActivityIndicator
              size="large"
              color="black"
              style={{ marginTop: 4 * vh }}
            />
          </View>
        )}
      </View>
    );
  }
}

export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps
)(ProductDetail);
