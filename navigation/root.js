import React, { useEffect, useState } from 'react';
import { Stack } from './stack';
import Landing from '../screens/Landing';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { Image, Pressable, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';


const RootNavigator = () => {
  const [userExist, setUserExist] = useState(false);
  const [loading, setLoading] = useState(true);
  const db = SQLite.openDatabase('lemon.db');
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM user',
        null,
        (txObj, result) => {
          const isEmpty = result.rows._array.length > 0;
          setUserExist(isEmpty);
          console.log(result.rows._array);
          setLoading(false)
        },
        (txObj, error) => {
          setUserExist(false);
          setLoading(false)
        },
      );
    });
  }, []);
  const navigation = useNavigation();

  if(loading){
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <Stack.Navigator initialRouteName={userExist ? 'Home' : 'Landing'}>
      {/* {!userExist ? ( */}
        <Stack.Screen
          name={'Landing'}
          component={Landing}
          options={{
            headerTitle: props => (
              <Image
                source={require('../assets/Logo.png')}
                style={{ width: 150, height: 40 }}
              />
            ),
            headerRight: props =>
              userExist ? (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}>
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30,
                      overflow: 'hidden',
                    }}>
                    <Image
                      resizeMode="cover"
                      style={{ width: '100%', height: 30 }}
                      source={require('../assets/Profile.png')}
                    />
                  </View>
                </TouchableOpacity>
              ) : null,
            headerTransparent: true,
          }}
        />
      {/* ) : null} */}

      <Stack.Screen
        name={'Home'}
        component={Home}
        options={{
          headerTitle: props => (
            <Image
              source={require('../assets/Logo.png')}
              style={{ width: 150, height: 40 }}
            />
          ),
          headerRight: props => (
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <Image
                  resizeMode="cover"
                  style={{ width: '100%', height: 30 }}
                  source={require('../assets/Profile.png')}
                />
              </View>
            </TouchableOpacity>
          ),
          headerTransparent: true,
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: props => (
            <Image
              source={require('../assets/Logo.png')}
              style={{ width: 150, height: 40 }}
            />
          ),
          headerRight: props => (
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 30,
                overflow: 'hidden',
              }}>
              <Image
                resizeMode="cover"
                style={{ width: '100%', height: 30 }}
                source={require('../assets/Profile.png')}
              />
            </View>
          ),
          headerTransparent: true,
          headerLeft: props => (
            <Pressable
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#495E57',
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/arrow_down.png')}
                style={{ width: 12, height: 12 }}
              />
            </Pressable>
          ),
        }}
      />

    
    </Stack.Navigator>
  );
};

export default RootNavigator;
