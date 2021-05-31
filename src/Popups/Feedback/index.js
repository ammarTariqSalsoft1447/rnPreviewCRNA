import React, { Component, forwardRef } from "react";
import { View, Modal, Image, ImageBackground } from "react-native";
import styles from "./styles";
import {
  icons,
  assets,
  backgrounds,
  samplePictures,
} from "../../assets/images";
import vh from "../../Units/vh";
import vw from "../../Units/vw";
import Button from "../../Components/Button";
import TouchableHOC from "../../Components/TouchableHOC";

import TextRegular from "../../Components/TextRegular";
import TextSemi from "../../Components/TextSemi";
import MainInput from "../../Components/MainInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import StarRating from "react-native-star-rating";
import { connect } from "react-redux";
import { withNavigation } from "@react-navigation/compat";

import reduxProps from "../../WooCommerceWrapper/store/reduxProps";
import Toast from "react-native-toast";
class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: this.props.value ? true : false,
      text: "",
      visible: false,
      imagesShown: false,
      reviewer: this.props.Reducer.userInfo?.first_name ?? "", //name
      reviewer_email: this.props.Reducer.userInfo?.email ?? "", //email
      review: "",
      rating: 0,
      id: 0,
    };
  }

  show = (id, rating) => {
    this.setState((p) => {
      return {
        ...p,
        visible: true,
        id: id,
        rating,
      };
    });
  };
  hide = () => {
    // console.log("hide");

    this.setState((p) => {
      return {
        ...p,
        visible: false,
      };
    });
  };
  onCross = () => {
    this.hide();
    if (this.props.onCross) {
      this.props.onCross();
    }
  };
  onSuccess = () => {
    this.hide();
    this.props.onSuccess();
  };

  onPublish = () => {
    // alert('asdad');
    if (this.state.rating == 0) {
      Toast.show("Please put the rating");
    }
    if (this.state.review.trim() == "") {
      Toast.show("Please enter review");
    }

    if (this.state.reviewer == "") {
      Toast.show("Please enter name");
    }

    if (this.state.reviewer_email.trim() == "") {
      Toast.show("Please enter email");
    }

    this.props.CreateRating(
      {
        product_id: this.state.id,
        review: this.state.review,
        reviewer: this.state.reviewer,
        reviewer_email: this.state.reviewer_email,
        rating: this.state.rating,
      },
      (success) => {
        Toast.show(success);
        this.hide();
      },
      (error) => {
        Toast.show(error);
        this.hide();
      }
    );
  };

  render() {
    console.log("this.state.rating", this.state.rating);
    return (
      <Modal
        key={"cbt"}
        visible={this.state.visible}
        transparent={true}
        animationType="fade"
      >
        <KeyboardAwareScrollView>
          <View
            style={[
              styles.modalTouchable,
              {
                backgroundColor:
                  this.props.ConfigReducer.primary_background_color,
              },
            ]}
          >
            <View
              style={[
                styles.imageBg,
                {
                  backgroundColor: this.props.ConfigReducer.secondaryColor,
                },
              ]}
            >
              <TouchableHOC
                style={styles.crossContainer}
                onPress={this.onCross}
              >
                <Image
                  source={icons.cross}
                  style={styles.cross}
                  resizeMode="contain"
                />
              </TouchableHOC>
              <View style={styles.container}>
                <TextSemi
                  style={[
                    styles.feedback,
                    {
                      color: this.props.ConfigReducer.primary_heading_color,
                    },
                  ]}
                >
                  Feedback
                </TextSemi>
                <TextRegular
                  style={[
                    styles.description,
                    {
                      color: this.props.ConfigReducer.drawer_inActive_Color,
                    },
                  ]}
                >
                  Rate This Product
                </TextRegular>
                <StarRating
                  maxStars={5}
                  rating={this.state.rating}
                  // selectedStar={(rating) => this.onStarRatingPress(rating)}
                  selectedStar={(rating) => this.setState({ rating })}
                  fullStar={icons.star}
                  emptyStar={icons.emptyStar}
                  starSize={vh * 2.2}
                  buttonStyle={{ marginRight: vw * 1.7 }}
                />
                <TextRegular
                  style={[
                    styles.Message,
                    {
                      color: this.props.ConfigReducer.primary_heading_color,
                    },
                  ]}
                >
                  Share your experience with this Product
                </TextRegular>
                <MainInput
                  // numberOfLines={10}
                  multiline={true}
                  value={this.state.review}
                  onChangeText={(text) => this.setState({ review: text })}
                  style={styles.txtArea}
                  fieldStyle={{
                    textAlignVertical: "top",
                    height: 13 * vh,
                  }}
                />

                <MainInput
                  style={styles.field}
                  label="Name"
                  value={this.state.reviewer}
                  onChangeText={(text) => this.setState({ reviewer: text })}
                />

                <MainInput
                  style={styles.field}
                  label="Email"
                  value={this.state.reviewer_email}
                  onChangeText={(text) =>
                    this.setState({ reviewer_email: text })
                  }
                />

                {/* old
              <Button title="Publish"
              
              onPress={this.onSuccess} btnContainer={styles.btn} 
              /> */}

                <Button
                  title="Publish"
                  onPress={() => this.onPublish()}
                  btnContainer={styles.btn}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    );
  }
}
export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps,
  null,
  { forwardRef: true }
)(Feedback);
