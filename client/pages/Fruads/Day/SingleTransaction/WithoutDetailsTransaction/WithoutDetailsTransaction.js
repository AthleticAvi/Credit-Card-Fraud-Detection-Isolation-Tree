
import React from 'react';
import { StyleSheet, Text, Pressable, View, Alert } from 'react-native';

class WithoutDetailsTransaction extends React.Component {
  constructor(props) {
    super(props)
  }

  action = () => {
    this.props.changePage('Actions', this.props.info)
  }


  render() {

    return (
      <View style={styles.container}>
        <Pressable style={styles.productAndPriceContainer} onPress={this.props.changeShow} >
          <Text style={styles.product}>{this.props.info.category}</Text>
          <Text style={styles.price}>{this.props.info.price + ' $'}</Text>
        </Pressable>

        <Pressable
          style={
            {
              backgroundColor: this.props.info.notified ? 'rgba(100,200,60,0.8)' : 'rgb(251,187,0)',
              borderRadius: 10,
            }
          }
          onPress={!this.props.info.notified ? this.action : null}
        >
          <Text style={styles.actionText}>{this.props.info.notified ? 'Notified' : 'Action'}</Text>
        </Pressable>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  actionText: {
    fontSize: 20,
    padding: 10,
  },
  productAndPriceContainer: {
    flexDirection: 'row',
    width: '70%',
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'rgb(251,100,0)',
    fontSize: 30,
    fontWeight: "bold",
    alignItems: 'center'
  },
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    fontSize: 30,
    fontWeight: "bold",
    alignItems: 'center'
  },
  product: {
    padding: 10,
    paddingLeft: 30,
    width: '60%',
    fontSize: 15,
    color: 'white',
  },
  price: {
    padding: 10,
    textAlign: 'right',
    width: '40%',
    fontSize: 15,
    paddingRight: 20,
    color: 'white',
  }
});



export default WithoutDetailsTransaction