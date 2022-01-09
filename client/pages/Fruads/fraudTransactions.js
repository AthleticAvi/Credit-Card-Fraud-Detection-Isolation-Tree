/**
 * this file is to manage the fraud transactions and show them to the user 
 * 
 */

import React from 'react'
import AllDays from './Day/Day'
import axios from 'axios'

import * as IP from '../../ip';

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
        //
        // get the fraud transactions from the database
        await axios
            .post(`http://${IP.ip}:8001/transactions`, {
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