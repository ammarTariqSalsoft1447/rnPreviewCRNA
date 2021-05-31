import React from 'react';
import { Image } from 'react-native';
import styles from './styles';
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import { Fonts } from '../../assets/fonts';
import { icons } from '../../assets/images/index';
import DropDownPicker from 'react-native-dropdown-picker';

export default class CategoryDraopdown extends React.Component {
  state = {
    country: '',
    defaultVal :'Sort'
  };



  render() {
 
    return (
      <DropDownPicker
        // zIndex={99999}
        items={this.props.items}
        containerStyle={[styles.containerStyle, this.props.containerStyle]}
        style={[styles.PickerStyle]}
        customArrowUp={() => (
          <Image
            source={icons.arrowDown}
            style={[styles.picker]}
            resizeMode="contain"
          />
        )}
        customArrowDown={() => (
          <Image
            source={icons.arrowDown}
            style={[styles.picker]}
            resizeMode="contain"
          />
        )}
        dropDownStyle={styles.dropDownStyle}
        itemStyle={styles.itemStyle}
        labelStyle={styles.labelStyle}
        // onChangeItem={(item) =>
        //   this.setState({
        //     country: item.value,
        //   })
        // }
        onChangeItem={this.props.onChangeItem}
        placeholder={this.props.placeholder ? this.props.placeholder : "Latest"}
        placeholderStyle={styles.placeholder}
      />
    );
  }
}
