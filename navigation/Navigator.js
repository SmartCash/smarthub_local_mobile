import * as React from "react";
import { NavigationContainer, } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import Header from "../components/contentComponents/Header";

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name=" "
          component={HomeScreen}
          options={{
            headerBackground: () => <Header />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
