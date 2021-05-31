import React from "react";
import { View, ImageBackground, Image, FlatList } from "react-native";
import {
  backgrounds,
  assets,
  icons,
  samplePictures,
} from "../../assets/images";
import styles from "./styles";
import vh from "../../Units/vh";
import vw from "../../Units/vw";
import TextRegular from "../../Components/TextRegular";
import TextSemi from "../../Components/TextSemi";
import CircularBook from "../../Components/CircularBook";
import MainInput from "../../Components/MainInput";
import CircleBtn from "../../Components/CircleBtn";
import Alert from "../../Popups/Alert";
import TextMedium from "../../Components/TextMedium";
import FilterDropdown from "../../Components/FilterDropdown";
import TouchableHOC from "../../Components/TouchableHOC";
import reduxProps from "../../WooCommerceWrapper/store/reduxProps";
import { store } from "../../WooCommerceWrapper/store";

import { connect } from "react-redux";
const state = store.getState();
const config = state.ConfigReducer;
const { primary_heading_color, primary_section_color } = config;

const data = [
  { name: "Bags", image: samplePictures.cat1 },
  { name: "Accessories1", image: samplePictures.cat2 },
  { name: "Clothing", image: samplePictures.cat3 },
  { name: "Shoes", image: samplePictures.cat4 },
  { name: "Bags", image: samplePictures.cat1 },
  { name: "Jwellery", image: samplePictures.cat2 },
];

class Categories extends React.Component {
  componentDidMount() {
    // this.props.Reducer.productcategory
    this.props.navigation.addListener(
      "focus",
      () => {
        this.props.AllCategories(
          (success) => {
            this.setState({
              refreshing: false,
            });
          },
          (error) => {}
        );
      },
      () => {}
    );
  }

  componentWillUnmount() {
    // this.props.navigation.removeListener("focus")
  }

  _renderItem = ({ item, index }) => {
    console.log("item123", item);
    return (
      <TouchableHOC
        onPress={() =>
          this.props.navigation.navigate("Products", {
            categoryID: item.id,
            categoryName: item.name,
          })
        }
        style={{
          height: vh * 20,
          width: vw * 40.5,
          backgroundColor: primary_section_color,
          marginRight: vw * 3,
          marginBottom: vh * 2,
          borderRadius: vw * 1,
        }}
      >
        <View style={{ marginLeft: vw * 3, marginTop: vh * 1 }}>
          <TextSemi
            style={{ color: primary_heading_color, fontSize: vh * 1.8 }}
          >
            {item.name}
          </TextSemi>
          <TextRegular
            style={{ color: primary_heading_color, fontSize: vh * 1.5 }}
          >
            {item.count} items
          </TextRegular>
        </View>

        {/* <Image source={item.image} style={{ width: "100%", height: vh * 14 }} resizeMode="contain" /> */}
        <Image
          source={
            item.image == null
              ? require("../../assets/images/placeholder.png")
              : { uri: item.image?.src }
          }
          style={{ width: "100%", height: vh * 14 }}
          resizeMode="contain"
        />
      </TouchableHOC>
    );
  };
  render() {
    return (
      <View style={{ flex: 1, paddingHorizontal: vw * 5, marginTop: vh * 3 }}>
        {this.props.Reducer.productcategory.length == 0 ? null : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.props.Reducer.productcategory}
            contentContainerStyle={styles.flatlist}
            renderItem={this._renderItem}
            numColumns={2}
          />
        )}
      </View>
    );
  }
}

export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps
)(Categories);
