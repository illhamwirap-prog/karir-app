import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import { useAppData } from "../context/AppDataContext";

export default function ApplyScreen({ route, navigation }) {
  const { job } = route.params;
  const { addApplication } = useAppData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const submit = async () => {
    if (!name.trim() || !email.trim()) return;
    setSending(true);
    setError(null);
    try {
      await addApplication({ job, name, email });
      setSubmitted(true);
    } catch (e) {
      setError("Gagal mengirim lamaran. Cek koneksi internet lalu coba lagi.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <View style={styles.confirmScreen}>
        <Ionicons name="checkmark-circle" size={40} color={colors.forest} />
        <Text style={styles.confirmTitle}>Lamaran terkirim</Text>
        <Text style={styles.confirmText}>
          Lamaranmu untuk {job.title} di {job.company} sudah dicatat. Pantau email kalau ada kabar lanjut.
        </Text>
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.popToTop()}>
          <Text style={styles.closeBtnText}>Kembali ke Beranda</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.card }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.title}>Lamar: {job.title}</Text>
        <Text style={styles.subtitle}>{job.company}</Text>

        <Text style={styles.label}>NAMA LENGKAP</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Nama kamu" />

        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="nama@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>CV</Text>
        <View style={styles.uploadBox}>
          <Ionicons name="document-attach-outline" size={16} color={colors.inkSoft} />
          <Text style={styles.uploadText}>Unggah file di sini (contoh)</Text>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={[styles.submitBtn, sending && { opacity: 0.7 }]} onPress={submit} disabled={sending}>
          {sending ? (
            <ActivityIndicator color={colors.card} size="small" />
          ) : (
            <>
              <Ionicons name="paper-plane-outline" size={16} color={colors.card} />
              <Text style={styles.submitText}>Kirim lamaran</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: { padding: 20 },
  title: { fontSize: 18, fontWeight: "700", color: colors.ink },
  subtitle: { fontSize: 13, color: colors.inkSoft, marginTop: 2, marginBottom: 20 },
  label: { fontSize: 11, fontWeight: "700", color: colors.inkSoft, marginBottom: 6, marginTop: 14 },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.ink,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: colors.line,
    borderStyle: "dashed",
    paddingHorizontal: 12,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  uploadText: { fontSize: 13, color: colors.inkSoft },
  submitBtn: {
    marginTop: 24,
    backgroundColor: colors.coral,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 13,
  },
  submitText: { color: colors.card, fontWeight: "700", fontSize: 14 },
  errorText: { color: "#B23B3B", fontSize: 12.5, marginTop: 14 },
  confirmScreen: { flex: 1, backgroundColor: colors.card, alignItems: "center", justifyContent: "center", padding: 30 },
  confirmTitle: { fontSize: 18, fontWeight: "700", color: colors.ink, marginTop: 12 },
  confirmText: { fontSize: 13.5, color: colors.inkSoft, textAlign: "center", marginTop: 8, lineHeight: 19 },
  closeBtn: { marginTop: 20, backgroundColor: colors.ink, paddingHorizontal: 20, paddingVertical: 11 },
  closeBtnText: { color: colors.card, fontWeight: "700", fontSize: 13 },
});
