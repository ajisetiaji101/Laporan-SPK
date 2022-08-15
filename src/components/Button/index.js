import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ButtonComp(props) {
  const { onPress, title, classNa, icox } = props;
  return (
    <TailwindProvider>
      <Pressable style={styles.button} onPress={onPress} className={classNa}>
        {title ? <Text style={styles.text}>{title}</Text> : null}
        {icox ? <MaterialCommunityIcons name={icox} /> : null}
      </Pressable>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    // backgroundColor: "#964B00",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
