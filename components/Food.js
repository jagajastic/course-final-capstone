import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '../utils/responsiveSizes';

function Food({
  title,
  description,
  price,
}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.foodTitle}>{title}</Text>
        <Text style={styles.foodDescription} numberOfLines={2}>
          {description}
        </Text>
        <Text style={styles.foodPrice}>Price: {price}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/hero_image.png')}
          style={styles.image}
        />
      </View>
    </View>
  );
}

export default Food;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foodTitle: {
    fontSize: hp(2),
    fontWeight: '700',
  },
  foodDescription: {
    fontSize: hp(1.5),
    maxWidth: wp(47.65),
  },
  foodPrice: {
    fontSize: hp(1.85),
    fontWeight: '800',
  },
  imageContainer: {
    width: hp(18.3),
    height: hp(12.3),
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
