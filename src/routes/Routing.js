import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import CreateSuratComp from "../pages/CreateSuratComp";
import Home from "../pages/Home";
import DetailWorkComp from "../pages/DetailWorkComp";
import PilihanSuratComp from "../pages/PilihanSuratComp";

const Stack = createNativeStackNavigator();

export default function Routing() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SPK" component={Home} />
      <Stack.Screen name="Rekam SPK" component={CreateSuratComp} />
      <Stack.Screen name="Uraian Pekerjaan" component={DetailWorkComp} />
      <Stack.Screen name="Pilih SPK" component={PilihanSuratComp} />
    </Stack.Navigator>
  );
}
