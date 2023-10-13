import * as React from 'react';
import {
    Alert,
    Button,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    View,
    TouchableOpacity
} from "react-native";

import {auth, app} from '../Config/Firebase';

//import * as firebase from "firebase";

import {getAuth, sendEmailVerification, signInWithEmailAndPassword} from "firebase/auth";
//import * as firebase from "firebase";

const Separator = () => <View style={styles.separator} />;

export default function LoginScreen ({navigation}) {

    const [text, onChangeText] = React.useState('Useless Text');
    const [number, onChangeNumber] = React.useState('');

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const createTwoButtonAlert = (title, message) =>
        Alert.alert(title, message, [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => console.log('OK Pressed')},
        ]);

    const checkEmptyInputs = () => {
        if(email !== '' && password !== ''){
            return true;
        }
        else{
            return false;
        }
    }

    const validateEmail = (email) => {
        //only giving true if email is valid
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(email.toLowerCase());
    }

    const handleSubmit = async () => {
        console.log(checkEmptyInputs());
        console.log(validateEmail(email));

        if(checkEmptyInputs() && validateEmail(email)){
        await signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...

            console.log(user)
            setEmail('');
            setPassword('');

            if (user.emailVerified) {
                navigation.navigate('Welcome');
            } else {
                await sendEmailVerification(user);
                createTwoButtonAlert("Need Email Verification", "Please Verify Your Email Before Login!")
            }


        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("ERRRO")
                console.log(error)
            });


        }
        else{
            if(!checkEmptyInputs){
                createTwoButtonAlert("Empty Inputs", "Please fill all the input fields");
            }

            else if (!validateEmail(email)){
                createTwoButtonAlert("Invalid Email", "Check your Email");
            }


        }
        console.log("drfefw");
    };

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
                    LOGIN
                </Text>


            </View>
            <View style={styles.section1}>

                <View>
                    <Text style={styles.title}>

                    </Text>

                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter email"
                        placeholderTextColor={'white'}
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        value={email}
                    />

                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter password"
                        placeholderTextColor={'white'}
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry
                    />



                    <View style={styles.submit}>
                        <View>

                            <TouchableOpacity
                                style={styles.buttonLogin}
                                onPress={() => handleSubmit()}
                            >
                                <Text style={styles.buttonText}>LOGIN</Text>
                            </TouchableOpacity>
                            <Text style={styles.title}>

                            </Text>

                        </View>

                    </View>


                </View>
                <Text style={styles.title}>

                </Text>



            </View>

            <Separator />


            <View style={styles.section1}>

                <Text style={styles.title}>

                </Text>

                    <Text style={styles.title}>
                        Forgot Password?
                    </Text>

                <TouchableOpacity
                    style={styles.buttonResetPassword}
                    onPress={() => navigation.navigate('PasswordResetScreen')}
                >
                    <Text style={styles.buttonLogoutText}>RESET PASSWORD</Text>
                </TouchableOpacity>
                <Text style={styles.title}>

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
            <Separator />

        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
        //backgroundColor: 'green',
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
    label:{
        color: 'white',
        //margin: 12,
        //borderWidth: 1,
        paddingLeft: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        color: 'white',
    },
    submit: {
        height: 40,
        margin: 12,
    },
    otherOptions: {
        margin: 12,
        padding: 10,
    },
});
