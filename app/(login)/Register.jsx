import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const { width, height } = Dimensions.get("window");

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    mobile: "",
    nic: "",
    password: "",
    confirmPassword: "",
  });
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showConsentModal, setShowConsentModal] = useState(false);

 

  const handleRegister = async () => {
    setLoading(true);
    setErrorMessage("");
  
    console.log("Registering with:", form); 
  
    try {
      const response = await axios.post(
        "https://ecedr.elections.gov.lk/test/app_user/",
        {
          username: form.username,
          nic: form.nic,
          mobile: form.mobile,
          password: form.password,
          confirm_password: form.confirmPassword, 
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      console.log("Response Data:", response.data); 
  
     
      router.push({
        pathname: "/OTPVerification",
        params: { mobile: form.mobile },
      
      });
  
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log("API Error Response:", error.response.data); 
        setErrorMessage(error.response.data.message || "");
      } else {
        setErrorMessage("An error occurred, please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground
          source={require("../../assets/images/background.png")}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.container}>
          
            <Text style={styles.headerText}>{t("Hello! Register to get started…")}</Text>

          
            <View style={styles.headerContainer}>
              <Image
                source={require("../../assets/images/national.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.title}>EC-EDR</Text>

            {/* Second Logo */}
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.smallLogo}
              resizeMode="contain"
            />

            {/* Input Fields */}
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#94098A" />
              <TextInput
                placeholder={t("Username")}
                style={styles.input}
                onChangeText={(text) => setForm({ ...form, username: text })}
              />
              
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="card-outline" size={20} color="#94098A" />
              <TextInput
                placeholder={t("NIC")}
                style={styles.input}
                onChangeText={(text) => setForm({ ...form, nic: text })}
              />
              
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color="#94098A" />
              <TextInput
                placeholder={t("Mobile Number")}
                style={styles.input}
                keyboardType="phone-pad"
                onChangeText={(text) => setForm({ ...form, mobile: text })}
              />
              
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#94098A" />
              <TextInput
                placeholder={t("Password")}
                style={styles.input}
                secureTextEntry={!showPassword}
                onChangeText={(text) => setForm({ ...form, password: text })}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color="#888"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#94098A" />
              <TextInput
                placeholder={t("Confirm Password")}
                style={styles.input}
                secureTextEntry={!showConfirmPassword}
                onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons
                  name={showConfirmPassword ? "eye" : "eye-off"}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>

            
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

           
            <TouchableOpacity
                style={styles.button}
                onPress={() => setShowConsentModal(true)}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? t("Registering...") : t("Register")}
                </Text>
              </TouchableOpacity>

           
            <TouchableOpacity onPress={() => router.push("/(login)/Login")}>
              <Text style={styles.signInText}>{t("Have an Account! Login")}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
        {showConsentModal && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="shield-checkmark" size={48} Color="#fff" />
              </View>

              <Text style={styles.modalTitle}>{t("Consent Statement")}</Text>

              <Text style={styles.modalText}>
               {t(" Do you agree to share this information, including your identity, with third parties?")}
              </Text>

              <TouchableOpacity
                style={styles.agreeButton}
                onPress={() => {
                  setShowConsentModal(false);
                  handleRegister();
                }}
              >
                <Text style={styles.agreeButtonText}>{t("Agree")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.disagreeButton}
                onPress={() => {
                  setShowConsentModal(false);
                  alert("You must agree to proceed.");
                }}
              >
                <Text style={styles.disagreeButtonText}>{t("Disagree")}</Text>
              </TouchableOpacity>
            </View>
          </View>
         )}

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  background: {
    flex: 1,
    width: width,
    height: height,
    alignItems: "center",
  },
  container: {
    width: "85%",
    alignItems: "center",
    
  },
  headerText: {
    fontSize: 16,
    color: "#94098A",
    fontWeight: "bold",
    textAlign: "left",
    width: "100%",
    marginLeft: -10,
  },
  headerContainer: {
    alignItems: "center",
    width: "100%",
  },
  logo: {
    marginTop: 10,
    width: width * 0.5,
    height: width * 0.3,
    marginBottom: -10,
  },
  smallLogo: {
    width: width * 0.6,
    height: width * 0.31,
    marginBottom: -10,
    marginTop: -30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E073F",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 6,
    width: "100%",
    height: 45,
    shadowColor: "#80080",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#63075D",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
    marginTop:10,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  signInText: {
    fontSize: 14,
    color: "#94098A",
    textDecorationLine: "underline",
    marginTop: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: height,
    width: width,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  
  modalContainer: {
    width: "85%",
    backgroundColor: "#FCE4FF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  
  iconContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 50,
    marginBottom: 10,
  },
  
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#94098A",
    marginBottom: 10,
  },
  
  modalText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    color: "#94098A",
    
  },
  
  agreeButton: {
    backgroundColor: "#94098A",
    paddingVertical: 12,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  
  agreeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
     backgroundColor: "#94098A",
  },
  
  disagreeButton: {
    backgroundColor: "#94098A",
    
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  
  disagreeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  
});
