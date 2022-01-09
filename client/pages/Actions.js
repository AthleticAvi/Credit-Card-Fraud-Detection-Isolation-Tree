/**
 * this file is to show the actions that the user can make
 */

import React from 'react';
import { StyleSheet, Text, View, Button, Linking, Pressable, ScrollView } from 'react-native';
import TransactionDetails from './TransactionDetails/TransactionDetails'
import axios from 'axios'
import * as IP from '../ip';

class Actions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: this.props.params
    }
  }

  ContactCreditCardCompany = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = 'telprompt:${03-6364554}';
    } else {
      number = 'tel:${03-6364554}';
    }
    Linking.openURL(number);
  }



  moveToLegit = () => {
    // if the transaction is a legitimate transaction then the 
    // user can make this action to move it from the fraud 
    // transactions to the legitimates
    // also we update the transaction status in the database
    axios.post(`http://${IP.ip}:8001/moveToLegit`, {
      transId: this.props.params.id
    }, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.data)
      .then((data) => {

        this.props.changePage('Feedback')

      })
      .catch(e => console.log('errererrr:', e))
  }

  render() {
    return (

      <ScrollView style={styles.container}>

        <Text style={styles.header}>Quick Actions</Text>
        <Text style={styles.subHeader}>We are here to protect you, here are some quick actions you could take: </Text>

        <View style={styles.BTNS}>
          <Pressable onPress={this.ContactCreditCardCompany} style={styles.Btn}><Text style={styles.btnText} >Contact credit card company</Text></Pressable>
          <Pressable onPress={this.ContactCreditCardCompany} style={styles.Btn}><Text style={styles.btnText} >Cancel credit card</Text></Pressable>

          {this.state.info.price ? (this.state.info.show ? null : <Pressable onPress={this.moveToLegit} style={styles.Btn}><Text style={styles.btnText} >Its not a fraud transaction</Text></Pressable>) : null}
        </View>

        {this.state.info.price ? <TransactionDetails info={this.state.info} /> : null}

      </ScrollView>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'

  },
  header: {
    paddingTop: 30,
    fontSize: 50,
    fontWeight: "bold",
    textAlign: 'center',
  },
  BTNS: {
    width: '100%',
    flexDirection: 'column',
    marginTop: 70,
    alignSelf: 'center'
  },
  Btn: {
    marginRight: 30,
    marginLeft: 30,
    marginTop: 30,
    borderRadius: 10,
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: 'rgb(251,187,0)',
  },
  btnText: {
    fontSize: 25,
    textAlign: 'center'
  },
  subHeader: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 30
  },
  action: {
    backgroundColor: 'rgba(100,200,60,0.8)',
    borderRadius: 10,
  },
  containerRow: {
    flexDirection: 'row',
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'rgb(251,187,0)',
    fontSize: 30,
    fontWeight: "bold",
    alignItems: 'center'
  },
  container1: {
    flexDirection: 'column',
    margin: 10,
    marginTop: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(251,187,0,0.3)',
    fontSize: 30,
    fontWeight: "bold",
    alignItems: 'center'
  },
  actionText: {
    width: 100,
    fontSize: 20,
    textAlign: 'center'
  },
  product: {
    paddingLeft: 30,
    width: '70%',
    fontSize: 20,
    color: 'white',
  },
  price: {
    textAlign: 'right',
    width: '30%',
    fontSize: 20,
    paddingRight: 20,
    color: 'white',
  }
});



export default Actions