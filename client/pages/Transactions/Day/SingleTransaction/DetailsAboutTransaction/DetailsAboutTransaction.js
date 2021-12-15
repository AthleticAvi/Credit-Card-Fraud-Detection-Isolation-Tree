
import React from 'react';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';

class DetailsAboutTransaction extends React.Component {
  constructor(props) {
    super(props)
  }

  action = () => {
    this.props.changePage('Actions', this.props.info)
  }


  render() {

    return (
      <Pressable onPress={this.props.changeShow} style={styles.container}>
        <View style={styles.containerRow}>
          <Text style={styles.product}>{'category'}</Text>
          <Text style={styles.price}>{this.props.info.category}</Text>
        </View>

        <View style={styles.containerRow}>
          <Text style={styles.product}>{'merchant'}</Text>
          <Text style={styles.price}>{this.props.info.merchant}</Text>
        </View>

        <View style={styles.containerRow}>
          <Text style={styles.product}>{'time'}</Text>
          <Text style={styles.price}>{this.props.info.time}</Text>
        </View>

        <View style={styles.containerRow}>
          <Text style={styles.product}>{'date'}</Text>
          <Text style={styles.price}>{this.props.info.date}</Text>
        </View>

        <View style={styles.containerRow}>
          <Text style={styles.product}>{'amount'}</Text>
          <Text style={styles.price}>{this.props.info.price}</Text>
        </View>

        <Pressable style={styles.action} onPress={this.action}>
          <Text style={styles.actionText}>{'Action'}</Text>
        </Pressable>



      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
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
  container: {
    flexDirection: 'column',
    margin: 10,
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



export default DetailsAboutTransaction