"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { supabase } from "../lib/supabase"

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get("window")
const isIphoneX = Platform.OS === "ios" && (height >= 812 || width >= 812)

const ResetPasswordScreen = ({ navigation, route }) => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // This would be handled by deep linking in a real app
  // For this example, we'll assume the user has already clicked the reset link

  const handleResetPassword = async () => {
    if (password === "" || confirmPassword === "") {
      setError("Please fill in all fields")
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      Alert.alert("Error", "Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      Alert.alert("Error", "Password must be at least 6 characters")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        setError(error.message)
        Alert.alert("Error", error.message)
      } else {
        Alert.alert("Password Reset Successful", "Your password has been updated successfully", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ])
      }
    } catch (error) {
      setError("An unexpected error occurred")
      Alert.alert("Error", "An unexpected error occurred")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.contentContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.formContainer}>
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>Enter your new password below</Text>

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={22} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter new password"
                  placeholderTextColor="#888"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={22} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm new password"
                  placeholderTextColor="#888"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="black" />
                ) : (
                  <Text style={styles.buttonText}>Reset Password</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.backToLoginButton} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.backToLoginText}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "ios" ? (isIphoneX ? 50 : 20) : 0,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  contentContainer: {
    width: "90%",
    maxWidth: 400,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    padding: 25,
    width: "100%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#B3B3B3",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  inputIcon: {
    marginHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 50,
    color: "white",
    paddingRight: 15,
  },
  errorText: {
    color: "#FF6B6B",
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "cyan",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  backToLoginButton: {
    alignItems: "center",
    marginTop: 20,
  },
  backToLoginText: {
    color: "cyan",
    fontSize: 16,
  },
})

export default ResetPasswordScreen
