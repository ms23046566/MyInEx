import * as React from 'react';
import {
    Alert,
    Button,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import {auth, db} from "../Config/Firebase";

import { doc, setDoc, Timestamp } from "firebase/firestore";

const Separator = () => <View style={styles.separator} />;

export default function RegisterScreen ({navigation}) {

    const [text, onChangeText] = React.useState('Useless Text');
    const [number, onChangeNumber] = React.useState('');

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState('');

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
        if(email !== '' && password !== '' && passwordConfirmation !== ''){
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

    const checkParsswordMatch = (password, passwordConfirmation) => {
        //only giving true if passwords match
        if(password === passwordConfirmation){
            return true;
        }
        else{
            return false;
        }
    }

    const handleSubmit = async () => {

        console.log(checkEmptyInputs());
        console.log(validateEmail(email));
        console.log(checkParsswordMatch(password, passwordConfirmation));

        if(checkEmptyInputs() && validateEmail(email) && checkParsswordMatch(password, passwordConfirmation)){
            await createUserWithEmailAndPassword(auth, email.toLowerCase(), password).then(async (userCredential) => {
                // Success
                const user = userCredential.user;
                // ...

                await sendEmailVerification(user);

                console.log(user)
                setEmail('');
                setPassword('');
                setPasswordConfirmation('');

                //DB
                const docData = {
                    userID: user.uid.toString(),
                    email: user.email.toString().toLowerCase(),
                    created: Timestamp.now(),
                    updated: Timestamp.now()
                };
                await setDoc(doc(db, "users", user.uid.toString()), docData);

                navigation.navigate('Login');
            })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    createTwoButtonAlert("Cannot Login", errorMessage.toString())
                    console.log("ERRRO")
                    console.log(error)

                });
        }
        else{
            if(!checkEmptyInputs){
                createTwoButtonAlert("Empty Inputs", "Please fill all the input fields");
            }
            else if(!validateEmail(email) && !checkParsswordMatch(password, passwordConfirmation)){
                createTwoButtonAlert("Invalid Email & Password", "Check your Email and Password");
            }
            else if (!validateEmail(email)){
                createTwoButtonAlert("Invalid Email", "Check your Email");
            }
            else if (!checkParsswordMatch(password, passwordConfirmation)){
                createTwoButtonAlert("Password Confirmation Not Match", "Your Password confirmation not matched with Password You entered!");
            }

        }

        /**/


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
                REGISTER
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

                <Text style={styles.label}>Password Confirmation:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password Confirmation"
                    placeholderTextColor={'white'}
                    onChangeText={setPasswordConfirmation}
                    value={passwordConfirmation}
                    secureTextEntry
                />



                <View style={styles.submit}>
                    <View>

                        <TouchableOpacity
                            style={styles.buttonLogin}
                            onPress={() => handleSubmit()}
                        >
                            <Text style={styles.buttonText}>REGISTER</Text>
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
                Already Registered?
            </Text>

            <TouchableOpacity
                style={styles.buttonResetPassword}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.buttonLogoutText}>LOGIN</Text>
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
