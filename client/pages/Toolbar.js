


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
          <Text style={styles.signinBtn}>{'tr'}</Text>
        </Pressable>

        <Pressable onPress={() => this.changePage('fraudTransactions', { id: this.props.id, card: this.props.card })} style={this.props.currentPage == 'fraudTransactions' ? styles.btnColor : styles.btn} >
          <Text style={styles.signinBtn}>{'fr'}</Text>
        </Pressable>

        <Pressable onPress={() => this.changePage('Developers', { id: this.props.id, card: this.props.card })} style={this.props.currentPage == 'Developers' ? styles.btnColor : styles.btn} >
          <Text style={styles.signinBtn}>{'dev'}</Text>
        </Pressable>

        <Pressable onPress={() => this.changePage('Actions', { id: this.props.id, card: this.props.card })} style={this.props.currentPage == 'Actions' ? styles.btnColor : styles.btn} >
          <Text style={styles.signinBtn}>{'Act'}</Text>
        </Pressable>

        <Pressable onPress={() => this.changePage('Login', { id: this.props.id, card: this.props.card })} style={this.props.currentPage == 'Login' ? styles.btnColor : styles.btn} >
          <Text style={styles.signinBtn}>{'out'}</Text>
        </Pressable>

      </View>


    )

  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    paddingTop: '10%',
    flexDirection: 'row',
    height: 70
  },
  btn: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "black",
    width: "20%"
  },
  btnColor: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "black",
    width: "20%",
    backgroundColor: 'red'
  },
  signinBtn: {
    textAlign: 'center',
  }
});


export default Toolbar