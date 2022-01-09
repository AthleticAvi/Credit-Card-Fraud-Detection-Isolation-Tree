import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import React from 'react';
import Transactions from './pages/Transactions/Transactions'
import FraudTransactions from './pages/Fruads/fraudTransactions'
import Actions from './pages/Actions'
import Developers from './pages/Developers'
import Feedback from './pages/Feedback'
import Login from './pages/Login'
import Toolbar from './pages/Toolbar'
import { View } from 'react-native';

/**
 * this file is to manage the pages and the navigation between pages
 */

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


    this.registerForPushNotificationsAsync()

  }
  async schedulePushNotification(title, body) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: { data: 'goes here' },
        sound: 'default' | null,
      },
      trigger: { seconds: 1 },
    });
  }

  async registerForPushNotificationsAsync() {
    // ask permission to use notification

    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {

        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {

    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }






  setCardAndId = (id, card) => {
    this.setState({
      id: id,
      card: card
    })
  }

  changePage = (page, params = null) => {
    // navigate to the requested page
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
        {this.state.loggedIn ? <Toolbar currentPage={this.state.pageName} id={this.state.id} card={this.state.card} changePage={this.changePage} /> : null}
        {this.state.loggedIn ? this.state.component : <Login setCardAndId={this.setCardAndId} changePage={this.changePage} />}
      </View>

    )

  }
}
export default App