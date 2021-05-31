import React from "react";
import { View, ImageBackground, Image, TouchableOpacity } from "react-native";
import { backgrounds, assets, icons } from "../../assets/images";
import styles from "./styles";
import vh from "../../Units/vh";
import vw from "../../Units/vw";
import TextRegular from "../../Components/TextRegular";
import ImageButton from "../../Components/ImageButton";
import MainInput from "../../Components/MainInput";
import ChangePassword from "../../Popups/changePassword";
import Alert from "../../Popups/Alert";
import TextMedium from "../../Components/TextMedium";
import CircularBook from "../../Components/CircularBook";
import TouchableHOC from "../../Components/TouchableHOC";
import { TextInput } from "react-native-gesture-handler";
import { connect } from "react-redux";
import Toast from "react-native-toast";
import reduxProps from "../../WooCommerceWrapper/store/reduxProps";

import { store } from "../../WooCommerceWrapper/store";
const state = store.getState();
const config = state.ConfigReducer;
const { primary_font_color, primaryColor, secondary_background_color } = config;
class ProfileDetails extends React.Component {
  state = {
    edit: false,
    updatedUser: {
      id: "",
      first_name: "",
      last_name: "",
      phone: "",
    },
  };

  _onChangeText = (field, text) => {
    this.setState({
      updatedUser: {
        ...this.state.updatedUser,
        [field]: text,
      },
    });
  };
  onUpdate = () => {
    this.props.UpdateUser(
      this.state.updatedUser,
      (success) => {
        Toast.show(success);
        this.props.navigation.goBack();
      },
      (error) => {
        Toast.show(error);
      }
    );
  };

  _onBackPress = () => {
    // alert('ok')
    this.setState({ edit: false }, () => {
      this.props.navigation.setOptions({
        title: "PROFILE DETAILS",
        headerleft: () => {
          return (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ marginLeft: 5.5 * vw, backgroundColor: "red" }}
                onPress={() => navigation.openDrawer()}
                hitSlop={{
                  top: 2 * vh,
                  left: 2 * vw,
                  right: 2 * vw,
                  bottom: 2 * vh,
                }}
              >
                <Image
                  source={!this.state.edit ? assets.menu : assets.arrowBack}
                  style={{
                    width: 5.5 * vw,
                    height: 4 * vh,
                    resizeMode: "contain",
                    tintColor: primary_font_color,
                  }}
                />
              </TouchableOpacity>
            </View>
          );
        },
      });
    });
  };

  _editPtofile = () => {
    this.setState({ edit: true }, () => {
      this.props.navigation.setOptions({
        title: "UPDATE PROFILE",
        headerLeft: () => {
          return (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ marginLeft: 5.5 * vw }}
                onPress={
                  this.state.edit
                    ? () => this._onBackPress()
                    : () => this.props.navigation.openDrawer()
                }
                hitSlop={{
                  top: 2 * vh,
                  left: 2 * vw,
                  right: 2 * vw,
                  bottom: 2 * vh,
                }}
              >
                <Image
                  source={!this.state.edit ? assets.menu : assets.arrowBack}
                  style={{
                    width: 5.5 * vw,
                    height: 4 * vh,
                    resizeMode: "contain",
                    tintColor: !this.state.edit
                      ? primary_font_color
                      : primaryColor,
                  }}
                />
              </TouchableOpacity>
            </View>
          );
        },
      });
    });
  };

  renderFields = () => {
    styles.label={
      ...styles.label,
      color: this.props.ConfigReducer.drawer_inActive_Color
    }
    styles.label = {
      ...styles.label,

      color: this.props.ConfigReducer.primaryColor,

    }
    styles.changePassword = {
      ...styles.changePassword,
      color: this.props.ConfigReducer.primary_font_color,

    }
    if (this.state.edit) {
      return (
        <>
          <TextRegular style={styles.label}>First Name 1</TextRegular>
          <MainInput
            style={styles.input}
            value={this.state.updatedUser.first_name}
            onChangeText={(text) => this._onChangeText("first_name", text)}
          />
          <TextRegular style={styles.label}>Last Name</TextRegular>
          <MainInput
            style={styles.input}
            value={this.state.updatedUser.last_name}
            onChangeText={(text) => this._onChangeText("last_name", text)}
          />
          <TextRegular style={styles.label}>Phone Number</TextRegular>

          <MainInput
            style={styles.input}
            value={this.state.updatedUser.phone}
            onChangeText={(text) => this._onChangeText("phone", text)}
          />

          <TextRegular style={styles.label}>Email</TextRegular>
          <TextMedium style={styles.userfield}>
            {this.props.Reducer.userInfo.email}
          </TextMedium>

          <TouchableHOC onPress={() => this.changePassword.show()}>
            <CircularBook style={styles.changePassword}>
              Change Password
            </CircularBook>
          </TouchableHOC>

          <ImageButton
            title="UPDATE"
            //   onPress={() => { this.props.navigation.goBack() }}
            onPress={() => this.onUpdate()}
            btnContainer={styles.btn}
          />
        </>
      );
    } else {

      return (
        <>
          <TextRegular style={styles.label}>First Name</TextRegular>
          <TextMedium style={styles.userfield}>
            {this.props.Reducer.userInfo.first_name}
          </TextMedium>
          <TextRegular style={styles.label}>Last Name</TextRegular>
          <TextMedium style={styles.userfield}>
            {this.props.Reducer.userInfo.last_name}
          </TextMedium>
          <TextRegular style={styles.label}>Phone Number</TextRegular>
          <TextMedium style={styles.userfield}>
            {this.props.Reducer.userInfo.billing.phone}
          </TextMedium>
          <TextRegular style={styles.label}>Email</TextRegular>
          <TextMedium style={styles.userfield}>
            {this.props.Reducer.userInfo.email}
          </TextMedium>
          <TouchableHOC onPress={() => this.changePassword.show()}>
            <CircularBook style={styles.changePassword}>
              Change Password
            </CircularBook>
          </TouchableHOC>

          <ImageButton
            title="EDIT PROFILE"
            // onPress={() => this.setState({edit: true})}

            onPress={() => this._editPtofile()}
            btnContainer={styles.btn}
          />
        </>
      );
    }
  };

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.setState({
        updatedUser: {
          id: this.props.Reducer.userInfo.id,
          first_name: this.props.Reducer.userInfo.first_name,
          last_name: this.props.Reducer.userInfo.last_name,
          phone: this.props.Reducer.userInfo.billing.phone,
        },
      });
    });
  }

  componentWillUnmount() {
    this.props.navigation.removeListener("focus");
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: vw * 8,
          paddingTop: vh * 4,
          backgroundColor: secondary_background_color,
        }}
      >
        {this.props.Reducer.userInfo == null ? null : (
          <>
            <ChangePassword
              ref={(e) => (this.changePassword = e)}
              onCross={() => {}}
              onSuccess={() => {
                this.changeSuccess.show();
                // this.changeSuccess.show('date');
              }}
            />

            <Alert
              text={"Your password has been\nupdated successfully"}
              onSuccess={() => {}}
              ref={(e) => (this.changeSuccess = e)}
            />

            {this.renderFields()}
          </>
        )}
      </View>
    );
  }
}

export default connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps
)(ProfileDetails);
