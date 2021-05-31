import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {backgrounds, assets, samplePictures, icons} from '../../assets/images';
import styles from './styles';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import TextRegular from '../../Components/TextRegular';
import TextMedium from '../../Components/TextMedium';
import TextSemi from '../../Components/TextSemi';
import MainInput from '../../Components/MainInput';
import CircleBtn from '../../Components/CircleBtn';
import Alert from '../../Popups/Alert';
import PlayBold from '../../Components/PlayBold';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import TouchableHOC from '../../Components/TouchableHOC';
import {connect} from 'react-redux';
import reduxProps from '../../WooCommerceWrapper/store/reduxProps';

import { store } from '../../WooCommerceWrapper/store';
const state = store.getState()
const config = state.ConfigReducer
const {
  primary_heading_color,
  primary_section_color,
  primary_font_color,
  secondary_font_color,
  primaryColor,
  secondaryColor,
  primary_placeholder_Color,
  primary_border_color,
  primary_background_color,
  secondary_background_color,
  primary_message_color,
  drawer_Active_Color,
  drawer_inActive_Color,
  default_color,
} = config
class SignUp extends React.Component {
  state = {activeSlide: 0, refreshing: false, bannerImages: []};
  _renderItem = ({item, index}) => {
    console.log('The Item of carousel:', item);
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Products', {
            categoryID: item.cat_id,
            categoryName: item.button,
          })
        }>
        <ImageBackground
          source={{uri: item.image}}
          style={styles.banner}
          resizeMode="cover"
          imageStyle={{borderRadius: vw * 1.5}}>
          <PlayBold style={styles.bannerTxt}>{item.button}</PlayBold>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    this.props.navigation.addListener(
      'focus',

      this._getHomeData,
    );

    this._getPaymentMethods();
  }

  _getHomeData = () => {
    this.setState({
      refreshing: true,
    });

    this.props.GetCustomData(
      (s) => {},
      (e) => {},
    );

    this.props.HomeCategories(
      (success) => {
        this.setState(
          {
            refreshing: false,
          },
          () => console.log('Custom Dara :', this.props.Reducer.customData),
        );
      },
      (error) => {
        // console.log('in error :', error);
      },
    );

    // this.props.AllCategories(
    //   (success) => {
    //     this.setState(
    //       {
    //         refreshing: false,
    //       },
    //       () => console.log('Custom Dara :', this.props.Reducer.customData),
    //     );
    //   },
    //   (error) => {
    //     // console.log('in error :', error);
    //   },
    // );
  };

  _getPaymentMethods = () => {
    this.props.PaymentMethod(
      (success) => {},
      (error) => {},
    );
  };

  componentWillUnmount() {
    this.props.navigation.removeListener('focus');
    // this.props.navigation.removeListener("blur")
  }

  render() {

    console.log('Custom Dataaaa :', this.props.Reducer.customData)

    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{backgroundColor: secondaryColor}}>
          <View style={styles.headerContainer}>
            <View style={styles.headerInner}>
              <TouchableHOC onPress={() => this.props.navigation.openDrawer()}>
                <Image
                  source={assets.menu}
                  style={styles.menu}
                  resizeMode="contain"
                />
              </TouchableHOC>
              <TouchableHOC
                style={styles.searchbar}
                onPress={() => this.props.navigation.navigate('Search')}>
                <TextInput
                  placeholder="Search Products "
                  placeholderTextColor={primary_placeholder_Color}
                  style={styles.input}
                />
                <Image
                  source={assets.search}
                  style={styles.search}
                  resizeMode="contain"
                />
              </TouchableHOC>
            </View>
          </View>
        </SafeAreaView>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._getHomeData}
              tintColor="black"
              colors={['black']}
            />
          }>
          <View style={{height: vh * 33}}>
            <Carousel
              ref={(c) => {
                this._carousel = c;
              }}
              data={this.props.Reducer.customData.homeBanners}
              containerCustomStyle={{marginTop: vh * 2}}
              renderItem={this._renderItem}
              sliderWidth={vw * 100}
              itemWidth={vw * 100}
              inactiveSlideOpacity={1}
              onScrollToIndexFailed={() => {}}
              inactiveSlideScale={1}
              onSnapToItem={(index) => this.setState({activeSlide: index})}
              initialScrollIndex={this.state.activeSlide}
            />
            <Pagination
              dotsLength={this.props.Reducer.customData.homeBanners.length}
              activeDotIndex={this.state.activeSlide}
              onScrollToIndexFailed={() => {}}
              // containerStyle={{}}
              dotStyle={styles.dot}
              inactiveDotStyle={styles.inactiveDot}
              dotContainerStyle={{marginRight: vw * 0}}
              inactiveDotOpacity={1}
              inactiveDotScale={1}
            />
          </View>

          {this.props.Reducer.homeproductcategory.length > 0 && (
            <View style={styles.categories}>
              <View style={styles.catHeader}>
                <TextRegular style={styles.categoriesTxt}>
                  CATEGORIES
                </TextRegular>
                <TouchableHOC
                  onPress={() => this.props.navigation.navigate('Categories')}>
                  <TextMedium style={styles.viewAll}>View All</TextMedium>
                </TouchableHOC>
              </View>

              {this.props.Reducer.homeproductcategory.length > 0 &&
              this.props.Reducer.homeproductcategory.length > 3 ? (
                <View style={styles.catRow}>
                  <TouchableHOC
                    style={styles.cat1}
                    onPress={() =>
                      this.props.navigation.navigate('Products', {
                        categoryID: this.props.Reducer.homeproductcategory[0]
                          .id,
                        categoryName: this.props.Reducer.homeproductcategory[0]
                          .name,
                      })
                    }>
                    <Image
                      source={
                        this.props.Reducer.homeproductcategory[0].image == null
                          ? samplePictures.placeholder
                          : {
                              uri: this.props.Reducer.homeproductcategory[0]
                                .image.src,
                            }
                      }
                      style={styles.carImg1}
                      resizeMode="cover"
                    />
                    <TextSemi style={styles.catTxt1}>
                      {this.props.Reducer.homeproductcategory[0].name}
                    </TextSemi>
                  </TouchableHOC>

                  <TouchableHOC
                    style={styles.catRow2}
                    onPress={() =>
                      this.props.navigation.navigate('Products', {
                        categoryID: this.props.Reducer.homeproductcategory[1]
                          .id,
                        categoryName: this.props.Reducer.homeproductcategory[1]
                          .name,
                      })
                    }>
                    <TextMedium style={styles.catTxt3}>
                      {this.props.Reducer.homeproductcategory[1].name}
                    </TextMedium>
                    <Image
                      source={
                        this.props.Reducer.homeproductcategory[1].image == null
                          ? samplePictures.placeholder
                          : {
                              uri: this.props.Reducer.homeproductcategory[1]
                                .image.src,
                            }
                      }
                      style={styles.catImg2}
                      resizeMode="contain"
                    />
                  </TouchableHOC>

                  <TouchableHOC
                    style={styles.catRow2}
                    onPress={() =>
                      this.props.navigation.navigate('Products', {
                        categoryID: this.props.Reducer.homeproductcategory[2]
                          .id,
                        categoryName: this.props.Reducer.homeproductcategory[2]
                          .name,
                      })
                    }>
                    <TextMedium style={styles.catTxt3}>
                      {this.props.Reducer.homeproductcategory[2].name}
                    </TextMedium>
                    <Image
                      source={
                        this.props.Reducer.homeproductcategory[2].image == null
                          ? samplePictures.placeholder
                          : {
                              uri: this.props.Reducer.homeproductcategory[2]
                                .image.src,
                            }
                      }
                      style={styles.catImg2}
                      resizeMode="contain"
                    />
                  </TouchableHOC>
                  <TouchableHOC
                    style={styles.cat1}
                    onPress={() =>
                      this.props.navigation.navigate('Products', {
                        categoryID: this.props.Reducer.homeproductcategory[3]
                          .id,
                        categoryName: this.props.Reducer.homeproductcategory[3]
                          .name,
                      })
                    }>
                    <Image
                      source={
                        this.props.Reducer.homeproductcategory[3].image == null
                          ? samplePictures.placeholder
                          : {
                              uri: this.props.Reducer.homeproductcategory[3]
                                .image.src,
                            }
                      }
                      style={styles.carImg1}
                      resizeMode="contain"
                    />
                    <TextSemi style={styles.catTxt1}>
                      {this.props.Reducer.homeproductcategory[3].name}
                    </TextSemi>
                  </TouchableHOC>
                </View>
              ) : null}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps,
)(SignUp);
