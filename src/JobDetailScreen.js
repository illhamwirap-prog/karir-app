import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import Stamp from "../components/Stamp";
import { useAppData } from "../context/AppDataContext";

export default function JobDetailScreen({ route, navigation }) {
  const { job } = route.params;
  const { savedIds, toggleSaved } = useAppData();
  const saved = savedIds.includes(job.id);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.headerRow}>
        <Stamp mode={job.mode} size={56} />
        <View style={styles.headerText}>
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.subtitle}>{job.company} · {job.location}</Text>
        </View>
      </View>

      <View style={styles.tagRow}>
        {[job.type, job.category, `Rp ${job.min}–${job.max} jt`].map((t) => (
          <View key={t} style={styles.tag}><Text style={styles.tagText}>{t}</Text></View>
        ))}
      </View>

      <Text style={styles.desc}>{job.desc}</Text>

      <Text style={styles.sectionLabel}>YANG DICARI</Text>
      {job.req.map((r, i) => (
        <View key={i} style={styles.reqRow}>
          <Ionicons name="checkmark-circle" size={16} color={colors.forest} style={{ marginTop: 1 }} />
          <Text style={styles.reqText}>{r}</Text>
        </View>
      ))}

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.applyBtn}
          onPress={() => navigation.navigate("Lamar", { job })}
        >
          <Ionicons name="paper-plane-outline" size={16} color={colors.card} />
          <Text style={styles.applyText}>Lamar sekarang</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn} onPress={() => toggleSaved(job.id)}>
          <Ionicons name={saved ? "heart" : "heart-outline"} size={18} color={saved ? colors.coral : colors.inkSoft} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.card },
  headerRow: { flexDirection: "row", gap: 14, alignItems: "flex-start" },
  headerText: { flex: 1 },
  title: { fontSize: 20, fontWeight: "700", color: colors.ink },
  subtitle: { fontSize: 13, color: colors.inkSoft, marginTop: 4 },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 16 },
  tag: { backgroundColor: colors.paper, paddingHorizontal: 8, paddingVertical: 4 },
  tagText: { fontSize: 11, fontWeight: "600", color: colors.ink },
  desc: { fontSize: 14, lineHeight: 21, color: "#334033", marginTop: 16 },
  sectionLabel: { fontSize: 12, fontWeight: "700", color: colors.inkSoft, marginTop: 20, marginBottom: 8 },
  reqRow: { flexDirection: "row", gap: 8, marginBottom: 8 },
  reqText: { flex: 1, fontSize: 13.5, color: "#334033", lineHeight: 19 },
  actionRow: { flexDirection: "row", gap: 10, marginTop: 24, marginBottom: 10 },
  applyBtn: {
    flex: 1,
    backgroundColor: colors.coral,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 13,
  },
  applyText: { color: colors.card, fontWeight: "700", fontSize: 14 },
  saveBtn: {
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.line,
  },
});
