import React from 'react'
import Search from './Search/Search'
import AllDays from './Day/Day'
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

    changeShow = (show) => {
        this.setState({
            show: show
        })
    }


    getTransactions = async () => {
        // get transactions
        await axios
            .post('http://10.0.0.23:8001/transactions', {
                id: this.props.params.id,
                card: this.props.params.card,
                is_fraud: 0
            }, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => response.data)
            .then((data) => {

                this.setState({
                    history: data['history'],
                    show: data['history']
                })

                console.log('from server: ', data)

            })
            .catch(e => console.log('errererrr:', e))
    }


    changePage = (page, value) => {
        this.props.changePage(page, value)
    }


    render() {
        return (
            <ScrollView >
                <Text style={styles.header}>Transactions History</Text>
                {/* <Search history={this.state.show} changeShow={this.changeShow} /> */}
                <AllDays changePage={this.changePage} history={this.state.show} />

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