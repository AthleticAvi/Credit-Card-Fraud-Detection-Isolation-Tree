
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DetailsAboutTransaction from './DetailsAboutTransaction/DetailsAboutTransaction';
import WithoutDetailsTransaction from './WithoutDetailsTransaction/WithoutDetailsTransaction'

class SingleTransaction extends React.Component {
  constructor(props){
    super(props)
    this.state={
      show:false
    }
  } 

  changeShow=()=>{
    this.setState({
      show:!this.state.show
    })
  }


  render(){
    
    return(
      <View style={styles.container}>
        {this.state.show ? <DetailsAboutTransaction changePage={this.props.changePage} changeShow={this.changeShow} info={this.props.info}/> : <WithoutDetailsTransaction info={this.props.info} changeShow={this.changeShow}/>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    margin:10,
    borderRadius:10,
    backgroundColor:'rgb(251,187,0)',
    fontSize: 30,
    fontWeight: "bold",
    alignItems:'center',
  },
  product: {
    paddingLeft:30,
    width:'70%',
    fontSize: 20,
    color:'white',
  },
  price: {
    textAlign:'right',
    width:'30%',
    fontSize: 20,
    paddingRight:20,
    color:'white',
  }
});



export default SingleTransaction