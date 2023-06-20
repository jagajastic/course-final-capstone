import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from '../components/Button';
import { hp } from '../utils/responsiveSizes';
import InputField from '../components/InputField';
import { CheckBoxInput } from '../components/CheckBox';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Header from '../components/Header';
// import { createUserTable, saveUserInformation } from '../database';
import { useFormik } from 'formik';
import * as SQLite from 'expo-sqlite';

export default function Landing({ navigation }) {
  const db = SQLite.openDatabase('lemon.db');
  const handleSubmit = function () {

    db.transaction(tx => {
      console.log(Object.values(values))
      tx.executeSql(
        'INSERT INTO user (firstName, lastName, email, phone, orderStatus, passwordChanges, specialOffer, newsLetter) values (?,?,?,?,?,?,?,?)',
        Object.values(values),
        (txUbj, result) => {
          console.log('table created', result);
        },
        (txObj, error) => console.log('error in creating table', error.message),
      );
    });
      navigation.navigate('Home')
    // try {
    //   const value = Object.values(values).join(', ');
    //   console.log(value);
    //   saveUserInformation(value)
    //   navigation.navigate('Home')
    // } catch (error) {
    //   Alert.error("something went wrong, try again later")
    // }
  };

  const { handleChange, values, setFieldValue } = useFormik({
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
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'DROP TABLE IF EXISTS menuitems',
    //   );
    // });
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'DROP TABLE IF EXISTS user',
    //   );
    // });
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'DELETE from user WHERE id=1',
    //   );
    // });
    
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, firstName TEXT, lastName TEXT, email TEXT, phone TEXT, orderStatus BOOLEAN, passwordChanges BOOLEAN, specialOffer BOOLEAN, newsLetter BOOLEAN)',
      );
    });

    db.transaction( 
      tx => {
        tx.executeSql("SELECT * FROM user", null,
        (txObj, result) => {
          console.log("result.rows._array-->>>",result.rows._array);
        },
        (txObj, error) => {
          Alert.error(error.message)
        })
      }
    )
    
  }, []);

  return (
    <SafeAreaWrapper>
      <Header />
      <View style={styles.formSection}>
        <InputField
          placeholder="First name e.g Kelly"
          label="First Name"
          onChange={handleChange('firstName')}
          value={values.firstName}
        />
        <InputField
          placeholder="Last name e.g Joe"
          label="Last Name"
          onChange={handleChange('lastName')}
          value={values.lastName}
        />
        <InputField
          placeholder="Email e.g example@gmail.com"
          label="Email"
          onChange={handleChange('email')}
          value={values.email}
        />
        <InputField
          placeholder="Phone e.g xxx xxx xxxx"
          label="Phone"
          onChange={handleChange('phone')}
          value={values.phone}
        />
        <View style={styles.emailNotification}>
          <Text style={styles.emailNotificationText}>Email Notifications</Text>

          <CheckBoxInput
            label="Order Status"
            value={values.orderStatus}
            onValueChange={value => {
              setFieldValue('orderStatus', value);
            }}
          />
          <CheckBoxInput
            label="Password changes"
            value={values.passwordChanges}
            onValueChange={value => {
              setFieldValue('passwordChanges', value);
            }}
          />
          <CheckBoxInput
            label="Special offers"
            value={values.specialOffer}
            onValueChange={value => {
              setFieldValue('specialOffer', value);
            }}
          />
          <CheckBoxInput
            label="Newsletter"
            value={values.newsLetter}
            onValueChange={value => {
              setFieldValue('newsLetter', value);
            }}
          />
        </View>

        <Button
          buttonStyle={styles.nextButton}
          textStyle={styles.nextButtonText}
          onPress={handleSubmit}>
          Next
        </Button>
      </View>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    height: hp(43.84),
    padding: hp(2.7),
    marginTop: 20,
    backgroundColor: '#495E57',
  },
  heroTitle: {
    fontSize: hp(4.6),
    color: '#F4CE14',
    fontWeight: '800',
  },
  heroSubtitle: {
    fontSize: hp(2.76),
    color: 'white',
    marginBottom: hp(1.2),
    fontWeight: '600',
  },
  heroDescription: {
    fontSize: hp(2.3),
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
  formSection: {
    padding: hp(2.3),
  },
  emailNotification: {
    marginTop: hp(2.3),
  },
  emailNotificationText: {
    fontSize: hp(2.5),
  },
  notificationCheckBoxes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.5),
  },
  notificationCheckBoxesText: {
    marginLeft: hp(2.5),
    fontSize: hp(2.6),
  },
  nextButton: {
    backgroundColor: '#F4CE14',
    marginVertical: hp(6.5),
  },
  nextButtonText: {
    color: '#495E57',
  },
});
