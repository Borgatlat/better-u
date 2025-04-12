"use client"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import GlassmorphicCard from "./GlassmorphicCard"

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get("window")
const isIphoneX = Platform.OS === "ios" && (height >= 812 || width >= 812)

const LooksmaxxingCard = ({ navigation }) => {
  return (
    <GlassmorphicCard style={styles.looksmaxxingCard}>
      <View style={styles.looksmaxxingContent}>
        <Text style={styles.looksmaxxingTitle}>Looksmaxxing</Text>
        <Text style={styles.looksmaxxingDescription}>
          Enhance your appearance with AI-powered analysis and personalized routines.
        </Text>
        <TouchableOpacity style={styles.looksmaxxingButton} onPress={() => navigation.navigate("Looksmaxxing")}>
          <Text style={styles.looksmaxxingButtonText}>Explore</Text>
          <Ionicons name="arrow-forward" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </GlassmorphicCard>
  )
}

const styles = StyleSheet.create({
  looksmaxxingCard: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: "rgba(156, 124, 244, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(156, 124, 244, 0.3)",
  },
  looksmaxxingContent: {
    alignItems: "flex-start",
  },
  looksmaxxingTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  looksmaxxingDescription: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 15,
  },
  looksmaxxingButton: {
    backgroundColor: "cyan",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  looksmaxxingButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 5,
  },
})

export default LooksmaxxingCard
