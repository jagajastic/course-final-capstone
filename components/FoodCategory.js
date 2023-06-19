import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { hp } from '../utils/responsiveSizes';

function FoodCategory({name, backgroundColor='#CDCDCD'}) {
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
        <Text>{name}</Text>
    </View>
  )
}

export default FoodCategory;

const styles = StyleSheet.create({
    container: {
        color: '#495E57',
        fontSize: hp(2.6),
        marginRight: hp(1),
        borderRadius: hp(1.23),
        paddingVertical: hp(0.7),
        backgroundColor: '#CDCDCD',
        paddingHorizontal: hp(1.6),
    }
})