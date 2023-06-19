import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { CheckBoxInput } from '../components/CheckBox';
import { hp } from '../utils/responsiveSizes';
import * as SQLite from 'expo-sqlite';
import { useFormik } from 'formik';

const Profile = ({ navigation }) => {
  const [isEditable, setIsEditable] = useState(false);
  const db = SQLite.openDatabase('lemon.db');
  

  const handleUpdateProfileDetails = function () {
    db.transaction(tx => {
      console.log(values.id);
      tx.executeSql(
        `UPDATE user SET firstName='${values.firstName}', lastName='${values.lastName}', email='${values.email}', phone='${values.phone}', orderStatus='${values.orderStatus}', passwordChanges=${values.passwordChanges}, specialOffer=${values.specialOffer}, newsLetter=${values.newsLetter} WHERE id=?`,
        [values.id],
        (txUbj, result) => {
          console.log('table updated', result);
        },
        (txObj, error) => console.log('error in creating table', error.message),
      );
    });
  };

  const handleProfileDeletion = function () {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE from user WHERE id=?',
        [values.id],
        (txOb, result) => {
          console.log('record deleted successfully ', result.rowsAffected);
          if(result.rowsAffected > 0) {
            navigation.navigate('Landing')
          }else {
            Alert.alert('something went wrong! try again later')
          }
        },
        (txObj, error) => {
          console.log('something went wrong! try again later');
        },
      );
    });
  };

  const { handleChange, values, setValues, setFieldValue } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      orderStatus: false,
      passwordChanges: false,
      specialOffer: false,
      newsLetter: false,
    },
  });

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM user',
        null,
        (txObj, result) => {
          const profileRecord = result.rows._array[0];
          setValues(profileRecord);
          console.log(profileRecord);
        },
        (txObj, error) => {
          Alert.error(error.message);
        },
      );
    });
  }, []);

  return (
    <SafeAreaWrapper>
      <View style={styles.profileContainer}>
        <View style={styles.profileAvatar}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/Profile.png')}
              style={styles.image}
            />
          </View>
          <Button
            buttonStyle={styles.changeButton}
            onPress={() => setIsEditable(!isEditable)}>
            Change
          </Button>
          <Button
            buttonStyle={styles.removeButton}
            textStyle={styles.removeButtonText}
            onPress={handleProfileDeletion}>
            Remove
          </Button>
        </View>

        <View>
          <InputField
            placeholder="First name e.g Kelly"
            label="First Name"
            onChange={handleChange('firstName')}
            value={values.firstName}
            isEditable={isEditable}
          />
          <InputField
            placeholder="Last name e.g Joe"
            label="Last Name"
            onChange={handleChange('lastName')}
            value={values.lastName}
            isEditable={isEditable}
          />
          <InputField
            placeholder="Email e.g example@gmail.com"
            label="Email"
            onChange={handleChange('email')}
            value={values.email}
            isEditable={isEditable}
          />
          <InputField
            placeholder="Phone e.g xxx xxx xxxx"
            label="Phone"
            onChange={handleChange('phone')}
            value={values.phone}
            isEditable={isEditable}
          />
          <View>
            <Text style={styles.emailNotificationText}>
              Email Notifications
            </Text>

            <CheckBoxInput
              label="Order Status"
              value={values.orderStatus}
              onValueChange={value => {
                setFieldValue('orderStatus', value);
              }}
              isEditable={isEditable}
            />
            <CheckBoxInput
              label="Password changes"
              value={values.passwordChanges}
              onValueChange={value => {
                setFieldValue('passwordChanges', value);
              }}
              isEditable={isEditable}
            />

            <CheckBoxInput
              label="Special offers"
              value={values.specialOffer}
              onValueChange={value => {
                setFieldValue('specialOffer', value);
              }}
              isEditable={isEditable}
            />
            <CheckBoxInput
              label="Newsletter"
              value={values.newsLetter}
              onValueChange={value => {
                setFieldValue('newsLetter', value);
              }}
              isEditable={isEditable}
            />
          </View>
        </View>
        <Button
          onClick={() => {}}
          buttonStyle={{
            backgroundColor: '#f4ce15',
            marginVertical: 35,
          }}
          textStyle={{
            color: '#495E57',
          }}
          onPress={handleProfileDeletion}
          >
          Logout
        </Button>

        <View style={styles.groupButtonContainer}>
          <Button
            buttonStyle={{
              backgroundColor: 'transparent',
              borderWidth: 1.5,
              borderColor: '#495E57',
            }}
            textStyle={{
              color: '#495E57',
            }}>
            Discard changes
          </Button>
          <Button buttonStyle={{}} onPress={handleUpdateProfileDetails}>
            Save changes
          </Button>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  profileAvatar: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: hp(4.3),
  },
  imageContainer: {
    width: hp(7.3),
    height: hp(7.3),
    borderRadius: 30,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  changeButton: {
    borderRadius: 12,
    marginHorizontal: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  removeButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#495E57',
    flexGrow: 0,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 0,
  },
  removeButtonText: {
    color: '#495E57',
  },
  emailNotificationText: {
    fontSize: hp(2.5),
  },
  groupButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
