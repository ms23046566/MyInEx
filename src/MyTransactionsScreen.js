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
    FlatList, TouchableOpacity
} from "react-native";
import {useEffect} from "react";

import {auth, app, db} from '../Config/Firebase';

//import * as firebase from "firebase";

import {onAuthStateChanged} from "firebase/auth";
import {doc, setDoc, addDoc, collection, Timestamp, query, where, getDocs, deleteDoc} from "firebase/firestore";


//import DateTimePicker from '@react-native-community/datetimepicker';

//import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';


import DropDownPicker from "react-native-dropdown-picker";
import Moment from "moment";
//import RNDateTimePicker from "@react-native-community/datetimepicker";
//import * as firebase from "firebase";

const Separator = () => <View style={styles.separator}/>;


export default function MyTransactionsScreen({navigation}) {


    let [isLogged, setIsLogged] = React.useState(false);
    let [userID, setUserID] = React.useState('');

    //let [data, setData] = React.useState({});
    //let [data, setData] = React.useState();

    //let data;
    let dataArray = [];
    let [data, setData] = React.useState([]);


    //newww
    const [todos, setTodos] = React.useState({});
    const [presentTodo, setPresentTodo] = React.useState('');
    const todosKeys = Object.keys(todos);

    const [campaign, setCampaigns] = React.useState([]);

    /*
     return onValue(ref(db, '/todos'), querySnapShot => {
          let data = querySnapShot.val() || {};
          let todoItems = {...data};
          setTodos(todoItems);
        });
     */


    async function getData(uid) {
        // getting db data
        const query1 = query(collection(db, "transactions"), where("userID", "==", uid));
        const querySnapshot = await getDocs(query1);

        let count = 0;
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            dataArray[count] = doc.data();
            count++;
        });

        //
        //let data = querySnapshot.query.;
        //console.log(data);
        //let todoItems = {...data};
        //console.log(todoItems);
        console.log(dataArray);

        //setData(dataArray.push(new Object()));
        //data = dataArray;

        //
        //console.log(data);
        //setTodos(todoItems);
        //


        //NEWWWW
        //console.log(querySnapshot.docs.length);
        //setCampaigns(dataArray);
        //console.log(campaign);


        //NEW NEW NEW
        const querySnapshot1 = await query(collection(db, "transactions"), where("userID", "==", uid));
        const items = querySnapshot.docs.map(
            (doc) => //doc.data()
                ({
                    id: doc.id, // Include the document ID in your data
                    ...doc.data(), // Include the other document data
                })
        );
        console.log(items);
        setData(items);
        console.log(data);
        //NEW NEW NEW

    }

    useEffect(() => {
        console.log(
            "Occurs ONCE, AFTER the initial render."
        );

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                console.log('Logged');
                // ...
                //isLogged = true;
                if (user.emailVerified) {
                    setIsLogged(true);
                    setUserID(uid);


                    await getData(uid);

                    //console.log(campaign);



                } else {
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


    async function deleteTransaction(id) {
        //return Promise.resolve(undefined);
        await deleteDoc(doc(db, "transactions", id));

        navigation.navigate('Welcome');
    }

    const deleteButtonAlert = (title, message, id) =>
        Alert.alert(title, message, [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: async () => await deleteTransaction(id)
            },
        ]);


    const createTwoButtonAlert = (title, message) =>
        Alert.alert(title, message , [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => console.log('OK Pressed')},
        ]);


    return (
        <SafeAreaView style={styles.container}>

            <View  style={styles.section0}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../assets/iconicon.png')}
                    /></View>

            </View>
            <View  style={styles.section2}>
                <Text style={styles.title}>
                    MY TRANSACTIONS
                </Text>


            </View>


            <View style={styles.section4}>

                <FlatList
                    data={data}

                    keyExtractor={(item) => item} // You might need to adjust this depending on your Firestore structure
                    renderItem={({item}) => (
                        <View key={item}>


                            <View>

                                <Text style={styles.amount}>
                                    {item.currency.toUpperCase()} {(parseFloat(item.amount)).toFixed(2)}
                                </Text>
                                <Text style={styles.type}>
                                    {item.type}
                                </Text>
                                <Text style={styles.date}>
                                    {item.date.toDate().toLocaleString()}
                                </Text>
                                <Text style={styles.itemDescription}>
                                    {item.description}
                                </Text>
                                <Text style={styles.remarks}>
                                    {item.remarks}
                                </Text>





                                <Text style={styles.timestamp}>
                                    Last updated: {item.updated.toDate().toLocaleString()}
                                </Text>

                                <View style={styles.fixToText}>

                                    <TouchableOpacity
                                        style={styles.buttonEdit}
                                        onPress={() => navigation.navigate('EditTransaction', {id: item.id, date: item.date, type: item.type, description: item.description, currency: item.currency, amount: item.amount, remarks: item.remarks})}
                                    >
                                        <Text style={styles.buttonTextWhite}>EDIT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.buttonDelete}
                                        onPress={() => deleteButtonAlert("Delete Transaction", "Are you sure you want to delete the selected Transaction?", item.id)}
                                    >
                                        <Text style={styles.buttonTextWhite}>DELETE</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <Separator/>
                        </View>

                    )}
                />

            </View>




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
    buttonEdit: {
        width: 100,
        backgroundColor: 'darkorange',
        padding: 10,
        borderColor: 'white', // Set the border color for the outline
        borderWidth: 1, // Set the border width
        borderRadius: 10, // Set the border radius for rounded corners
    },
    buttonDelete: {
        width: 100,
        backgroundColor: 'red',
        padding: 10,
        borderColor: 'white', // Set the border color for the outline
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
    buttonTextWhite: {
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
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#000000',
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
    inputMultiline: {
        //height: 40,
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
    dropdown: {
        alignSelf: "center",
        height: 40,
        margin: 12,
        padding: 10,
        width: 300,
    },

    amount: {
        textAlign: 'right',
        fontWeight: 'bold',
        color: 'red',
    },
    type: {
        textAlign: 'right',
        //fontWeight: 'bold',
        fontStyle: 'italic',
        color: 'red',
    },
    date: {
        textAlign: 'left',
        fontWeight: 'bold',
        //fontStyle: 'italic',
        color: 'black',
    },
    itemDescription: {
        padding: 5,
        textAlign: 'left',
        //fontWeight: 'bold',
        //fontStyle: 'italic',
        color: 'black',
    },
    remarks: {
        padding: 5,
        textAlign: 'left',
        //fontWeight: 'bold',
        //fontStyle: 'italic',
        color: 'gray',
    },
    timestamp: {
        padding: 5,
        textAlign: 'left',
        //fontWeight: 'bold',
        //fontStyle: 'italic',
        color: 'gray',
    },
});

