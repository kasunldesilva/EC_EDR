import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  ActivityIndicator, 
  Image, 
  ScrollView, 
  StyleSheet 
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { FontAwesome } from "@expo/vector-icons";
import { Appbar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

export default function FullDetailScreen() {
  const { id } = useLocalSearchParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
    const router = useRouter();
    const [statusList, setStatusList] = useState([]);

  const handleBack = () => {
    router.back(); 
  };

  useEffect(() => {
    if (!id) return;
  
    const fetchComplaintDetails = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (!token) throw new Error("No token found. Please log in.");
  
        const response = await fetch(`https://ecedr.elections.gov.lk/test/app_edritem/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch complaint details. Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("✅ API Response:", data);
        setComplaint(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    const fetchStatus = async () => {
      try {
        const token = await SecureStore.getItemAsync("token"); 
        if (!token) throw new Error("No token found. Please log in.");
    
        const response = await fetch(`https://ecedrapp.elections.gov.lk/app_edritem/status?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
       
    
        const data = await response.json();
        console.log("✅ Status API Response:", data);
    
        if (data.items && Array.isArray(data.items)) {
          setStatusList(data.items);
        } else {
          setStatusList([]);
        }
      } catch (err) {
        console.error("❌ Status Fetch Error:", err);
        
      }
    };
    
  
    fetchComplaintDetails();
    fetchStatus();
  }, [id]);
  const renderStatus = () => {
    if (!complaint || !complaint.status) return null;
  
    if (complaint.status === "REJECTED") {
      const rejectedComment = statusList.length > 0 ? statusList[0].comment_org : "No comment";
      return <Text style={styles.statusText}>{t("Rejected")}: {rejectedComment}</Text>;
    }
  
    if (complaint.status === "ACTIVE") {
      const itemLevel = statusList.length > 0 ? statusList[0].item_level : "";
      if (itemLevel === "NEW") {
        return <Text style={styles.statusText}>{t("Your complaint/request has been successfully received by the Election Commission, and it is now being processed for further action")}</Text>;
      }
    }
  
    if (complaint.status === "VERIFIED") {
      const hasPoliceAssign = statusList.some(item => item.item_level === "POLICE_ASSIGN");
      const hasClosed = statusList.some(item => item.item_level === "NEW");
      const closeComment = statusList.find(item => item.item_level === "CLOSE")?.comment_org || "";
  
      if (hasClosed) {
        return <Text style={styles.statusText}>{t("our complaint/request has been successfully received by the Election Commission, and it is now being processed for further action")}: {closeComment}</Text>;
      }
      if (hasPoliceAssign) {
        return <Text style={styles.statusText}>{t("Your complaint has been forwarded to the Sri Lanka Police for necessary action.")}</Text>;
      }
      return <Text style={styles.statusText}>{t("Passed Election Commission")}</Text>;
    }
  
    return <Text style={styles.statusText}>{t("Unknown Status")}</Text>;
  };
  
  
  const renderImages = () => {
    if (!complaint || !complaint.file_path || complaint.file_path.length === 0) {
      return <Text style={styles.noImageText}>{t("No images available")}</Text>;
    }
  
   
    const imagePathsArray = complaint.file_path[0]
      .split(',')
      .map(path => path.trim()) 
      .filter(path => path.length > 0); 
  
    return (
      <View style={styles.imageContainer}>
        {imagePathsArray.map((path, index) => {
        
          let imageUrl = path.startsWith("http")
            ? path
            : `https://ecedr.elections.gov.lk/test${path.startsWith("/") ? path : `/images/${path}`}`;
  
          console.log(`✅ Checking Image URL: ${imageUrl}`);
  
          return (
            <Image
              key={index}
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
              onError={(e) => console.error(` Failed to load image: ${imageUrl}`, e.nativeEvent.error)}
            />
          );
        })}
      </View>
    );
  };
  
  return (
    <>
      <Appbar.Header style={styles.appBar}>
              <Appbar.BackAction onPress={handleBack} /> 
              <Appbar.Content /> 
              <Appbar.Action icon="account" onPress={() => {}} />
              <Appbar.Action icon="dots-vertical" onPress={() => {}} />
            </Appbar.Header>

      <ScrollView style={styles.container}>
        {loading && <ActivityIndicator size="large" color="#9C2A8E" />}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {complaint && (
          <>
            {/* Header */}
            <Text style={styles.electionTitle}>
              {t("Local Authorities Election")}- 2025
            </Text>

            <Text style={styles.referenceNumber}>
              {t("Reference Number")}{" "}
              <Text style={styles.refBold}>EDRAPP{complaint.id}</Text>
            </Text>

            {/* Complaint Box */}
            <View style={styles.complaintBox}>
              <Text style={styles.complaintBadge}>
                {complaint.item_type}
              </Text>

              <Text style={styles.complaintTitle}>
                {t("Title of the Item")}
              </Text>
              <Text style={styles.itemTitle}>
                {complaint.title}
              </Text>

              <Text style={styles.descriptionTitle}>
                {t("Description of the Item")}
              </Text>
              <Text style={styles.itemDescription}>
                {complaint.description}
              </Text>
              <Text style={styles.complaintTitle}>
                {t("District")}
              </Text>
              <Text style={styles.itemTitle}>
                {complaint.district}
              </Text>
              <Text style={styles.complaintTitle}>
                {t("Date and Time")}
              </Text>
              <Text style={styles.itemTitle}>
                {complaint.title}
              </Text>
              <Text style={styles.complaintTitle}>
                {t("status")}
              </Text>
              <Text style={styles.itemTitle}>
                {complaint.status}
              </Text>
            </View>

            {/* Images */}
            {renderImages()}

            {/* Status */}
            

            <Text style={styles.complaintTitle}>{t("Status")}</Text>
{             renderStatus()}


          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    flex: 1,
  },
  electionTitle: {
    fontSize: 18,
    color: "#800080",
    marginBottom: 10,
  },
  referenceNumber: {
    fontSize: 18,
    color: "#555",
    marginVertical: 4,
  },
  refBold: {
    fontWeight: "bold",
    color: "#9C2A8E",
  },
  complaintBox: {
    backgroundColor: "#FCE7F3",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
  },
  complaintBadge: {
    backgroundColor: "#9C2A8E",
    color: "#FFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 12,
  },
  complaintTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
  },
  itemTitle: {
    fontSize: 14,
    color: "#6D28D9",
    fontWeight: "bold",
    marginTop: 4,
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 12,
  },
  itemDescription: {
    color: "#555",
    marginTop: 8,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#eee",
  },
  noImageText: {
    marginTop: 16,
    color: "#888",
    fontStyle: "italic",
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 24,
  },
  statusContainer: {
    marginTop: 8,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statusText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 16,
  },
});
