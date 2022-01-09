import React from 'react';
import { StyleSheet, Text, View, Button, Pressable, ScrollView } from 'react-native';

class TransactionDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: this.props.info
    }
  }

  render() {
    console.log(this.state)
    return (

      <Pressable style={styles.container1}>
        <Text style={styles.header}>Transaction</Text>

        <View style={styles.containerRow}>
          <Text style={styles.product}>{'category'}</Text>
          <Text style={styles.price}>{this.state.info.category}</Text>
        </View>

        <View style={styles.containerRow}>
          <Text style={styles.product}>{'merchant'}</Text>
          <Text style={styles.price}>{this.state.info.merchant}</Text>
        </View>

        <View style={styles.containerRow}>
          <Text style={styles.product}>{'time'}</Text>
          <Text style={styles.price}>{this.state.info.time}</Text>
        </View>

        <View style={styles.containerRow}>
          <Text style={styles.product}>{'date'}</Text>
          <Text style={styles.price}>{this.state.info.date}</Text>
        </View>

        <View style={styles.containerRow}>
          <Text style={styles.product}>{'amount'}</Text>
          <Text style={styles.price}>{this.state.info.price}</Text>
        </View>

      </Pressable>
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



export default TransactionDetails