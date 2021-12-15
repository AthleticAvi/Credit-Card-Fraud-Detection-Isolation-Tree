
import React from 'react';
import Transactions from './pages/Transactions/Transactions'
import FraudTransactions from './pages/Fruads/fraudTransactions'
import Actions from './pages/Actions'
import Developers from './pages/Developers'
import Feedback from './pages/Feedback'
import Login from './pages/Login'
import Toolbar from './pages/Toolbar'
import { View } from 'react-native';




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      card: null,
      id: null,
      loggedIn: false,
      component: <Login changePage={this.changePage} />,
      pageName: 'Login',
      params: null

    }
  }

  setCardAndId = (id, card) => {
    this.setState({
      id: id,
      card: card
    })
  }

  changePage = (page, params = null) => {
    this.setState({ params: params })
    switch (page) {

      case 'Transaction':
        this.setState(
          { component: <Transactions params={{ id: this.state.id, card: this.state.card }} changePage={this.changePage} /> }
        )
        break;
      case 'fraudTransactions':
        this.setState(
          { component: <FraudTransactions params={params} changePage={this.changePage} /> }
        )
        break;
      case 'Actions':
        this.setState(
          { component: <Actions params={params} changePage={this.changePage} /> }
        )
        break;
      case 'Developers':
        this.setState(
          { component: <Developers params={params} changePage={this.changePage} /> }
        )
        break;
      case 'Feedback':
        this.setState(
          { component: <Feedback params={params} changePage={this.changePage} /> }
        )
        break;
      case 'Login':
        this.setState(
          { component: <Login params={params} changePage={this.changePage} /> }
        )
        break;
    }
    this.setState({ pageName: page })
    page == 'Login' ? this.setState({ loggedIn: false }) : this.setState({ loggedIn: true })
  }

  render() {
    return (
      <View>
        {/* as */}
        {this.state.loggedIn ? <Toolbar currentPage={this.state.pageName} id={this.state.id} card={this.state.card} changePage={this.changePage} /> : null}
        {this.state.loggedIn ? this.state.component : <Login setCardAndId={this.setCardAndId} changePage={this.changePage} />}
      </View>

    )

  }
}
export default App