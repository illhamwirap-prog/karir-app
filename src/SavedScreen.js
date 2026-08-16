import React, { useMemo } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import JobCard from "../components/JobCard";
import { useAppData } from "../context/AppDataContext";

export default function SavedScreen({ navigation }) {
  const { jobs, savedIds, toggleSaved } = useAppData();
  const savedJobs = useMemo(() => jobs.filter((j) => savedIds.includes(j.id)), [jobs, savedIds]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Loker Tersimpan</Text>
      </View>
      <FlatList
        data={savedJobs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={26} color={colors.inkSoft} />
            <Text style={styles.emptyText}>Belum ada loker yang disimpan. Ketuk ikon hati di loker yang kamu suka.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <JobCard
            job={item}
            saved
            onToggleSave={toggleSaved}
            onPress={(job) => navigation.navigate("DetailLoker", { job })}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  header: { padding: 16, paddingBottom: 6 },
  headerTitle: { fontSize: 20, fontWeight: "700", color: colors.ink },
  listContent: { padding: 16, paddingTop: 10, flexGrow: 1 },
  empty: { alignItems: "center", paddingVertical: 60, gap: 8 },
  emptyText: { color: colors.inkSoft, fontSize: 13, textAlign: "center", paddingHorizontal: 30 },
});
