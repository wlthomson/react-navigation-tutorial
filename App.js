import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = { title: "Home" };

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const { viewStyle } = styles;

    const navigateDetails = () => {
      navigate("Details", {
        someDetail: "This is a detail.",
        anotherDetail: "This is another detail.",
        otherParam: "Some other param."
      });
    };

    return (
      <View style={viewStyle}>
        <Text>Home Screen</Text>
        <Button title="Go to Details" onPress={navigateDetails} />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { getParam } = navigation
    const { headerStyle, headerTintColor } = navigationOptions
    const { backgroundColor } = headerStyle

    const title = getParam("otherParam", "A Nested Details Screen")

    return {
      title,
      headerStyle: {
        backgroundColor: headerTintColor,
      },
      headerTintColor: backgroundColor,
    };
  };

  render() {
    const { navigation } = this.props;
    const { navigate, push, getParam, goBack, setParams } = navigation;
    const { viewStyle } = styles;

    const someDetail = getParam("someDetail", "This is not a detail.");
    const anotherDetail = getParam("anotherDetail", "This is not a detail.");
    const otherParam = getParam("otherParam", "Some other param.");

    const navigateHome = () => navigate("Home");
    const pushDetails = () =>
      push("Details", {
        someDetail: someDetail.slice().concat(" Again."),
        anotherDetail: anotherDetail.slice().concat(" Again."),
        otherParam: otherParam.slice().concat(" Again.")
      });
    const navigateBack = () => goBack();
    const updateTitle = () => setParams({ otherParam: "Updated!" });

    return (
      <View style={viewStyle}>
        <Text>Details Screen</Text>
        <Text>{JSON.stringify(someDetail)}</Text>
        <Text>{JSON.stringify(anotherDetail)}</Text>
        <Button title="Go to Home" onPress={navigateHome} />
        <Button title="Go to Details... again" onPress={pushDetails} />
        <Button title="Update the title" onPress={updateTitle} />
        <Button title="Go back" onPress={navigateBack} />
      </View>
    );
  }
}

const colors = {
  headerBackground: "#f4511e",
  headerTint: "#fff"
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headerStyle: {
    backgroundColor: colors.headerBackground
  },
  headerTitleStyle: {
    fontWeight: "bold"
  }
});

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: styles.headerStyle,
      headerTintColor: colors.headerTint,
      headerTitleStyle: styles.headerTitleStyle
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);
