"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import GlassmorphicCard from "./GlassmorphicCard"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { supabase } from "../lib/supabase"
import Button from "./Button"

const CalorieTracker = () => {
  const [caloriesConsumed, setCaloriesConsumed] = useState(0)
  const [caloriesGoal, setCaloriesGoal] = useState(2000)
  const [modalVisible, setModalVisible] = useState(false)
  const [addCaloriesModalVisible, setAddCaloriesModalVisible] = useState(false)
  const [caloriesInput, setCaloriesInput] = useState("")
  const [goalInput, setGoalInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    const resetDailyData = async () => {
      const today = new Date().toISOString().split("T")[0]
      const storedData = await AsyncStorage.getItem("calorieData")

      if (storedData) {
        const parsedData = JSON.parse(storedData)
        if (parsedData.date !== today) {
          // It's a new day, reset calories consumed
          setCaloriesConsumed(0)

          // Update AsyncStorage
          await AsyncStorage.setItem(
            "calorieData",
            JSON.stringify({
              date: today,
              caloriesConsumed: 0,
              caloriesGoal: parsedData.caloriesGoal || 2000,
            }),
          )

          // Sync to Supabase
          await syncToSupabase(0, parsedData.caloriesGoal || 2000)
        }
      }
    }

    resetDailyData()
  }, [])

  useEffect(() => {
    loadCalorieData()
  }, [])

  const loadCalorieData = async () => {
    try {
      setIsLoading(true)

      // Get current date in YYYY-MM-DD format
      const today = new Date().toISOString().split("T")[0]

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        // Try to load from Supabase first
        const { data, error } = await supabase
          .from("calorie_tracking")
          .select("*")
          .eq("user_id", user.id)
          .eq("date", today)
          .single()

        if (!error && data) {
          setCaloriesConsumed(data.calories_consumed)
          setCaloriesGoal(data.calories_goal)

          // Also save to AsyncStorage as backup
          await AsyncStorage.setItem(
            "calorieData",
            JSON.stringify({
              date: today,
              caloriesConsumed: data.calories_consumed,
              caloriesGoal: data.calories_goal,
            }),
          )
        } else {
          // If no data in Supabase, try AsyncStorage
          const storedData = await AsyncStorage.getItem("calorieData")

          if (storedData) {
            const parsedData = JSON.parse(storedData)

            // Only use stored data if it's from today
            if (parsedData.date === today) {
              setCaloriesConsumed(parsedData.caloriesConsumed)
              setCaloriesGoal(parsedData.caloriesGoal)

              // Sync to Supabase
              await syncToSupabase(parsedData.caloriesConsumed, parsedData.caloriesGoal)
            } else {
              // It's a new day, reset calories consumed but keep the goal
              setCaloriesConsumed(0)
              setCaloriesGoal(parsedData.caloriesGoal || 2000)

              // Create new entry in Supabase
              await syncToSupabase(0, parsedData.caloriesGoal || 2000)
            }
          } else {
            // No data anywhere, use defaults
            setCaloriesConsumed(0)
            setCaloriesGoal(2000)

            // Create new entry in Supabase
            await syncToSupabase(0, 2000)
          }
        }
      } else {
        // No user, just use AsyncStorage
        const storedData = await AsyncStorage.getItem("calorieData")

        if (storedData) {
          const parsedData = JSON.parse(storedData)

          // Only use stored data if it's from today
          if (parsedData.date === today) {
            setCaloriesConsumed(parsedData.caloriesConsumed)
            setCaloriesGoal(parsedData.caloriesGoal)
          } else {
            // It's a new day, reset calories consumed but keep the goal
            setCaloriesConsumed(0)
            setCaloriesGoal(parsedData.caloriesGoal || 2000)

            // Save to AsyncStorage
            await AsyncStorage.setItem(
              "calorieData",
              JSON.stringify({
                date: today,
                caloriesConsumed: 0,
                caloriesGoal: parsedData.caloriesGoal || 2000,
              }),
            )
          }
        } else {
          // No data, use defaults and save
          await AsyncStorage.setItem(
            "calorieData",
            JSON.stringify({
              date: today,
              caloriesConsumed: 0,
              caloriesGoal: 2000,
            }),
          )
        }
      }
    } catch (error) {
      console.error("Error loading calorie data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const syncToSupabase = async (calories, goal) => {
    try {
      setIsSyncing(true)

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return false

      // Get current date in YYYY-MM-DD format
      const today = new Date().toISOString().split("T")[0]

      // Check if entry exists for today
      const { data: existingData, error: checkError } = await supabase
        .from("calorie_tracking")
        .select("id")
        .eq("user_id", user.id)
        .eq("date", today)
        .single()

      if (checkError && checkError.code !== "PGRST116") {
        console.error("Error checking existing calorie data:", checkError)
        return false
      }

      if (existingData) {
        // Update existing entry
        const { error: updateError } = await supabase
          .from("calorie_tracking")
          .update({
            calories_consumed: calories,
            calories_goal: goal,
          })
          .eq("id", existingData.id)

        if (updateError) {
          console.error("Error updating calorie data:", updateError)
          return false
        }
      } else {
        // Insert new entry
        const { error: insertError } = await supabase.from("calorie_tracking").insert([
          {
            user_id: user.id,
            date: today,
            calories_consumed: calories,
            calories_goal: goal,
          },
        ])

        if (insertError) {
          console.error("Error inserting calorie data:", insertError)
          return false
        }
      }

      return true
    } catch (error) {
      console.error("Error syncing calorie data to Supabase:", error)
      return false
    } finally {
      setIsSyncing(false)
    }
  }

  const handleAddCalories = async () => {
    if (!caloriesInput || isNaN(Number(caloriesInput))) {
      Alert.alert("Invalid Input", "Please enter a valid number")
      return
    }

    const calories = Number(caloriesInput)
    const newTotal = caloriesConsumed + calories

    setCaloriesConsumed(newTotal)
    setAddCaloriesModalVisible(false)
    setCaloriesInput("")

    // Save to AsyncStorage
    const today = new Date().toISOString().split("T")[0]
    await AsyncStorage.setItem(
      "calorieData",
      JSON.stringify({
        date: today,
        caloriesConsumed: newTotal,
        caloriesGoal,
      }),
    )

    // Sync to Supabase
    await syncToSupabase(newTotal, caloriesGoal)
  }

  const handleUpdateGoal = async () => {
    if (!goalInput || isNaN(Number(goalInput))) {
      Alert.alert("Invalid Input", "Please enter a valid number")
      return
    }

    const newGoal = Number(goalInput)

    setCaloriesGoal(newGoal)
    setModalVisible(false)
    setGoalInput("")

    // Save to AsyncStorage
    const today = new Date().toISOString().split("T")[0]
    await AsyncStorage.setItem(
      "calorieData",
      JSON.stringify({
        date: today,
        caloriesConsumed,
        caloriesGoal: newGoal,
      }),
    )

    // Sync to Supabase
    await syncToSupabase(caloriesConsumed, newGoal)
  }

  const calculateProgress = () => {
    if (caloriesGoal === 0) return 0
    const progress = (caloriesConsumed / caloriesGoal) * 100
    return Math.min(progress, 100)
  }

  const getProgressColor = () => {
    const progress = calculateProgress()
    if (progress < 50) return "#4CAF50" // Green
    if (progress < 75) return "#FFC107" // Yellow
    if (progress < 90) return "#FF9800" // Orange
    return "#FF5252" // Red
  }

  if (isLoading) {
    return (
      <GlassmorphicCard style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading calorie data...</Text>
        </View>
      </GlassmorphicCard>
    )
  }

  return (
    <GlassmorphicCard style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calorie Tracker</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="settings-outline" size={16} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${calculateProgress()}%`,
                backgroundColor: getProgressColor(),
              },
            ]}
          />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressText}>
            {caloriesConsumed} / {caloriesGoal} cal
          </Text>
          <Text style={styles.progressPercentage}>{Math.round(calculateProgress())}%</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Consumed</Text>
          <Text style={styles.statValue}>{caloriesConsumed}</Text>
          <Text style={styles.statUnit}>cal</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Remaining</Text>
          <Text style={styles.statValue}>{Math.max(0, caloriesGoal - caloriesConsumed)}</Text>
          <Text style={styles.statUnit}>cal</Text>
        </View>
      </View>

      <Button
        variant="primary"
        size="sm"
        iconName="add"
        style={styles.addButton}
        onPress={() => setAddCaloriesModalVisible(true)}
      >
        Add Calories
      </Button>

      {/* Update Goal Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Calorie Goal</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter daily calorie goal"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={goalInput}
              onChangeText={setGoalInput}
            />

            <View style={styles.modalButtons}>
              <Button variant="secondary" size="sm" style={styles.modalButton} onPress={() => setModalVisible(false)}>
                Cancel
              </Button>

              <Button variant="primary" size="sm" style={styles.modalButton} onPress={handleUpdateGoal}>
                Update
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Calories Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addCaloriesModalVisible}
        onRequestClose={() => setAddCaloriesModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Calories</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter calories consumed"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={caloriesInput}
              onChangeText={setCaloriesInput}
            />

            <View style={styles.modalButtons}>
              <Button
                variant="secondary"
                size="sm"
                style={styles.modalButton}
                onPress={() => setAddCaloriesModalVisible(false)}
              >
                Cancel
              </Button>

              <Button variant="primary" size="sm" style={styles.modalButton} onPress={handleAddCalories}>
                Add
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </GlassmorphicCard>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12, // Reduced padding
    marginBottom: 12, // Reduced margin
    width: "auto",
    paddingHorizontal: 12,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15, // Reduced padding
  },
  loadingText: {
    color: "white",
    fontSize: 12, // Reduced font size
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10, // Reduced margin
  },
  title: {
    color: "white",
    fontSize: 16, // Reduced font size
    fontWeight: "bold",
  },
  settingsButton: {
    width: 28, // Reduced size
    height: 28, // Reduced size
    borderRadius: 14, // Reduced radius
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    marginBottom: 10, // Reduced margin
  },
  progressBar: {
    height: 6, // Reduced height
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3, // Reduced radius
    overflow: "hidden",
    marginBottom: 3, // Reduced margin
  },
  progressFill: {
    height: "100%",
    borderRadius: 3, // Reduced radius
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressText: {
    color: "white",
    fontSize: 10, // Reduced font size
  },
  progressPercentage: {
    color: "white",
    fontSize: 10, // Reduced font size
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10, // Reduced margin
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8, // Reduced radius
    padding: 8, // Reduced padding
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    color: "white",
    fontSize: 12,
    marginBottom: 5,
  },
  statValue: {
    color: "white",
    fontSize: 14, // Reduced font size
    fontWeight: "bold",
  },
  statUnit: {
    color: "#aaa",
    fontSize: 10, // Reduced font size
  },
  divider: {
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  addButton: {
    width: "100%",
    borderRadius: 8, // Reduced radius
    paddingVertical: 8, // Reduced padding
    fontSize: 14, // Reduced font size
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#121212",
    borderRadius: 12, // Reduced radius
    padding: 15, // Reduced padding
    width: "80%",
    maxWidth: 350, // Reduced max width
  },
  modalTitle: {
    color: "white",
    fontSize: 16, // Reduced font size
    fontWeight: "bold",
    marginBottom: 12, // Reduced margin
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8, // Reduced radius
    padding: 8, // Reduced padding
    color: "white",
    marginBottom: 10, // Reduced margin
    fontSize: 14, // Reduced font size
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 4, // Reduced margin
    borderRadius: 8, // Reduced radius
    paddingVertical: 8, // Reduced padding
    fontSize: 14, // Reduced font size
  },
  saveButton: {
    backgroundColor: "cyan",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteButton: {
    backgroundColor: "rgba(255, 59, 48, 0.2)",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 59, 48, 0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})

export default CalorieTracker
