import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataTable } from "react-native-paper";

export default function Home() {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [showchart, setShowCart] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("_id").then((_id) => {
      axios
        .get(`http://34.116.188.23:3000/user/afficheUserById/${_id}`)
        .then(({ data }) => {
          setData(data.data.dose);
          let labels = [];
          data.data.dose.map((e) => {
            labels.push(new Date(e.createdAt).toLocaleDateString("en-GB"));
          });
          labels.sort((a, b) => a - b);
          setLabels(labels);
          const sortedData = data.data.dose.sort(
            (a, b) => a.createdAt - b.createdAt
          );
          const datasets = sortedData.map((e) => {
            return e.valeur;
          });
          setDatasets(datasets);
          setShowCart(true);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }, []);



  return (
    <View style={styles.container}>
      {/* <StatusBar /> */}
      {showchart ? (
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: datasets,
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : null}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Valeur</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Seuil</DataTable.Title>
        </DataTable.Header>

        {data
          ? data.map((r) => (
              <DataTable.Row key={Math.floor(Math.random() * 9999)}>
                <DataTable.Cell>{r.valeur}</DataTable.Cell>
                <DataTable.Cell>
                  {new Date(r.createdAt).toLocaleDateString("en-GB")}
                </DataTable.Cell>
                <DataTable.Cell>{r.seuil}</DataTable.Cell>
              </DataTable.Row>
            ))
          : null}
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
