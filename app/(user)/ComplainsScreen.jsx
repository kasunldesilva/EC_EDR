import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  View, Text, FlatList, TouchableOpacity, StyleSheet, 
  SafeAreaView, ActivityIndicator, Alert 
} from "react-native";
import { useRouter } from "expo-router";
import { Appbar } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

export default function ComplaintsList() {
  const router = useRouter();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const { t } = useTranslation();

   useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        const userData = await SecureStore.getItemAsync("user");
        const user = userData ? JSON.parse(userData) : null;
        const userId = user?.id;
  
        if (!token || !userId) {
          console.error("Authentication failed. Please log in again.");
          setComplaints([]); 
          setLoading(false);
          return;
        }
  
        const response = await fetch(
          `https://ecedr.elections.gov.lk/test/app_edritem/user/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.ok) {
          console.warn("Fetch request failed. Assuming no complaints.");
          setComplaints([]); 
          return;
        }
  
        const data = await response.json();
  
        if (Array.isArray(data) && data.length === 0) {
          setComplaints([]); 
        } else if (Array.isArray(data)) {
          setComplaints(data);
        } else {
          console.warn("Unexpected API response:", data);
          setComplaints([]); 
        }
  
      } catch (err) {
        console.error("Fetch error:", err);
        setComplaints([]); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchComplaints();
  }, []);
  
  
  
  
  return (
    <SafeAreaView style={styles.safeContainer}>
     
      <Appbar.Header style={styles.appBar}>
                  <Appbar.Content title="" />
                  <View style={styles.titleContainer}>
                    <Appbar.Content title="EC EDR" />
                  </View>
                  <Appbar.Action icon="account" onPress={() => {}} />
                  <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>
     
      <View style={styles.container}>
        <Text style={styles.header}>{t("Local Authority Election")} - 2025</Text>
        <Text style={styles.subHeader}>{t("My Complains/ Requests")}</Text>

        
        {loading && <ActivityIndicator size="large" color="#9C2A8E" />}

          {error ? (
            <Text style={styles.error}>{error}</Text>
          ) : complaints.length === 0 && !loading ? (
            <Text style={styles.noData}>{t("No Complaints and Requests")}</Text>
          ) : (
            <FlatList
              data={complaints}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text style={styles.badge}>{item.item_type}</Text>
                  <View style={styles.row}>
                    <View style={styles.details}>
                      <Text style={styles.boldText}>{t("Reference Number")}:</Text>
                      <Text style={styles.text}>EDRAPPLAE{item.id}</Text>
                      <Text style={styles.boldText}>{t("Title")}:</Text>
                      <Text style={styles.text}>{item.title}</Text>
                      <Text style={styles.boldText}>{t("Status")}:</Text>
                      <Text style={styles.text}>{item.status}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => router.push({ pathname: "/(cr)/fulldetail", params: { id: item.id } })}
                    >
                      <Text style={styles.buttonText}>{t("Details")}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 10 },
  header: { fontSize: 16, color: "#800080", marginBottom: 5 },
  subHeader: { fontSize: 16, color: "#9C2A8E", marginBottom: 10 },
  card: { 
    backgroundColor: "#fff0f6", 
    padding: 10, 
    borderRadius: 10, 
    marginBottom: 10, 
  },
  badge: { 
    backgroundColor: "#9C2A8E", 
    color: "#fff", 
    paddingVertical: 3, 
    paddingHorizontal: 10, 
    borderRadius: 5, 
    alignSelf: "flex-start",
    fontSize: 12,
  },
  row: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
  },
  details: { flex: 1, paddingRight: 10 },
  boldText: { fontWeight: "bold", color: "#5C136B", marginTop: 2, fontSize: 14 },
  text: { color: "#5C136B", fontSize: 14 },
  button: { 
    backgroundColor: "#9C2A8E", 
    paddingVertical: 6, 
    paddingHorizontal: 15, 
    borderRadius: 5, 
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  error: { color: "red", fontSize: 16, textAlign: "center", marginTop: 10 },
  noData: { color: "#63075D", fontSize: 16, textAlign: "center", marginTop: 10 },
  appBar: {
    backgroundColor: '#fff',
  },
  titleContainer: {
    position: 'absolute', 
    left: 16, 
    justifyContent: 'center',
  },
});
