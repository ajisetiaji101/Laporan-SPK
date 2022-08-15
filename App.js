import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateSuratComp from "./src/pages/CreateSuratComp";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/pages/Home";
import RouteStack from "./src/routes/RouteStack";
import Routing from "./src/routes/Routing";
import CariSuratComp from "./src/pages/CariSuratComp";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Daftar SPK" component={Routing} options={{ headerShown: false, tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="file" color={color} size={size} /> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
