"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import GlassmorphicCard from "./GlassmorphicCard"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { supabase } from "../lib/supabase"
import Button from "./Button"

const WaterTracker = () => {
  const [waterConsumed, setWaterConsumed] = useState(0) // in ml
  const [waterGoal, setWaterGoal] = useState(2000) // in ml (2 liters)
  const [modalVisible, setModalVisible] = useState(false)
  const [addWaterModalVisible, setAddWaterModalVisible] = useState(false)
  const [waterInput, setWaterInput] = useState("")
  const [goalInput, setGoalInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [quickAddAmount, setQuickAddAmount] = useState(250) // Default quick add amount (250ml)

  useEffect(() => {
    const resetDailyData = async () => {
      const today = new Date().toISOString().split("T")[0]
      const storedData = await AsyncStorage.getItem("waterData")

      if (storedData) {
        const parsedData = JSON.parse(storedData)
        if (parsedData.date !== today) {
          // It's a new day, reset water consumed
          setWaterConsumed(0)

          // Update AsyncStorage
          await AsyncStorage.setItem(
            "waterData",
            JSON.stringify({
              date: today,
              waterConsumed: 0,
              waterGoal: parsedData.waterGoal || 2000,
            }),
          )

          // Sync to Supabase
          await syncToSupabase(0, parsedData.waterGoal || 2000)
        }
      }
    }

    resetDailyData()
  }, [])

  useEffect(() => {
    loadWaterData()
  }, [])

  const loadWaterData = async () => {
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
          .from("water_tracking")
          .select("*")
          .eq("user_id", user.id)
          .eq("date", today)
          .single()

        if (!error && data) {
          setWaterConsumed(data.water_consumed)
          setWaterGoal(data.water_goal)

          // Also save to AsyncStorage as backup
          await AsyncStorage.setItem(
            "waterData",
            JSON.stringify({
              date: today,
              waterConsumed: data.water_consumed,
              waterGoal: data.water_goal,
            }),
          )
        } else {
          // If no data in Supabase, try AsyncStorage
          const storedData = await AsyncStorage.getItem("waterData")

          if (storedData) {
            const parsedData = JSON.parse(storedData)

            // Only use stored data if it's from today
            if (parsedData.date === today) {
              setWaterConsumed(parsedData.waterConsumed)
              setWaterGoal(parsedData.waterGoal)

              // Sync to Supabase
              await syncToSupabase(parsedData.waterConsumed, parsedData.waterGoal)
            } else {
              // It's a new day, reset water consumed but keep the goal
              setWaterConsumed(0)
              setWaterGoal(parsedData.waterGoal || 2000)

              // Create new entry in Supabase
              await syncToSupabase(0, parsedData.waterGoal || 2000)
            }
          } else {
            // No data anywhere, use defaults
            setWaterConsumed(0)
            setWaterGoal(2000)

            // Create new entry in Supabase
            await syncToSupabase(0, 2000)
          }
        }
      } else {
        // No user, just use AsyncStorage
        const storedData = await AsyncStorage.getItem("waterData")

        if (storedData) {
          const parsedData = JSON.parse(storedData)

          // Only use stored data if it's from today
          if (parsedData.date === today) {
            setWaterConsumed(parsedData.waterConsumed)
            setWaterGoal(parsedData.waterGoal)
          } else {
            // It's a new day, reset water consumed but keep the goal
            setWaterConsumed(0)
            setWaterGoal(parsedData.waterGoal || 2000)

            // Save to AsyncStorage
            await AsyncStorage.setItem(
              "waterData",
              JSON.stringify({
                date: today,
                waterConsumed: 0,
                waterGoal: parsedData.waterGoal || 2000,
              }),
            )
          }
        } else {
          // No data, use defaults and save
          await AsyncStorage.setItem(
            "waterData",
            JSON.stringify({
              date: today,
              waterConsumed: 0,
              waterGoal: 2000,
            }),
          )
        }
      }
    } catch (error) {
      console.error("Error loading water data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const syncToSupabase = async (water, goal) => {
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
        .from("water_tracking")
        .select("id")
        .eq("user_id", user.id)
        .eq("date", today)
        .single()

      if (checkError && checkError.code !== "PGRST116") {
        console.error("Error checking existing water data:", checkError)
        return false
      }

      if (existingData) {
        // Update existing entry
        const { error: updateError } = await supabase
          .from("water_tracking")
          .update({
            water_consumed: water,
            water_goal: goal,
          })
          .eq("id", existingData.id)

        if (updateError) {
          console.error("Error updating water data:", updateError)
          return false
        }
      } else {
        // Insert new entry
        const { error: insertError } = await supabase.from("water_tracking").insert([
          {
            user_id: user.id,
            date: today,
            water_consumed: water,
            water_goal: goal,
          },
        ])

        if (insertError) {
          console.error("Error inserting water data:", insertError)
          return false
        }
      }

      return true
    } catch (error) {
      console.error("Error syncing water data to Supabase:", error)
      return false
    } finally {
      setIsSyncing(false)
    }
  }

  const handleAddWater = async (amount = null) => {
    let waterAmount = amount

    if (waterAmount === null) {
      if (!waterInput || isNaN(Number(waterInput))) {
        Alert.alert("Invalid Input", "Please enter a valid number")
        return
      }
      waterAmount = Number(waterInput)
    }

    const newTotal = waterConsumed + waterAmount

    setWaterConsumed(newTotal)
    setAddWaterModalVisible(false)
    setWaterInput("")

    // Save to AsyncStorage
    const today = new Date().toISOString().split("T")[0]
    await AsyncStorage.setItem(
      "waterData",
      JSON.stringify({
        date: today,
        waterConsumed: newTotal,
        waterGoal,
      }),
    )

    // Sync to Supabase
    await syncToSupabase(newTotal, waterGoal)
  }

  const handleUpdateGoal = async () => {
    if (!goalInput || isNaN(Number(goalInput))) {
      Alert.alert("Invalid Input", "Please enter a valid number")
      return
    }

    const newGoal = Number(goalInput)

    setWaterGoal(newGoal)
    setModalVisible(false)
    setGoalInput("")

    // Save to AsyncStorage
    const today = new Date().toISOString().split("T")[0]
    await AsyncStorage.setItem(
      "waterData",
      JSON.stringify({
        date: today,
        waterConsumed,
        waterGoal: newGoal,
      }),
    )

    // Sync to Supabase
    await syncToSupabase(waterConsumed, newGoal)
  }

  const calculateProgress = () => {
    if (waterGoal === 0) return 0
    const progress = (waterConsumed / waterGoal) * 100
    return Math.min(progress, 100)
  }

  const formatWater = (ml) => {
    if (ml >= 1000) {
      return `${(ml / 1000).toFixed(1)}L`
    }
    return `${ml}ml`
  }

  if (isLoading) {
    return (
      <GlassmorphicCard style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading water data...</Text>
        </View>
      </GlassmorphicCard>
    )
  }

  return (
    <GlassmorphicCard style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Water Tracker</Text>
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
                backgroundColor: "#33A1FF",
              },
            ]}
          />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressText}>
            {formatWater(waterConsumed)} / {formatWater(waterGoal)}
          </Text>
          <Text style={styles.progressPercentage}>{Math.round(calculateProgress())}%</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Consumed</Text>
          <Text style={styles.statValue}>{formatWater(waterConsumed)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Remaining</Text>
          <Text style={styles.statValue}>{formatWater(Math.max(0, waterGoal - waterConsumed))}</Text>
        </View>
      </View>

      <View style={styles.quickAddContainer}>
        <Text style={styles.quickAddLabel}>Quick Add:</Text>
        <View style={styles.quickAddButtons}>
          <TouchableOpacity style={styles.quickAddButton} onPress={() => handleAddWater(250)}>
            <Text style={styles.quickAddButtonText}>250ml</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAddButton} onPress={() => handleAddWater(500)}>
            <Text style={styles.quickAddButtonText}>500ml</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAddButton} onPress={() => setAddWaterModalVisible(true)}>
            <Text style={styles.quickAddButtonText}>Custom</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Update Goal Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Water Goal</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter daily water goal (ml)"
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

      {/* Add Water Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addWaterModalVisible}
        onRequestClose={() => setAddWaterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Water</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter water amount (ml)"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={waterInput}
              onChangeText={setWaterInput}
            />

            <View style={styles.modalButtons}>
              <Button
                variant="secondary"
                size="sm"
                style={styles.modalButton}
                onPress={() => setAddWaterModalVisible(false)}
              >
                Cancel
              </Button>

              <Button variant="primary" size="sm" style={styles.modalButton} onPress={() => handleAddWater()}>
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
  statLabel: {
    color: "white",
    fontSize: 12,
    marginBottom: 5,
  },
  quickAddContainer: {
    marginBottom: 8, // Reduced margin
  },
  quickAddLabel: {
    color: "white",
    fontSize: 12, // Reduced font size
    marginBottom: 5, // Reduced margin
  },
  quickAddButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickAddButton: {
    flex: 1,
    backgroundColor: "rgba(51, 161, 255, 0.2)",
    borderRadius: 5,
    padding: 8, // Reduced padding
    marginHorizontal: 3, // Reduced margin
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(51, 161, 255, 0.3)",
  },
  quickAddButtonText: {
    color: "white",
    fontSize: 12, // Reduced font size
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
  divider: {
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  statValue: {
    color: "white",
    fontSize: 14,
  },
})

export default WaterTracker
