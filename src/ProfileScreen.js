import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import { useAppData } from "../context/AppDataContext";

export default function ProfileScreen() {
  const { applications } = useAppData();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={22} color={colors.card} />
        </View>
        <Text style={styles.headerTitle}>Riwayat Lamaran</Text>
        <Text style={styles.headerSubtitle}>{applications.length} lamaran terkirim</Text>
      </View>

      <FlatList
        data={applications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="paper-plane-outline" size={26} color={colors.inkSoft} />
            <Text style={styles.emptyText}>Belum ada lamaran yang dikirim.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.appCard}>
            <Text style={styles.appTitle}>{item.jobTitle}</Text>
            <Text style={styles.appCompany}>{item.company}</Text>
            <Text style={styles.appDate}>
              {new Date(item.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  header: { padding: 16, alignItems: "flex-start" },
  avatar: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: colors.ink,
    alignItems: "center", justifyContent: "center", marginBottom: 10,
  },
  headerTitle: { fontSize: 20, fontWeight: "700", color: colors.ink },
  headerSubtitle: { fontSize: 12.5, color: colors.inkSoft, marginTop: 2 },
  listContent: { padding: 16, paddingTop: 6, flexGrow: 1 },
  empty: { alignItems: "center", paddingVertical: 60, gap: 8 },
  emptyText: { color: colors.inkSoft, fontSize: 13 },
  appCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, padding: 14 },
  appTitle: { fontSize: 15, fontWeight: "700", color: colors.ink },
  appCompany: { fontSize: 12.5, color: colors.inkSoft, marginTop: 2 },
  appDate: { fontSize: 11.5, color: colors.inkSoft, marginTop: 6 },
});
