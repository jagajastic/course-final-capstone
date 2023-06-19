import React from 'react';
import CheckBox from 'expo-checkbox';
import { StyleSheet, Text, View } from 'react-native';
import { hp } from '../utils/responsiveSizes';

function CheckBoxField({
  value,
  onValueChange,
}) {
  return (
    <CheckBox
      disabled={false}
      value={value}
      onValueChange={(newValue) => onValueChange(newValue)}
      boxType='square'
    />
  );
}

export default CheckBoxField;

export function CheckBoxInput({
  label,
  value,
  onValueChange,
}) {
  return (
    <View style={styles.notificationCheckBoxes}>
      <CheckBoxField value={value} onValueChange={onValueChange}  />
      <Text style={styles.notificationCheckBoxesText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationCheckBoxes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.5),
  },
  notificationCheckBoxesText: {
    marginLeft: hp(2.5),
    fontSize: hp(2.6),
  },
});
