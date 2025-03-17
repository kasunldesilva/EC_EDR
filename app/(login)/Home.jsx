import React from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router"; 

const { width, height } = Dimensions.get("window");

export default function Home() {
  const router = useRouter(); 
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground
          source={require("../../assets/images/background.png")}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.container}>
           
            <Image
              source={require("../../assets/images/national.png")}
              style={styles.logo}
              resizeMode="contain"
              
            />
            <Text style={styles.text}>EC-EDR</Text>
            
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo2}
              resizeMode="contain"
            />
          </View>

         
          <View style={styles.buttonContainer}>
          <Text style={styles.welcomeText}>
              {t("Welcome!")} 
            </Text>
            <Text style={styles.welcomeTexts}>
             {t("Login to quickly report and track your complaints")}.
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/Login")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{t("Login")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/Register")
              }
              style={[styles.button, styles.secondButton]}
            >
              <Text style={styles.buttonText}>{t("Register")}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
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
  },
  background: {
    width: width,
    height: height,
   
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
   
    
  },
  logo: {
    width: width * 0.7, 
    height: width * 0.4, 
    marginTop:40, 
  },
  logo2: {
    width: width * 0.7, 
    height: width * 0.3, 
    marginTop:0, 
  },
  text: {
    fontSize: 25, 
    fontWeight: "bold",
    color: "#2E073F",
    marginBlockStart: 0,
  },
  buttonContainer: {
    marginTop: 0,
    width: "80%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#63075D", 
    paddingVertical: 14,
    width: "100%", 
    marginBottom: 15, 
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  secondButton: {
    backgroundColor: "#63075D",
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  welcomeText: {
    fontSize: 16,
    color: "#94098A",
    textAlign: "center",
    fontWeight: "bold",
    
   
  },
  welcomeTexts: {
    fontSize: 16,
    color: "#94098A",
    textAlign: "center",
    marginBottom:20
   
    
   
  },
});
