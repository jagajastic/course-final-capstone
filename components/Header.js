import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { hp } from '../utils/responsiveSizes';
import Search from './Search';

function Header({handleSearchChange}) {
  return (
    <View style={styles.heroSection}>
    <View style={styles.heroContainer}>
      <View style={styles.heroItems}>
        <Text style={styles.heroTitle}>Little Lemon</Text>
        <Text style={styles.heroSubtitle}>Levittown</Text>
        <Text style={styles.heroDescription}>
          Little Gyro kitchen offers authentic greek food and Mediterranean
          cuisine in Nassau County Levittown. The home for your fresh and
          healthy food.
        </Text>
      </View>
      <View style={styles.heroImageContainer}>
        <Image
          source={require('../assets/hero_image.png')}
          resizeMode="cover"
          style={styles.heroImage}
        />
      </View>
    </View>
    <View style={styles.searchSection}>
      <Search handleSearchChange={handleSearchChange}/>
    </View>
  </View>
  )
}

export default Header;


const styles = StyleSheet.create({
    heroSection: {
      height: hp(43.84),
      padding: hp(2.7),
      marginTop: 20,
      backgroundColor: '#495E57',
    },
    heroTitle: {
      fontSize: hp(3.6),
      color: '#F4CE14',
      fontWeight: '800',
    },
    heroSubtitle: {
      fontSize: hp(2.2),
      color: 'white',
      marginBottom: hp(1.2),
      fontWeight: '600',
    },
    heroDescription: {
      fontSize: hp(1.95),
      color: 'white',
    },
    heroContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    heroItems: {
      width: '60%',
    },
    heroImageContainer: {
      width: '40%',
      borderRadius: 8,
      overflow: 'hidden',
    },
    heroImage: {
      width: '100%',
      height: '100%',
    },
    searchSection: {
      marginTop: 15,
    },
  });