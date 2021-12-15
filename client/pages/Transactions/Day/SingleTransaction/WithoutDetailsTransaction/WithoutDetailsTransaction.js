
import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

class WithoutDetailsTransaction extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {

    return (
      <Pressable onPress={this.props.changeShow} style={styles.container}>
        <Text style={styles.product}>{this.props.info.category}</Text>
        <Text style={styles.price}>{this.props.info.price + ' $'}</Text>
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'rgb(251,187,0)',
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



export default WithoutDetailsTransaction