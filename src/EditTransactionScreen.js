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
import {useEffect} from "react";

import {auth, app, db} from '../Config/Firebase';

//import * as firebase from "firebase";

import {onAuthStateChanged} from "firebase/auth";
import {doc, setDoc, addDoc, collection, Timestamp} from "firebase/firestore";

//import DateTimePicker from '@react-native-community/datetimepicker';

//import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';



import DropDownPicker from "react-native-dropdown-picker";
import Moment from "moment";
//import RNDateTimePicker from "@react-native-community/datetimepicker";
//import * as firebase from "firebase";

const Separator = () => <View style={styles.separator} />;

export default function EditTransactionScreen ({navigation, route}) {



    const [date, setDate] = React.useState(route.params.date.toDate());
    const [description, setDescription] = React.useState(route.params.description);

    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState(route.params.type);
    const [items, setItems] = React.useState([
        {label: 'Income', value: 'income'},
        {label: 'Expense', value: 'expense'}
    ]);

    const [openC, setOpenC] = React.useState(false);
    const [currency, setCurrency] = React.useState(route.params.currency);
    const [itemsC, setItemsC] = React.useState([
        {label: 'USD', value: 'usd'},
        {label: 'LKR', value: 'lkr'}
    ]);

    const [amount, setAmount] = React.useState(route.params.amount);
    const [remarks, setRemarks] = React.useState(route.params.remarks);

    let [isLogged, setIsLogged] = React.useState(false);
    let [userID, setUserID] = React.useState('');



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
                    setUserID(uid);
                }
                else{
                    navigation.navigate('Welcome');
                }

                //navigation.navigate('Home')
            } else {
                // User is signed out
                // ...
                navigation.navigate('Welcome');

                console.log('Not Logged');
            }
            console.log(isLogged);
        });
    }, []);




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
        if(date !== '' && description !== '' && type !== ''){
            return true;
        }
        else{
            return false;
        }
    }

    const validateDate = (date) => {
        //only giving true if date is valid
        /*let dateL = Moment(date, 'DD/MM/YYYY');
        const now = Moment();
        console.log("dateL");
        console.log(dateL);
        console.log(dateL.year() + "." + dateL.month().toString() + "." + dateL.date());
        console.log("now");
        console.log(now);

        console.log(date);*/

        if(!(Moment(date, 'DD/M/YYYY').isValid())){
            console.log("NOT VALID");
            return false;
        }
        else if(Moment(date, 'DD/M/YYYY').isAfter(new Date())){
            console.log("IS AFTER");
            return false;
        }
        else if(Moment(date, 'DD/M/YYYY').isBefore(new Date())){
            console.log("IS BEFORE");
            return true;
        }
        else{
            console.log("ELSE");
            return false;
        }
    }

    const handleSubmit = async () => {
        console.log(checkEmptyInputs());
        console.log(validateDate(date));

        if(checkEmptyInputs() && validateDate(date)){

            //DB
            const docData = {
                userID: userID.toString(),
                date: date,
                type: type,
                description: description,
                currency: currency,
                amount: amount,
                remarks: remarks,
                created: Timestamp.now(),
                updated: Timestamp.now()
            };
           // await addDoc(collection(db, "transactions"), docData);
            await setDoc(doc(db, "transactions", route.params.id), docData);

            setDate('');
            setType('');
            setDescription('');
            setCurrency('');
            setAmount('');
            setRemarks('');



            navigation.navigate('Welcome');


            /*await signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
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
                });*/


        }
        else{
            if(!checkEmptyInputs){
                createTwoButtonAlert("Empty Inputs", "Please fill all the input fields");
            }

            else if (!validateDate(date)){
                createTwoButtonAlert("Invalid Date", "Check your Date");
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
                    EDIT TRANSACTION
                </Text>


            </View>


            <View style={styles.section4}>

                <View>
                    <Text style={styles.title}>

                    </Text>

                    <Text style={styles.label}>Date:</Text>


                    <TextInput
                        style={styles.input}
                        placeholder="Enter Date"
                        placeholderTextColor={'black'}
                        keyboardType="default"
                        onChangeText={setDate}
                        value={date}
                    />
                    <Text style={styles.label}>Type (Income / Expense):</Text>
                    <DropDownPicker
                        style={styles.dropdown}
                        placeholder={"Select Transaction Type"}
                        placeholderTextColor={'black'}
                        open={open}
                        value={type}
                        items={items}
                        setOpen={setOpen}
                        setValue={setType}
                        setItems={setItems}
                    />

                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                        style={styles.inputMultiline}
                        multiline
                        numberOfLines={4}
                        placeholder="Enter description"
                        placeholderTextColor={'black'}
                        keyboardType="default"
                        onChangeText={setDescription}
                        value={description}
                    />



                    <Text style={styles.label}>Currency (LKR / USD):</Text>
                    <DropDownPicker
                        style={styles.dropdown}
                        placeholder={"Select Currency"}
                        placeholderTextColor={'black'}
                        open={openC}
                        value={currency}
                        items={itemsC}
                        setOpen={setOpenC}
                        setValue={setCurrency}
                        setItems={setItemsC}
                    />

                    <Text style={styles.label}>Amount:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter amount"
                        placeholderTextColor={'black'}
                        keyboardType="numeric-pad"
                        onChangeText={setAmount}
                        value={amount}
                    />
                    <Text style={styles.label}>Remarks:</Text>
                    <TextInput
                        style={styles.inputMultiline}
                        multiline
                        numberOfLines={3}
                        placeholder="Enter remarks (if you have any)"
                        placeholderTextColor={'black'}
                        keyboardType="default"
                        onChangeText={setRemarks}
                        value={remarks}
                    />



                    <View style={styles.submit}>
                        <View>

                            <TouchableOpacity
                                style={styles.buttonAdd}
                                onPress={() => handleSubmit()}
                            >
                                <Text style={styles.buttonText}>UPDATE RECORD</Text>
                            </TouchableOpacity>
                            <Text style={styles.title}>

                            </Text>

                        </View>

                    </View>


                </View>
                <Text style={styles.title}>

                </Text>



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
        //flex: 1,
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
    section4: {
        padding: 8,
        backgroundColor: 'white',
        color: 'black',
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
    buttonAdd: {
        //width: 100,
        backgroundColor: 'green',
        //padding: 10,
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
        color: 'white',
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
        color: 'black',
        //margin: 12,
        //borderWidth: 1,
        paddingLeft: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        color: 'black',
    },
    inputMultiline: {
        //height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        color: 'black',
    },
    submit: {
        height: 40,
        margin: 12,
    },
    dropdown: {
        alignSelf: "center",
        height: 40,
        margin: 12,
        padding: 10,
        width: 300,
    },
});


