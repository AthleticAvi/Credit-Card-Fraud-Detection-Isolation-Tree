import React from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';

class Feedback extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  returnHome = () => {
    this.props.navigation.navigate('Transactions')
  }



  render() {
    return (

      <View style={styles.container}>
        <Text style={styles.header}>Your feedback is well appreciated, thanks!</Text>
        <View style={styles.BTNS}>
          <Pressable onPress={this.returnHome} style={styles.Btn}><Text style={styles.btnText} >Home</Text></Pressable>
        </View>
      </View>
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
    width: '60%',
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
  }
});



export default Feedback