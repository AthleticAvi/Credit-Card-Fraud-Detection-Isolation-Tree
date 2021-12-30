


import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';




class Toolbar extends React.Component {



  changePage = (page, params) => {
    this.props.changePage(page, params)

  }

  render() {
    return (
      <View style={styles.container}>

        <Pressable onPress={() => this.changePage('Transaction', { id: this.props.id, card: this.props.card })} style={this.props.currentPage == 'Transaction' ? styles.btnColor : styles.btn} >
          <Text style={styles.signinBtn}>{'Transactions'}</Text>
        </Pressable>

        <Pressable onPress={() => this.changePage('fraudTransactions', { id: this.props.id, card: this.props.card })} style={this.props.currentPage == 'fraudTransactions' ? styles.btnColor : styles.btn} >
          <Text style={styles.signinBtn}>{'Frauds'}</Text>
        </Pressable>

        <Pressable onPress={() => this.changePage('Developers', { id: this.props.id, card: this.props.card })} style={this.props.currentPage == 'Developers' ? styles.btnColor : styles.btn} >
          <Text style={styles.signinBtn}>{'Simulation'}</Text>
        </Pressable>

        <Pressable onPress={() => this.changePage('Actions', { id: this.props.id, card: this.props.card })} style={this.props.currentPage == 'Actions' ? styles.btnColor : styles.btn} >
          <Text style={styles.signinBtn}>{'Actions'}</Text>
        </Pressable>

        <Pressable onPress={() => this.changePage('Login', { id: this.props.id, card: this.props.card })} style={this.props.currentPage == 'Login' ? styles.btnColor : styles.btn} >
          <Text style={styles.signinBtn}>{'Logout'}</Text>
        </Pressable>

      </View>


    )

  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: '10%',
    flexDirection: 'row',
    height: 100,
    flexWrap: 'wrap',
    alignItems: "center",
    justifyContent: "space-around"

  },
  btn: {
    borderRadius: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "black",
    width: "30%",
    backgroundColor: 'rgba(200,187,200,0.3)',
    margin: "1%"
  },
  btnColor: {
    borderRadius: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "black",
    width: "30%",
    backgroundColor: 'rgb(251,187,0)',
    margin: "1%"
  },
  signinBtn: {
    textAlign: 'center',
  }
});


export default Toolbar