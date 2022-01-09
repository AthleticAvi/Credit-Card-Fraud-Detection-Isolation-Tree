
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SingleTransaction from './SingleTransaction/SingleTransaction'

class Day extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {




    let allDays = this.props.history.map(day => {
      return (
        <View style={styles.dayContainer}>

          <Text style={styles.header}>{day.day}</Text>

          {day.transactions.map(singleTransaction => {
            return (
              <View>
                <SingleTransaction changePage={this.props.changePage} info={singleTransaction} />
              </View>
            )
          })}
        </View>
      )
    })

    return (
      <View style={styles.container}>
        {allDays}
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30
  },
  dayContainer: {
    flexDirection: 'column',
    fontSize: 30,
    fontWeight: "bold",
    alignContent: 'center',
    marginTop: 30,
    backgroundColor: 'rgba(251,187,0,0.3)',

  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold",
    opacity: 0.5
  }
});



export default Day