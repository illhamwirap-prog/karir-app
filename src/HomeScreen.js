import React, { useMemo, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import { CATEGORIES, TYPES } from "../data/jobsApi";
import JobCard from "../components/JobCard";
import { useAppData } from "../context/AppDataContext";

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [locFilter, setLocFilter] = useState("");
  const [category, setCategory] = useState("Semua");
  const [type, setType] = useState("Semua");
  const [showFilters, setShowFilters] = useState(false);
  const { jobs, jobsLoading, jobsError, reloadJobs, savedIds, toggleSaved } = useAppData();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const loc = locFilter.trim().toLowerCase();
    return jobs.filter((j) => {
      const matchQ = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q);
      const matchLoc = !loc || j.location.toLowerCase().includes(loc);
      const matchCat = category === "Semua" || j.category === category;
      const matchType = type === "Semua" || j.type === type;
      return matchQ && matchLoc && matchCat && matchType;
    });
  }, [jobs, query, locFilter, category, type]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Temukan kerja tanpa drama.</Text>
        <Text style={styles.heroSubtitle}>Loker beneran, dipasang langsung tiap hari.</Text>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color={colors.inkSoft} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Posisi atau perusahaan"
            placeholderTextColor={colors.inkSoft}
            style={styles.searchInput}
          />
        </View>
        <View style={styles.searchBox}>
          <Ionicons name="location-outline" size={16} color={colors.inkSoft} />
          <TextInput
            value={locFilter}
            onChangeText={setLocFilter}
            placeholder="Kota atau remote"
            placeholderTextColor={colors.inkSoft}
            style={styles.searchInput}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.filterToggle} onPress={() => setShowFilters((s) => !s)}>
        <Ionicons name="options-outline" size={15} color={colors.inkSoft} />
        <Text style={styles.filterToggleText}>Filter</Text>
        <Ionicons name={showFilters ? "chevron-up" : "chevron-down"} size={14} color={colors.inkSoft} />
      </TouchableOpacity>

      {showFilters && (
        <View style={styles.filterPanel}>
          <Text style={styles.filterLabel}>KATEGORI</Text>
          <View style={styles.chipRow}>
            {CATEGORIES.map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => setCategory(c)}
                style={[styles.chip, category === c && { backgroundColor: colors.coral, borderColor: colors.coral }]}
              >
                <Text style={[styles.chipText, category === c && { color: colors.card }]}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.filterLabel}>TIPE KERJA</Text>
          <View style={styles.chipRow}>
            {TYPES.map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setType(t)}
                style={[styles.chip, type === t && { backgroundColor: colors.forest, borderColor: colors.forest }]}
              >
                <Text style={[styles.chipText, type === t && { color: colors.card }]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {jobsLoading ? (
        <View style={styles.centerState}>
          <ActivityIndicator color={colors.coral} />
          <Text style={styles.centerStateText}>Memuat loker...</Text>
        </View>
      ) : jobsError ? (
        <View style={styles.centerState}>
          <Ionicons name="cloud-offline-outline" size={26} color={colors.inkSoft} />
          <Text style={styles.centerStateText}>Gagal memuat loker. Cek koneksi internet kamu.</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={reloadJobs}>
            <Text style={styles.retryText}>Coba lagi</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          onRefresh={reloadJobs}
          refreshing={jobsLoading}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="briefcase-outline" size={26} color={colors.inkSoft} />
              <Text style={styles.emptyText}>Belum ada loker yang cocok. Coba ganti kata kunci atau filter.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <JobCard
              job={item}
              saved={savedIds.includes(item.id)}
              onToggleSave={toggleSaved}
              onPress={(job) => navigation.navigate("DetailLoker", { job })}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  hero: { backgroundColor: colors.ink, padding: 16, paddingBottom: 18 },
  heroTitle: { color: colors.card, fontSize: 22, fontWeight: "700" },
  heroSubtitle: { color: "#B9C2B6", fontSize: 13, marginTop: 4, marginBottom: 14 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    marginBottom: 8,
    height: 42,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: colors.ink },
  filterToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  filterToggleText: { fontSize: 13, color: colors.inkSoft, fontWeight: "600" },
  filterPanel: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    borderStyle: "dashed",
    marginBottom: 6,
  },
  filterLabel: { fontSize: 11, color: colors.inkSoft, fontWeight: "700", marginTop: 8, marginBottom: 6 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.card,
  },
  chipText: { fontSize: 12, color: colors.ink },
  listContent: { padding: 16, paddingTop: 6, flexGrow: 1 },
  empty: { alignItems: "center", paddingVertical: 60, gap: 8 },
  emptyText: { color: colors.inkSoft, fontSize: 13, textAlign: "center", paddingHorizontal: 30 },
  centerState: { alignItems: "center", justifyContent: "center", paddingVertical: 60, gap: 8 },
  centerStateText: { color: colors.inkSoft, fontSize: 13, textAlign: "center", paddingHorizontal: 30 },
  retryBtn: { marginTop: 6, backgroundColor: colors.ink, paddingHorizontal: 16, paddingVertical: 9 },
  retryText: { color: colors.card, fontWeight: "700", fontSize: 12.5 },
});
