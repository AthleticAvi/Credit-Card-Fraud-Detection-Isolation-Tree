import React from 'react'
import Search from './Search/Search'
import AllDays from './Day/Day'
import axios from 'axios'

import { StyleSheet, Text, ScrollView, View } from 'react-native';

class FraudTransactions extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            history: [],
            card: this.props.params.card,
            id: this.props.params.id
        }

        this.getTransactions()
    }

    getTransactions = async () => {
        // get transactions
        await axios
            .post('http://10.0.0.23:8001/transactions', {
                id: this.props.params.id,
                card: this.props.params.card,
                is_fraud: 1,
            }, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.data)
            .then((data) => {

                this.setState({
                    history: data['history']
                })

            })
            .catch(e => console.log('errererrr:', e))
    }

    render() {
        return (
            <ScrollView >
                <Text style={styles.header}>Frauds History</Text>
                {/* <Search /> */}
                <AllDays changePage={this.props.changePage} history={this.state.history} />

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 30,
        fontSize: 50,
        textAlign: 'center',
        fontWeight: "bold"
    },
});

export default FraudTransactions