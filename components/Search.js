import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { hp } from '../utils/responsiveSizes';
import Button from './Button';

export default function Search({handleSearchChange}) {
  return (
    <View style={styles.container}>
      <Button buttonStyle={styles.button}>
        <Image
          source={require('../assets/search.png')}
        />
      </Button>
      <TextInput style={styles.input} placeholder='Search...' onChangeText={handleSearchChange}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  input: {
    width: '100%',
    paddingVertical: 15,
    paddingLeft: 50,
    paddingRight: 10,
  },
  button: {
    position: 'absolute',
    marginLeft: hp(2.4),
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent'
  },
});
