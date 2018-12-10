import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.navigate('Details', {
              someDetail: 'This is a detail.',
              anotherDetail: 'This is another detail.'
            });
          }}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    const { navigation } = this.props;

    const someDetail = navigation.getParam(
      'someDetail',
      'This is not a detail.'
    );

    const anotherDetail = navigation.getParam(
      'anotherDetail',
      'This is not a detail.'
    );

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>{JSON.stringify(someDetail)}</Text>
        <Text>{JSON.stringify(anotherDetail)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            this.props.navigation.push('Details', {
              someDetail: someDetail.slice().concat(' Again.'),
              anotherDetail: anotherDetail.slice().concat(' Again.')
            })
          }
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(AppNavigator);
