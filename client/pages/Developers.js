import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { TextInput, StyleSheet, Text, View,  Pressable,  Alert, ScrollView } from 'react-native';
import axios from 'axios'
import TransactionDetails from './TransactionDetails/TransactionDetails'


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
class Developers extends React.Component {
  constructor(props) {

    super(props)
    this.state = {
      isFraud: null,
      id: this.props.params.id,
      transaction: null,
      transactionAvailable: false
    }

  // const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // const [notificationTitle, setNotificationTitle] = useState('notification');
  // const [notificationBody, setNotificationBody] = useState('notification body');
  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);
  }

  submit = async (f) => {
    this.setState({
      isFraud: null,
      transaction: null,
      transactionAvailable: false
    })
    await axios.post('http://10.0.0.23:8001/developers', {
      isFraud: f,
      id: this.state.id
    }, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.data)
      .then((data) => {
        if (data['available']) {
          this.setState({
            transaction: data['transaction'],
            result: data['prediction'],
            transactionAvailable: true
          })
          if (data['prediction' == -1]){
            //schedulePushNotification('notificationTitle', 'notificationBody');
          }
        } else {
          Alert.alert('No transactions available in the dataset')
        }

      }).catch(e => console.log('errrr:', e))

  }

  fraud = () => {
    this.setState({
      isFraud: 1
    })
    this.submit(1)
  }

  legitimate = () => {
    this.setState({
      isFraud: 0
    })
    this.submit(0)
  }

  render() {

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Choose Transaction</Text>

        <Pressable onPress={this.fraud} style={styles.btn} text='Sign In'>
          <Text style={styles.signinBtn}>{'Fraud'}</Text>
        </Pressable>

        <Pressable onPress={this.legitimate} style={styles.btn} text='Sign In'>
          <Text style={styles.signinBtn}>{'Legitimate'}</Text>
        </Pressable>

        {this.state.transactionAvailable ? (
          <View>
            <Text style={styles.signinBtn}>{"model's prediction: " + this.state.transaction.prediction == -1 ? 'fraud transaction' : 'legitimate transaction'}</Text>
            <TransactionDetails info={this.state.transaction} />

          </View>

        ) : null}
          

      </ScrollView>
    )
  }
}

//  function requestNotification() {
  
// }

async function schedulePushNotification(title, body) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { data: 'goes here' },
      sound: 'default' | null,
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: '40%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    fontSize: 50,
    fontWeight: "bold"
  },
  btn: {
    marginTop: 20,
    width: 200,
    height: 50,
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: 'rgb(251,187,0)'
  },
  signinBtn: {
    fontSize: 30,
    textAlign: 'center',
  },
});



export default Developers