/**
 * this file is to simulate the buying with credit card process
 */

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { TextInput, StyleSheet, Text, View, Pressable, Alert, ScrollView } from 'react-native';
import axios from 'axios'
import TransactionDetails from './TransactionDetails/TransactionDetails'
import * as IP from '../ip';


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
      legitimate: null,
      id: this.props.params.id,
      transaction: null,
      transactionAvailable: false
    }

  }

  goToActions = () => {
    this.props.changePage('Actions', this.state.transaction)
  }

  submit = async (f) => {
    /**
     * getting transaction from the database and applying the algorithm and then receiving the result with the transaction
     */
    this.setState({
      legitimate: null,
      transaction: null,
      transactionAvailable: false
    })
    await axios.post(`http://${IP.ip}:8001/developers`, {
      isFraud: f,
      id: this.state.id
    }, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.data)
      .then((data) => {
        if (data['available']) {
          // if there is no transaction available in the database
          this.setState({
            transaction: data['transaction'],
            legitimate: data['prediction'],
            transactionAvailable: true
          })
          if (data['prediction'] == -1) {
            // if the transaction detected as fraud
            this.schedulePushNotification('Fraud Alert', 'There is a fraud transaction detected from your credit card. click to see details');
          }
        } else {
          Alert.alert('No transactions available in the dataset')
        }

      })
      .catch(e => console.log('errrr:', e))

  }

  fraud = () => {
    // if we want to simulate a fraud transaction
    this.submit(1)
  }

  legitimate = () => {
    // if we want to simulate a legitimate transaction
    this.submit(0)
  }


  async schedulePushNotification(title, body) {
    // making notification in case we detected a fraud transaction
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


  render() {

    let str = null

    if (this.state.legitimate == -1)
      // preparing the message we want to show the developer after simulating the buying process
      str = "model's prediction: fraud transaction"
    else {
      str = "model's prediction: legitimate transaction"
    }

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
            <Text style={styles.signinBtn}>{str}</Text>
            <TransactionDetails info={this.state.transaction} />

          </View>

        ) : null}


      </ScrollView>
    )
  }
}

//  function requestNotification() {

// }


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