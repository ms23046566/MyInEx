import * as React from 'react';
import {Button, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
//import {onAuthStateChanged} from "firebase/auth";
//import {auth} from "../Config/Firebase";
import {useEffect} from "react";

import {auth, app, db} from '../Config/Firebase';

//import * as firebase from "firebase";

import {onAuthStateChanged} from "firebase/auth";
import {doc, setDoc, addDoc, collection, Timestamp, query, where, getDocs, deleteDoc} from "firebase/firestore";
import {LineChart} from "react-native-chart-kit";
import Moment from "moment/moment";
import DropDownPicker from "react-native-dropdown-picker";


const Separator = () => <View style={styles.separator}/>;


export default function SummeryScreen ({navigation}) {

    //const [data, setData] = React.useState([]);

    let [isLogged, setIsLogged] = React.useState(false);
    let [userID, setUserID] = React.useState('');

    //let [data, setData] = React.useState({});
    //let [data, setData] = React.useState();

    //let data;
    //let dataArray = [];
    let dataArray = [];
    let [data, setData] = React.useState([]);

    let dataArray2 = [];
    let [data2, setData2] = React.useState([]);

    const [incomeSum, setIncomeSum] = React.useState(0);
    const [expenseSum, setExpenseSum] = React.useState(0);


    const [filterFromDate, setFilterFromDate] = React.useState('01-09-2023');
    const [filterToDate, setFilterToDate] = React.useState('30-09-2023');


    //let startDateStr = filterFromDate;
    //let startDate = Moment(filterFromDate, 'YYYY-MM-DD')
    //let endDate;


    async function getData(uid) {
        // getting db data
        const query1 = query(collection(db, "transactions"), where("userID", "==", uid),
            where('type', '==', 'income'),
            where('date', '>=', new Date((Moment(filterFromDate, 'DD/MM/YYYY')))),
            where('date', '<=', new Date((Moment(filterToDate, 'DD/MM/YYYY')))));
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
        //const querySnapshot1 = await query(collection(db, "transactions"), where("userID", "==", uid));
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

        var count2 = 0.00;

        const monthlyData = querySnapshot.docs.map((doc) => {
            const transaction = doc.data();
            console.log(transaction);
            console.log(transaction.amount);
            count2 = count2 + parseFloat(transaction.amount);
            return transaction.amount;
            //console.log(transaction.amount);
        });

        setData(monthlyData);
        //NEW NEW NEW


        // Calculate the sum of incomes
        setIncomeSum(count2);

    }


    async function getData2(uid) {
        // getting db data
        const query1 = query(collection(db, "transactions"), where("userID", "==", uid),
            where('type', '==', 'expense'),
            where('date', '>=', new Date((Moment(filterFromDate, 'DD/MM/YYYY')))),
            where('date', '<=', new Date((Moment(filterToDate, 'DD/MM/YYYY')))));
        const querySnapshot = await getDocs(query1);

        let count = 0;
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            dataArray2[count] = doc.data();
            count++;
        });

        //
        //let data = querySnapshot.query.;
        //console.log(data);
        //let todoItems = {...data};
        //console.log(todoItems);
        console.log(dataArray2);

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
        //const querySnapshot1 = await query(collection(db, "transactions"), where("userID", "==", uid));
        const items = querySnapshot.docs.map(
            (doc) => //doc.data()
                ({
                    id: doc.id, // Include the document ID in your data
                    ...doc.data(), // Include the other document data
                })
        );
        console.log(items);
        setData2(items);
        console.log(data2);
        //NEW NEW NEW

        var count4 = 0.00;

        const monthlyData = querySnapshot.docs.map((doc) => {
            const transaction = doc.data();
            console.log(transaction);
            console.log(transaction.amount);
            count4 = count4 + parseFloat(transaction.amount);
            return transaction.amount;
            //console.log(transaction.amount);
        });

        setData2(monthlyData);
        //NEW NEW NEW


        // Calculate the sum of expenses
        setExpenseSum(count4);

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

                    await getData2(uid);

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



    const checkEmptyInputs = () => {
        if(filterFromDate !== '' && filterToDate !== ''){
            return true;
        }
        else{
            return false;
        }
    }

    const validateDate = (date1, date2) => {
        //only giving true if date is valid
        /*let dateL = Moment(date, 'DD/MM/YYYY');
        const now = Moment();
        console.log("dateL");
        console.log(dateL);
        console.log(dateL.year() + "." + dateL.month().toString() + "." + dateL.date());
        console.log("now");
        console.log(now);

        console.log(date);*/

        if(!(Moment(date1, 'DD/M/YYYY').isValid())){
            console.log("NOT VALID");
            return false;
        }
        else if(!(Moment(date2, 'DD/M/YYYY').isValid())){
            console.log("NOT VALID");
            return false;
        }
        else if(Moment(date2, 'DD/M/YYYY').isAfter(Moment(date1, 'DD/M/YYYY'))){
            console.log("IS AFTER");
            return true;
        }

        else{
            console.log("ELSE");
            return false;
        }
    }


    const handleSubmit = async () => {
        console.log(checkEmptyInputs());
        console.log(validateDate(filterFromDate, filterToDate));
        //console.log(validateDate(filterToDate));

        if(checkEmptyInputs() && validateDate(filterFromDate, filterToDate)){

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

                        await getData2(uid);

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

            //navigation.navigate('MyTransactions');
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

            else if (!validateDate(filterFromDate, filterToDate)){
                createTwoButtonAlert("Invalid Date", "Check your Date");
            }



        }
        console.log("drfefw");
    };


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
                    INCOME - EXPENSE SUMMERY :  {
                    (incomeSum.toFixed(2) - expenseSum.toFixed(2)).toFixed(2)
                }
                    {(Math.sign((incomeSum.toFixed(2) - expenseSum.toFixed(2)).toFixed(2)) === 1 ?
                        <Text style={styles.title}> (PROFIT)</Text>
                        :
                        <Text style={styles.title}> (LOSS)</Text>
                    )}
                </Text>


            </View>


            <View style={styles.section4}>

                <View>
                    <Text style={styles.title}>
                    </Text>


                    <Text style={styles.label}>Start Date:</Text>
                    <TextInput
                        aria-label={"Start Date"}
                        style={styles.input}
                        placeholder="Enter Date"
                        placeholderTextColor={'black'}
                        keyboardType="default"
                        onChangeText={setFilterFromDate}
                        value={filterFromDate}
                    />
                    <Text style={styles.label}>End Date:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Date"
                        placeholderTextColor={'black'}
                        keyboardType="default"
                        onChangeText={setFilterToDate}
                        value={filterToDate}
                    />




                    <View style={styles.submit}>
                        <View>

                            <TouchableOpacity
                                style={styles.buttonAdd}
                                onPress={() => handleSubmit()}
                            >
                                <Text style={styles.buttonText}>SHOW DATA</Text>
                            </TouchableOpacity>


                        </View>

                    </View>


                </View>


                <Separator/>
                <View  style={styles.section5}>
                    <Text style={styles.title}>
                        INCOME SUMMERY - TOTAL : {incomeSum.toFixed(2)}
                    </Text>


                </View>

                <View style={styles.section4}>

                    <LineChart
                        data={{
                            labels: Array.from({ length: data.length }, (_, i) => (i + 1).toString()),
                            datasets: [
                                {
                                    data: data,
                                    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Customize the line color
                                    strokeWidth: 2, // Customize the line width
                                },
                            ],
                        }}
                        width={300} // Width of the chart
                        height={200} // Height of the chart
                        yAxisSuffix=" $" // Suffix for yAxis labels
                        chartConfig={{
                            backgroundColor: 'white',
                            backgroundGradientFrom: 'white',
                            backgroundGradientTo: 'white',
                            decimalPlaces: 2, // Number of decimal places
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Customize text color
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Customize label color
                        }}
                        bezier // Enable bezier line smoothing
                    />
                </View>

                <Separator/>



                <View  style={styles.section6}>
                    <Text style={styles.title}>
                        EXPENSE SUMMERY - TOTAL : {expenseSum.toFixed(2)}
                    </Text>


                </View>

                <View style={styles.section4}>

                    <LineChart
                        data={{
                            labels: Array.from({ length: data2.length }, (_, i) => (i + 1).toString()),
                            datasets: [
                                {
                                    data: data2,
                                    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Customize the line color
                                    strokeWidth: 2, // Customize the line width
                                },
                            ],
                        }}
                        width={300} // Width of the chart
                        height={200} // Height of the chart
                        yAxisSuffix=" $" // Suffix for yAxis labels
                        chartConfig={{
                            backgroundColor: 'white',
                            backgroundGradientFrom: 'white',
                            backgroundGradientTo: 'white',
                            decimalPlaces: 2, // Number of decimal places
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Customize text color
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Customize label color
                        }}
                        bezier // Enable bezier line smoothing
                    />
                </View>

                <Separator/>




            </View>






            <Separator/>



            <View  style={styles.section3}>



                <Text style={styles.title}>

                </Text>

                <View style={styles.fixToText}>


                </View>

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
        backgroundColor: 'white',
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
    section5: {
        padding: 8,
        backgroundColor: 'darkgreen',
        color: 'white',
    },
    section6: {
        padding: 8,
        backgroundColor: 'darkred',
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

