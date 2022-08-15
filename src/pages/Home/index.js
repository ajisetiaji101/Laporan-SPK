import { Button, PermissionsAndroid, Pressable, ScrollView, Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import ButtonComp from "../../components/Button";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateSuratComp from "../CreateSuratComp";
import axios from "axios";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }) {
  const [data, setData] = useState([]);

  const url = "https://nodejsspk.herokuapp.com";

  useEffect(() => {
    navigation.addListener("focus", async () => {
      await axios
        .get(`${url}/laporan`)
        .then((e) => {
          setData(e.data.data);
        })
        .catch((e) => console.error(`Error: ${e}`));
    });
  }, []);

  AsyncStorage.removeItem("id");

  console.log(data);

  const ubahTanggal = (value) => {
    const date = new Date(value);
    const day = date.getDate();
    let month = date.getMonth();
    month = month + 1;
    if (String(day).length == 1) day = "0" + day;
    if (String(month).length == 1) month = "0" + month;

    const dateT = day + "-" + month + "-" + date.getFullYear();

    return dateT;
  };

  return (
    <TailwindProvider>
      <ScrollView className="bg-stone-400">
        {data.map((e, index) => (
          <View key={index} className="flex-1 items-center justify-center mx-2">
            <Pressable
              className="bg-white rounded-lg h-48 mt-4 mb-3 px-5 py-5 active:bg-amber-600 w-full"
              onPress={() => {
                navigation.navigate("Pilih SPK", { item: e.id });
              }}
            >
              <View style={{ flex: 1, flexDirection: "row" }} className="justify-between py-2">
                <Text className=" font-semibold">{e.nospk}</Text>
                <Text className=" text-orange-500">Details</Text>
              </View>
              <Text className="text-gray-500">{ubahTanggal(e.tanggal)}</Text>
              <Text className=" pr-40 py-4">{e.judul}</Text>
              <View style={{ flex: 1, flexDirection: "row" }} className="justify-between py-2">
                <Text className="text-gray-500">{e.penerima}</Text>
              </View>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <ButtonComp title="BUAT SPK" classNa="bg-orange-500 py-4 active:bg-orange-700 rounded-none" onPress={() => navigation.navigate("Rekam SPK")} />
    </TailwindProvider>
  );
}
