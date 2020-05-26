/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {setTestId} from '../helpers/setTestId';

const Auth = () => {
  const [message, setMessage] = useState(null);

  return (
    <SafeAreaView style={[styles.container]} {...setTestId('auth__container')}>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={Yup.object({
          email: Yup.string().email().required('Invalid email'),
          password: Yup.string()
            .matches(/^[A-Za-z0-9_-]+$/, 'Invalid password')
            .required('Password required'),
        })}
        onSubmit={(values, formikActions) => {
          console.log(values);
          setMessage('Logged in successfully');
        }}>
        {(props) => (
          <>
            <View {...setTestId('lbl_title')}>
              <Text>Login</Text>
            </View>
            <TextInput
              style={[
                styles.textInput,
                {
                  borderBottomColor:
                    props.touched.email && props.errors.email ? 'red' : 'grey',
                },
              ]}
              onChangeText={props.handleChange('email')}
              onBlur={props.handleBlur('email')}
              keyboardType="email-address"
              placeholder="Email"
              value={props.values.email}
              accessibilityLabel="login_input_email"
              {...setTestId('login_input_email')}
            />
            <TextInput
              style={[styles.textInput]}
              onChangeText={props.handleChange('password')}
              onBlur={props.handleBlur('password')}
              placeholder="Password"
              value={props.values.password}
              secureTextEntry
              {...setTestId('login_input_password')}
            />

            <View accessibilityLabel="lbl_message">
              <Text {...setTestId('btn_login')}>{message}</Text>
            </View>

            <TouchableWithoutFeedback
              {...setTestId('btn_login')}
              onPress={() => {
                const error = props.errors.email
                  ? props.errors.email
                  : props.errors.password;
                props.isValid ? props.handleSubmit() : setMessage(error);
              }}>
              <Text style={[styles.btn_login]}>LOGIN</Text>
            </TouchableWithoutFeedback>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c7ccd1',
  },
  textInput: {
    width: '90%',
    borderBottomWidth: 1,
    fontSize: 20,
    marginVertical: 8,
    padding: 1,
    height: 30,
  },
  btn_login: {
    marginVertical: 5,
    backgroundColor: '#306647',
    color: '#fff',
    padding: 10,
    textAlign: 'center',
    width: '80%',
    borderRadius: 5,
  },
});

export default Auth;
