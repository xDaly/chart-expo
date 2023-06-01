import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Avatar } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        navigation.navigate("Home");
      }
    });
  }, [navigation]);
  const handleLogin = () => {
    setError("");
    axios
      .post("http://34.116.188.23:3000/user/login", {
        email: text,
        password: password,
      })
      .then(async ({ data }) => {
        if (data.token) {
          await AsyncStorage.setItem("token", data.token);
          await AsyncStorage.setItem("_id",data.user._id)
          navigation.navigate("Home");
        }
      })
      .catch((e) => {
        setError("please verify your information");
      });
  };

  return (
    <View style={styles.container}>
      <Avatar.Image
        style={{ marginTop: 20 }}
        size={100}
        source={require("./assets/login.png")}
      />
      <TextInput
        style={{ width: "90%", margin: 20 }}
        label="Email"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <TextInput
        style={{ width: "90%", margin: 20 }}
        label="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
      />
      <Text style={{ color: "red", margin: 20 }}>{error}</Text>
      <Button icon="login" mode="contained" onPress={handleLogin}>
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
