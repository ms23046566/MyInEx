import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function  ProfileScreen ({navigation, route}) {
    return <Text>This is {route.params.name}'s profile</Text>;
};