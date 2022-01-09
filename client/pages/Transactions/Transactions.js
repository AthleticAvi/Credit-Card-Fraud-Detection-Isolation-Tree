/**
 * this file is to manage the legitimate transactions and show them to the user 
 * 
 */

import React from 'react'
import Day from './Day/Day'
import { StyleSheet, Text, ScrollView, View, Pressable } from 'react-native';
import axios from 'axios'
import * as IP from '../../ip';


class Transactions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            history: [],
            card: this.props.params.card,
            id: this.props.params.id,
            show: [],
            cnt: 0
        }

        this.getTransactions()
    }


    getTransactions = async () => {

        await axios
            .post(`http://${IP.ip}:8001/transactions`, {
                id: this.props.params.id,
                card: this.props.params.card,
                is_fraud: 0
            }, {
                headers: { 'Content-Type': 'application/json' },
            }).then(resp => resp.data)
            .then(data => {
                this.setState({
                    history: data['history'],
                })
            })
            .catch(err => console.log(err))
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    componentDidMount() {
        if (this.state.history == 'undefined') {
            this.setState({ history: [] })
        }
    }



    render() {








        return (
            <ScrollView >
                <Text style={styles.header}>Transactions History</Text>

                {/* this.state.history.length == undefined ? null :  */}
                <Day changePage={this.props.changePage} history={this.state.history} />
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
    btn: {
        marginTop: 20,
        width: 200,
        height: 50,
        fontSize: 20,
        borderRadius: 10,
        backgroundColor: 'rgb(251,187,0)'
    },
    simulation: {
        fontSize: 30,
        textAlign: 'center',
    }
});

export default Transactions