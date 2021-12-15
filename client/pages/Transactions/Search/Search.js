
import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

class Search extends React.Component {
  constructor(props) {
    super(props)
  }

  changeTransactions = (value) => {
    let transactions = []
    this.props.forEach(element => {
      element.category.startsWith(value)
      transactions.push(element)
    });

    this.props.changShow(transactions)

  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput onChangeText={value => this.changeTransactions(value)} placeholder="Search ..." style={styles.item, styles.inputSearch} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  item: {
    width: '90%',
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 10,
    marginRight: '5%',
    marginLeft: '5%',
    fontSize: 50,
    fontWeight: "bold",
  },
  inputSearch: {
    backgroundColor: 'rgba(65, 63, 59,0.2)',
    width: '45%',
    textAlign: 'center',
    paddingRight: 3,
    borderRadius: 10,
    marginRight: '5%',
    marginLeft: '5%',
    fontSize: 20,
    fontWeight: "bold",
  },
});


export default Search