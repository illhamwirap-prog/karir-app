import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { modeColor } from "../theme";

export default function Stamp({ mode, size = 52 }) {
  const label = mode === "Remote" ? "REMOTE" : mode === "Hybrid" ? "HIBRIDA" : "WFO";
  const color = modeColor(mode);
  return (
    <View
      style={[
        styles.stamp,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: color,
          shadowColor: color,
        },
      ]}
    >
      <Text style={[styles.label, { color, fontSize: size * 0.17 }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stamp: {
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-9deg" }],
  },
  label: {
    fontWeight: "700",
    letterSpacing: 0.3,
    textAlign: "center",
  },
});
