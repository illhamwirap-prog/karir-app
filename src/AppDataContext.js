import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../lib/supabase";
import { fetchJobs } from "../data/jobsApi";

const SAVED_KEY = "karir:saved_jobs";
const APPLICATIONS_KEY = "karir:applications";

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState(null);

  const [savedIds, setSavedIds] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const loadJobs = useCallback(async () => {
    setJobsLoading(true);
    setJobsError(null);
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (e) {
      setJobsError(e.message || "Gagal memuat loker");
    } finally {
      setJobsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  useEffect(() => {
    (async () => {
      try {
        const [savedRaw, appsRaw] = await Promise.all([
          AsyncStorage.getItem(SAVED_KEY),
          AsyncStorage.getItem(APPLICATIONS_KEY),
        ]);
        if (savedRaw) setSavedIds(JSON.parse(savedRaw));
        if (appsRaw) setApplications(JSON.parse(appsRaw));
      } catch (e) {
        // gagal baca storage, mulai dari kosong
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const toggleSaved = useCallback((jobId) => {
    setSavedIds((prev) => {
      const next = prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId];
      AsyncStorage.setItem(SAVED_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  // Kirim lamaran ke Supabase, lalu simpan salinan riwayat di perangkat
  // (belum ada login pengguna, jadi riwayat pribadi masih disimpan lokal)
  const addApplication = useCallback(async ({ job, name, email }) => {
    const { error } = await supabase.from("applications").insert({
      job_id: job.id,
      applicant_name: name,
      applicant_email: email,
    });
    if (error) throw error;

    const record = {
      id: `${job.id}-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      name,
      email,
      date: new Date().toISOString(),
    };
    setApplications((prev) => {
      const next = [record, ...prev];
      AsyncStorage.setItem(APPLICATIONS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <AppDataContext.Provider
      value={{
        jobs, jobsLoading, jobsError, reloadJobs: loadJobs,
        savedIds, toggleSaved,
        applications, addApplication,
        loaded,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData harus dipakai di dalam AppDataProvider");
  return ctx;
}
