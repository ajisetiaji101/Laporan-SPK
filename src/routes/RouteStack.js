import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";

export default function RouteStack() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Daftar SPK" component={Home} />
    </Tab.Navigator>
  );
}
