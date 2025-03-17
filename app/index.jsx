import React, { useState } from "react";
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
import { Redirect, useRouter } from "expo-router"; 

const { width, height } = Dimensions.get("window");

export default function index() {
  const router = useRouter(); 

  return (
     
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground
          source={require("../assets/images/background.png")}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.container}>
            
            <TouchableOpacity onPress={() => router.push("/(login)/Selecter")}>
              <Image
                source={require("../assets/images/national.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Text style={styles.text}>EC-EDR</Text>

            
            <TouchableOpacity onPress={() => router.push("/(login)/Selecter")}>
              <Image
                source={require("../assets/images/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>

           
            <TouchableOpacity
              onPress={() => router.push("/(login)/Selecter")}
            >
              <Image
                source={require("../assets/images/splash image.png")} 
                style={styles.interactiveImage}
                resizeMode="contain"
              />
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
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  logo: {
    width: width * 0.7, 
    height: width * 0.4, 
    marginVertical: -3, 
  },
  interactiveImage: {
    width: width * 0.8, 
    height: width * 0.5, 
    marginVertical: 20, 
  },
  text: {
    fontSize: 30, 
    fontWeight: "bold",
    color: "#2E073F",
    marginBlockStart: 0, 
  },
  feedbackText: {
    fontSize: 18,
    color: "#FF0000",
    marginTop: 20,
    textAlign: "center",
  },
});
