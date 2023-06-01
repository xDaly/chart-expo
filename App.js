import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Home from "./Home";
const Stack = createStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTitleAlign: "center",
              headerLeft: () => null,
              headerRight: () => null,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              headerTitleAlign: "center",
              headerLeft: () => null,
              headerRight: () => (
                <FontAwesome5
                  onPress={() => {
                    AsyncStorage.clear().then(() => {
                      navigation.navigate("Login");
                    });
                  }}
                  name="power-off"
                  size={24}
                  color="black"
                  style={{ marginRight: 10 }}
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
