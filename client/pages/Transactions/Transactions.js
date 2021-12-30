import React from 'react'
import Day from './Day/Day'
import { StyleSheet, Text, ScrollView, View, Pressable } from 'react-native';
import axios from 'axios'


class Transactions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            history: [],
            card: this.props.params.card,
            id: this.props.params.id,
            show: []
        }

        this.getTransactions()
    }




    getTransactions = async () => {
        // get transactions
        await axios
            .post('http://192.168.1.15:8001/transactions', {
                id: this.props.params.id,
                card: this.props.params.card,
                is_fraud: 0
            }, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.data)
            .then((data) => {
                console.log('--------------------')
                console.log(data['history'].length)
                console.log('--------------------')

                this.setState({

                    history: data['history'],
                })

            })
            .catch(e => console.log('errererrr:', e))
    }


    render() {
        return (
            <ScrollView >
                <Text style={styles.header}>Transactions History</Text>
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