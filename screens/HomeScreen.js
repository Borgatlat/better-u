"use client"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import GlassmorphicCard from "../components/GlassmorphicCard"
import { useAuth } from "../context/AuthContext"
import { useUser } from "../context/UserContext"
import { LogoImage } from "../utils/imageUtils"
import LooksmaxxingCard from "../components/LooksmaxxingCard"

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get("window")
const isIphoneX = Platform.OS === "ios" && (height >= 812 || width >= 812)

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth()
  const { userProfile } = useUser()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <LogoImage style={styles.logo} size={40} />
          <Text style={styles.title}>BetterU</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("ProfileTab")}>
            <Ionicons name="person-circle-outline" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <GlassmorphicCard style={styles.greetingCard}>
          <Text style={styles.greetingText}>
            Welcome, {userProfile?.full_name || user?.email?.split("@")[0] || "User"}!
          </Text>
          <Text style={styles.motivationText}>Ready to achieve your fitness goals?</Text>
        </GlassmorphicCard>

        <GlassmorphicCard style={styles.quickActionsCard}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate("WorkoutTab")}
              activeOpacity={0.7}
            >
              <Ionicons name="barbell-outline" size={24} color="white" />
              <Text style={styles.actionText}>Start Workout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate("MentalTab")}
              activeOpacity={0.7}
            >
              <Ionicons name="leaf-outline" size={24} color="white" />
              <Text style={styles.actionText}>Mindfulness</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate("TrainerTab")}
              activeOpacity={0.7}
            >
              <Ionicons name="fitness-outline" size={24} color="white" />
              <Text style={styles.actionText}>Ask AI Trainer</Text>
            </TouchableOpacity>
          </View>
        </GlassmorphicCard>

        <GlassmorphicCard style={styles.progressCard}>
          <Text style={styles.progressTitle}>Your Progress</Text>
          <View style={styles.progressStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Workouts</Text>
              <Text style={styles.statValue}>12</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Calories Burned</Text>
              <Text style={styles.statValue}>4,500</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>PRs Set</Text>
              <Text style={styles.statValue}>3</Text>
            </View>
          </View>
        </GlassmorphicCard>

        {/* Add the Looksmaxxing card here */}
        <LooksmaxxingCard navigation={navigation} />

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? (isIphoneX ? 50 : 20) : 0,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {},
  logo: {
    marginRight: 10,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  greetingCard: {
    padding: 20,
    marginBottom: 20,
  },
  greetingText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  motivationText: {
    color: "#aaa",
    fontSize: 16,
  },
  quickActionsCard: {
    padding: 20,
    marginBottom: 20,
  },
  quickActionsTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    alignItems: "center",
  },
  actionText: {
    color: "white",
    fontSize: 14,
    marginTop: 8,
  },
  progressCard: {
    padding: 20,
    marginBottom: 20,
  },
  progressTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  progressStats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 5,
  },
  statValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
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
  bottomPadding: {
    height: 80,
  },
})

export default HomeScreen
