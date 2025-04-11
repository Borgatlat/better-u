"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Audio } from "expo-av"
import { supabase } from "../lib/supabase"

const SessionDetailScreen = ({ route, navigation }) => {
  const { session, onComplete } = route.params
  const [sound, setSound] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(Number.parseInt(session.duration) * 60)
  const [timer, setTimer] = useState(null)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer)
      if (sound) {
        sound.unloadAsync()
      }
    }
  }, [sound, timer])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const playAmbientSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require("../assets/ambient.mp3"), {
        shouldPlay: true,
        isLooping: true,
      })
      setSound(sound)
      setIsPlaying(true)
    } catch (error) {
      console.error("Error playing sound", error)
    }
  }

  const toggleSound = async () => {
    if (sound && isPlaying) {
      await sound.pauseAsync()
      setIsPlaying(false)
    } else if (sound) {
      await sound.playAsync()
      setIsPlaying(true)
    } else {
      playAmbientSound()
    }
  }

  const startTimer = () => {
    if (timer) clearInterval(timer)

    const newTimer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(newTimer)
          setCompleted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    setTimer(newTimer)
  }

  const pauseTimer = () => {
    if (timer) {
      clearInterval(timer)
      setTimer(null)
    }
  }

  const resetTimer = () => {
    if (timer) clearInterval(timer)
    setTimer(null)
    setTimeRemaining(Number.parseInt(session.duration) * 60)
    setCompleted(false)
  }

  const handleComplete = async () => {
    // Save session to history
    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        // Save to Supabase
        const { data, error } = await supabase.from("mental_sessions").insert([
          {
            user_id: user.id,
            session_title: session.title,
            duration: session.duration,
            date: new Date().toISOString(),
            mood: "Completed",
          },
        ])

        if (error) {
          console.error("Error saving session to Supabase:", error)
        }
      }

      // Call the onComplete callback
      if (onComplete) onComplete(session)

      // Navigate back
      navigation.goBack()
    } catch (error) {
      console.error("Error completing session:", error)
      Alert.alert("Error", "Could not save your session. Please try again.")
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{session.title}</Text>
          <TouchableOpacity style={styles.soundButton} onPress={toggleSound}>
            <Ionicons name={isPlaying ? "volume-high" : "volume-mute"} size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
            <View style={styles.timerControls}>
              {timer ? (
                <TouchableOpacity style={styles.timerButton} onPress={pauseTimer}>
                  <Ionicons name="pause" size={24} color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.timerButton} onPress={startTimer}>
                  <Ionicons name="play" size={24} color="white" />
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.timerButton} onPress={resetTimer}>
                <Ionicons name="refresh" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{session.description}</Text>
          </View>

          {session.steps && (
            <View style={styles.stepsContainer}>
              <Text style={styles.stepsTitle}>Steps</Text>
              {session.steps.map((step, index) => (
                <View key={index} style={styles.stepItem}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>Benefits</Text>
            {session.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={20} color="#58D68D" />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          {completed ? (
            <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
              <Text style={styles.completeButtonText}>Complete Session</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.completeButton, { opacity: 0.5 }]}
              onPress={() => Alert.alert("Session in Progress", "Please complete the session timer first.")}
            >
              <Text style={styles.completeButtonText}>Complete Session</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  soundButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  timerText: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
  },
  timerControls: {
    flexDirection: "row",
    justifyContent: "center",
  },
  timerButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  descriptionContainer: {
    marginBottom: 30,
  },
  descriptionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionText: {
    color: "#aaa",
    fontSize: 16,
    lineHeight: 24,
  },
  stepsContainer: {
    marginBottom: 30,
  },
  stepsTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  stepItem: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-start",
  },
  stepNumber: {
    color: "cyan",
    fontSize: 16,
    fontWeight: "bold",
    width: 25,
    marginRight: 10,
  },
  stepText: {
    color: "white",
    fontSize: 16,
    flex: 1,
    lineHeight: 24,
  },
  benefitsContainer: {
    marginBottom: 30,
  },
  benefitsTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  benefitText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  completeButton: {
    backgroundColor: "cyan",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  completeButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default SessionDetailScreen
