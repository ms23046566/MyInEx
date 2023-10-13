import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import WelcomeScreen from "./src/WelcomeScreen";
import SummeryScreen from "./src/SummeryScreen";
import ProfileScreen from "./src/ProfileScreen";
import LoginScreen from "./src/LoginScreen";
import RegisterScreen from "./src/RegisterScreen";
import PasswordResetScreen from "./src/PasswordResetScreen";
import NewTransactionScreen from "./src/NewTransactionScreen";
import MyTransactionsScreen from "./src/MyTransactionsScreen";

import { app } from './Config/Firebase';
import EditTransactionScreen from "./src/EditTransactionScreen";

const Stack = createNativeStackNavigator();



export default function App() {

  const [count, setCount] = useState(0);

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{title: 'Welcome'}}
          />
            <Stack.Screen
                name="Summery"
                component={SummeryScreen}
                options={{title: 'Income Expense Summery'}}
            />
          <Stack.Screen
              name="NewTransaction"
              component={NewTransactionScreen}
              options={{title: 'New Transaction'}}
          />
          <Stack.Screen
              name="MyTransactions"
              component={MyTransactionsScreen}
              options={{title: 'My Transactions'}}
          />
          <Stack.Screen
              name="EditTransaction"
              component={EditTransactionScreen}
              options={{title: 'Edit Transaction'}}
          />
          <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{title: 'Login'}}
          />
          <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{title: 'Register'}}
          />
          <Stack.Screen
              name="PasswordResetScreen"
              component={PasswordResetScreen}
              options={{title: 'Password Reset'}}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
