import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import Stamp from "./Stamp";

export default function JobCard({ job, saved, onToggleSave, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={() => onPress(job)} style={styles.card}>
      <View style={styles.perforation}>
        <View style={styles.hole} />
        <View style={styles.hole} />
      </View>

      {job.featured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>UNGGULAN</Text>
        </View>
      )}

      <View style={styles.content}>
        <Stamp mode={job.mode} />

        <View style={styles.info}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={2}>{job.title}</Text>
            <TouchableOpacity onPress={() => onToggleSave(job.id)} hitSlop={8} style={styles.heartBtn}>
              <Ionicons
                name={saved ? "heart" : "heart-outline"}
                size={18}
                color={saved ? colors.coral : colors.inkSoft}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.metaRow}>
            <Ionicons name="business-outline" size={12} color={colors.inkSoft} />
            <Text style={styles.metaText}>{job.company}</Text>
          </View>

          <View style={styles.metaWrap}>
            <View style={styles.metaRow}>
              <Ionicons name="location-outline" size={12} color={colors.inkSoft} />
              <Text style={styles.metaText}>{job.location}</Text>
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="wallet-outline" size={12} color={colors.inkSoft} />
              <Text style={styles.metaText}>Rp {job.min}–{job.max} jt</Text>
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="time-outline" size={12} color={colors.inkSoft} />
              <Text style={styles.metaText}>{job.posted}</Text>
            </View>
          </View>

          <View style={styles.tagRow}>
            <View style={styles.tag}><Text style={styles.tagText}>{job.type}</Text></View>
            <View style={styles.tag}><Text style={styles.tagText}>{job.category}</Text></View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderLeftWidth: 0,
    marginLeft: 16,
    position: "relative",
  },
  perforation: {
    position: "absolute",
    left: -16,
    top: 0,
    bottom: 0,
    width: 16,
    borderRightWidth: 1.5,
    borderRightColor: colors.line,
    borderStyle: "dashed",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  hole: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.line,
    marginLeft: -5,
  },
  featuredBadge: {
    position: "absolute",
    top: -8,
    right: 18,
    backgroundColor: colors.coral,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  featuredText: {
    color: colors.card,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  content: {
    flexDirection: "row",
    gap: 14,
    padding: 16,
    paddingLeft: 28,
  },
  info: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: colors.ink,
  },
  heartBtn: {
    padding: 2,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginRight: 10,
    marginTop: 4,
  },
  metaWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  metaText: {
    fontSize: 12,
    color: colors.inkSoft,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 10,
  },
  tag: {
    backgroundColor: colors.paper,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    fontSize: 11,
    color: colors.ink,
    fontWeight: "600",
  },
});
