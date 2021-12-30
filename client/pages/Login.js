import React from 'react';
import { TextInput, StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import axios from 'axios'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      card: null,
      id: null,
    }
  }

  submit = () => {

    axios.post('http://192.168.1.15:8001/login', {
      id: this.state.id,
      card: this.state.card
    }, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.data)
      .then((data) => {

        if (data['correct']) {
          let params = {
            card: this.state.card,
            id: this.state.id
          }
          this.props.setCardAndId(this.state.id, this.state.card)
          this.props.changePage('Transaction', params)
        } else {

          Alert.alert('id or card number is not correct')
        }

      })
      .catch(e => console.log('errererrr:', e))
  }

  changeId = (value) => {
    this.setState({
      id: value
    })
  }

  changeCard = (value) => {
    this.setState({
      card: value
    })
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.header}>Sign In</Text>

        <TextInput
          //secureTextEntry={true}
          name='card'
          placeholder=" Credit Card Number"
          style={styles.input}
          onChangeText={value => this.changeCard(value)}
        />
        <TextInput
          //secureTextEntry={true}
          name='id'
          placeholder="ID Number"
          style={styles.input}
          onChangeText={value => this.changeId(value)}
        />
        <Pressable onPress={this.submit} style={styles.btn} text='Sign In'>
          <Text style={styles.signinBtn}>{'Sign In'}</Text>
        </Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: '40%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    fontSize: 50,
    fontWeight: "bold"
  },
  input: {
    marginTop: 20,
    textAlign: 'center',
    width: 200,
    height: 40,
    fontSize: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(65, 63, 59,0.2)'
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



export default Login