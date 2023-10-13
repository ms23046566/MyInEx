import * as React from 'react';
import {Alert, Button, Image, SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity} from "react-native";
import {useEffect} from "react";

import {auth, app} from '../Config/Firebase';

//import * as firebase from "firebase";

import {getAuth, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
//import * as firebase from "firebase";

const Separator = () => <View style={styles.separator} />;

export default function WelcomeScreen({navigation}) {

    let [isLogged, setIsLogged] = React.useState(false);

    useEffect(() => {
        console.log(
            "Occurs ONCE, AFTER the initial render."
        );

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                console.log('Logged');
                // ...
                //isLogged = true;
                if(user.emailVerified){
                    setIsLogged(true);
                }

                //navigation.navigate('Home')
            } else {
                // User is signed out
                // ...

                console.log('Not Logged');
            }
            console.log(isLogged);
        });
    }, []);


    const signOutUser = async () => {
        try {
            await auth.signOut(); //firebase.auth().signOut();
            console.log("Sign Out Successful");

            setIsLogged(false);
            //navigation.navigate('Welcome')
        } catch (e) {
            console.log(e);
            console.log("Sign Out Unsuccessful");
        }

    }


    /*const checkLogged = async () => {
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                console.log('Logged');
                // ...
                isLogged = true;
                //navigation.navigate('Home')
            } else {
                // User is signed out
                // ...

                console.log('Not Logged');
            }
            console.log(isLogged);
            return isLogged;
        });
    }*/


    return (
        <SafeAreaView style={styles.container}><ScrollView>

            <View  style={styles.section0}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../assets/iconicon.png')}
                    /></View>

            </View>
            <View  style={styles.section2}>
                <Text style={styles.title}>
                    What is MyInEx?
                </Text>


            </View>
            <View style={styles.section1}>
                <Text style={styles.title}>
                    MyInEx is an Income-Expense Traccer and It is for You All who with to Track Incomes and Expenses in Comprehensive way. Hope this Help.
                </Text>
                <Text style={styles.title}>

                </Text>



            </View>
            <Separator/>


            {isLogged ?
                (<View>

                    <View  style={styles.featureSection0}>
                        <Text style={styles.title}>
                            Summery
                        </Text>
                    </View>

                    <View style={styles.featureSection1}>
                        <Text style={styles.title}>
                            The title and onPress handler are required. It is recommended to set
                            accessibilityLabel to help make your app usable by everyone.
                        </Text>
                        <Text style={styles.title}>

                        </Text>
                        <TouchableOpacity
                            style={styles.buttonLogin}
                            onPress={() => navigation.navigate('Summery')}
                        >
                            <Text style={styles.buttonText}>SUMMERY</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>

                        </Text>

                    </View>
                    <Separator/>

                    <View  style={styles.featureSection0}>
                        <Text style={styles.title}>
                            New Transaction
                        </Text>
                    </View>

                    <View style={styles.featureSection1}>
                        <Text style={styles.title}>
                            The title and onPress handler are required. It is recommended to set
                            accessibilityLabel to help make your app usable by everyone.
                        </Text>
                        <Text style={styles.title}>

                        </Text>
                        <TouchableOpacity
                            style={styles.buttonLogin}
                            onPress={() => navigation.navigate('NewTransaction')}
                        >
                            <Text style={styles.buttonText}>NEW TRANSACTION</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>

                        </Text>

                    </View>
                    <Separator/>

                    <View  style={styles.featureSection0}>
                        <Text style={styles.title}>
                            My Transactions
                        </Text>
                    </View>

                    <View style={styles.featureSection1}>
                        <Text style={styles.title}>
                            The title and onPress handler are required. It is recommended to set
                            accessibilityLabel to help make your app usable by everyone.
                        </Text>
                        <Text style={styles.title}>

                        </Text>
                        <TouchableOpacity
                            style={styles.buttonLogin}
                            onPress={() => navigation.navigate('MyTransactions')}
                        >
                            <Text style={styles.buttonText}>MY TRANSACTIONS</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>

                        </Text>

                    </View>
                    <Separator/>




                </View>)
                :
                (
                    <View style={styles.fixToText}>


                    </View>
                )


            }




            <View  style={styles.section2}>
                <Text style={styles.title}>
                    Features
                </Text>


            </View>
            <View  style={styles.section1}>

                <Text style={styles.description}>
                    1. Insert Incomes aligned with date and time.
                </Text>
                <Text style={styles.description}>
                    2. Insert Expenses aligned with date and time.
                </Text>
                <Text style={styles.description}>
                    3. Can view all the incomes and expenses in one screen.
                </Text>
                <Text style={styles.description}>
                    4. Can get a filtered and more summerized graphical chart view regarding all the incomes and expenses between date range.
                </Text>

                <Text style={styles.description}>

                </Text>

                {isLogged ?
                    (
                        <View>
                            <Separator/>
                            <Text style={styles.title}>

                            </Text>
                            <TouchableOpacity
                                style={styles.buttonLogout}
                                onPress={() => signOutUser()}
                            >
                                <Text style={styles.buttonLogoutText}>LOGOUT</Text>
                            </TouchableOpacity>
                            <Text style={styles.title}>

                            </Text>

                        </View>)
                    :
                    (
                        <View>
                        <View style={styles.fixToText}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    // Handle button press
                                    navigation.navigate('Register');
                                }}
                            >
                                <Text style={styles.buttonText}>REGISTER</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    // Handle button press
                                    navigation.navigate('Login');
                                }}
                            >
                                <Text style={styles.buttonText}>LOGIN</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fixToText}>
                            <Text style={styles.buttonText}>

                            </Text>
                        </View>

                        </View>
                    )
                }
            </View>















            <View  style={styles.section2}>
                <Text style={styles.title}>
                    About MyInEx
                </Text>


            </View>
            <View  style={styles.section1}>

                <Text style={styles.title}>
                    MyInEx 1.0.0
                </Text>
                <Text style={styles.title}>
                    Created by W. K. N. Weerasekara
                </Text>
                <Text style={styles.title}>
                    MS23046566
                </Text>

                <Text style={styles.title}>

                </Text>

                <View style={styles.fixToText}>

                    <Button
                        color={'darkgreen'}
                        title="Privacy Policy"
                        onPress={() => Alert.alert('Left button pressed')}
                    />
                    <Button
                        color={'darkgreen'}
                        title="Terms & Conditions"
                        onPress={() => Alert.alert('Right button pressed')}
                    />
                </View>

            </View>




            <View  style={styles.section3}>



                <Text style={styles.title}>

                </Text>

                <View style={styles.fixToText}>


                </View>

            </View>


        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
        backgroundColor: 'green',
    },
    section0: {
        padding: 8,
        backgroundColor: '#ffffff',
        color: 'white',
    },
    section1: {
        padding: 8,
        backgroundColor: 'green',
        color: 'white',
    },
    section2: {
        padding: 8,
        backgroundColor: 'black',
        color: 'white',
    },
    section3: {
        padding: 8,
        backgroundColor: 'white',
        color: 'white',
    },
    featureSection0: {
        padding: 8,
        backgroundColor: 'black',
        color: 'white',
    },
    featureSection1: {
        padding: 8,
        backgroundColor: 'maroon',
        color: 'black',
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        color: 'white',
    },
    description: {
        textAlign: 'left',
        marginVertical: 8,
        color: 'white',
    },
    button: {
        width: 100,
        backgroundColor: 'white',
        padding: 10,
        borderColor: 'black', // Set the border color for the outline
        borderWidth: 1, // Set the border width
        borderRadius: 10, // Set the border radius for rounded corners
    },
    buttonLogout: {
        //width: 100,
        backgroundColor: 'white',
        //padding: 10,
        borderColor: 'black', // Set the border color for the outline
        borderWidth: 1, // Set the border width
        borderRadius: 10, // Set the border radius for rounded corners
    },
    buttonLogin: {
        //width: 100,
        backgroundColor: 'white',
        //padding: 10,
        borderColor: 'black', // Set the border color for the outline
        borderWidth: 1, // Set the border width
        borderRadius: 10, // Set the border radius for rounded corners
    },
    buttonResetPassword: {
        //width: 100,
        backgroundColor: 'white',
        margin: 20,
        borderColor: 'black', // Set the border color for the outline
        borderWidth: 1, // Set the border width
        borderRadius: 10, // Set the border radius for rounded corners
    },
    buttonText: {
        textAlign: 'center',
        marginVertical: 8,
        color: 'black',
    },
    buttonLogoutText: {
        textAlign: 'center',
        marginVertical: 8,
        color: 'red',
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#ffffff',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tinyLogo: {
        flexDirection: 'column',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        width: 200,
        height: 80,
    },
});



