"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Platform, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import GlassmorphicCard from "../components/GlassmorphicCard"
import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get("window")
const isIphoneX = Platform.OS === "ios" && (height >= 812 || width >= 812)

const LooksmaxxingScreen = () => {
  const navigation = useNavigation()
  const [facialImage, setFacialImage] = useState(null)
  const [skinType, setSkinType] = useState("Combination")
  const [skinConcerns, setSkinConcerns] = useState(["Acne", "Dryness"])
  const [progressImages, setProgressImages] = useState([])
  const [activeTab, setActiveTab] = useState("facial")

  // Request camera permissions on component mount
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      if (status !== "granted") {
        Alert.alert("Permission needed", "Camera access is needed for facial analysis")
      }
    }
    requestPermissions()
  }, [])

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFacialImage(result.assets[0].uri)
        // In a real app, you would send this image to your AI analysis service
        setTimeout(() => {
          Alert.alert("Analysis Complete", "Your facial analysis is complete. View your personalized recommendations.")
        }, 2000)
      }
    } catch (error) {
      console.error("Error picking image:", error)
      Alert.alert("Error", "There was an error selecting your image")
    }
  }

  const captureImage = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const newImage = result.assets[0].uri
        setProgressImages([{ uri: newImage, date: new Date().toLocaleDateString() }, ...progressImages])
      }
    } catch (error) {
      console.error("Error capturing image:", error)
      Alert.alert("Error", "There was an error capturing your image")
    }
  }

  const renderFacialEnhancement = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Facial Enhancement</Text>
      <Text style={styles.sectionDescription}>
        AI-powered analysis and recommendations for your complete facial care routine.
      </Text>

      <GlassmorphicCard style={styles.analysisCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="scan-outline" size={24} color="cyan" />
          <Text style={styles.cardTitle}>Facial Analysis</Text>
        </View>

        <TouchableOpacity style={styles.uploadContainer} onPress={pickImage}>
          {facialImage ? (
            <Image source={{ uri: facialImage }} style={styles.facialImage} />
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Ionicons name="camera" size={40} color="rgba(255,255,255,0.5)" />
              <Text style={styles.uploadText}>Upload a selfie for AI analysis</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.analyzeButton}
          onPress={() => {
            if (facialImage) {
              Alert.alert("Analyzing", "Processing your facial features...")
              // In a real app, you would send the image to your backend for analysis
            } else {
              pickImage()
            }
          }}
        >
          <Text style={styles.analyzeButtonText}>{facialImage ? "Analyze Features" : "Upload Photo"}</Text>
        </TouchableOpacity>
      </GlassmorphicCard>

      <GlassmorphicCard style={styles.featuresCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="list-outline" size={24} color="cyan" />
          <Text style={styles.cardTitle}>Feature Analysis</Text>
        </View>

        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="eye-outline" size={24} color="white" />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Eyes</Text>
              <Text style={styles.featureDescription}>
                Enhance your eye appearance with targeted exercises and skincare
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="cut-outline" size={24} color="white" />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Jawline</Text>
              <Text style={styles.featureDescription}>Exercises and techniques to define your jawline</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="water-outline" size={24} color="white" />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Skin</Text>
              <Text style={styles.featureDescription}>Personalized skincare routine for your skin type</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="color-palette-outline" size={24} color="white" />
            </View>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Facial Harmony</Text>
              <Text style={styles.featureDescription}>Analysis of facial proportions and balance</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#aaa" />
          </View>
        </View>
      </GlassmorphicCard>
    </View>
  )

  const renderSkincare = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Skincare Analysis</Text>
      <Text style={styles.sectionDescription}>
        Get personalized skincare routines based on your skin type and concerns.
      </Text>

      <GlassmorphicCard style={styles.skincareCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="water-outline" size={24} color="cyan" />
          <Text style={styles.cardTitle}>Your Skin Profile</Text>
        </View>

        <View style={styles.skinTypeContainer}>
          <Text style={styles.skinTypeLabel}>Skin Type:</Text>
          <View style={styles.skinTypeOptions}>
            {["Oily", "Dry", "Combination", "Sensitive", "Normal"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.skinTypeOption, skinType === type && styles.skinTypeOptionSelected]}
                onPress={() => setSkinType(type)}
              >
                <Text style={[styles.skinTypeOptionText, skinType === type && styles.skinTypeOptionTextSelected]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.skinConcernsContainer}>
          <Text style={styles.skinConcernsLabel}>Skin Concerns:</Text>
          <View style={styles.skinConcernsOptions}>
            {["Acne", "Aging", "Dryness", "Dullness", "Redness", "Hyperpigmentation"].map((concern) => (
              <TouchableOpacity
                key={concern}
                style={[styles.skinConcernOption, skinConcerns.includes(concern) && styles.skinConcernOptionSelected]}
                onPress={() => {
                  if (skinConcerns.includes(concern)) {
                    setSkinConcerns(skinConcerns.filter((c) => c !== concern))
                  } else {
                    setSkinConcerns([...skinConcerns, concern])
                  }
                }}
              >
                <Text
                  style={[
                    styles.skinConcernOptionText,
                    skinConcerns.includes(concern) && styles.skinConcernOptionTextSelected,
                  ]}
                >
                  {concern}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.getRoutineButton}
          onPress={() => {
            Alert.alert(
              "Skincare Routine",
              `Here's your personalized routine for ${skinType} skin with concerns: ${skinConcerns.join(
                ", ",
              )}. In a real app, this would show a detailed routine.`,
            )
          }}
        >
          <Text style={styles.getRoutineButtonText}>Get Personalized Routine</Text>
        </TouchableOpacity>
      </GlassmorphicCard>

      <GlassmorphicCard style={styles.routineCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="time-outline" size={24} color="cyan" />
          <Text style={styles.cardTitle}>Daily Routine</Text>
        </View>

        <View style={styles.routineSteps}>
          <View style={styles.routineStep}>
            <View style={styles.routineStepIconContainer}>
              <Text style={styles.routineStepIcon}>AM</Text>
            </View>
            <View style={styles.routineStepContent}>
              <Text style={styles.routineStepTitle}>Morning Routine</Text>
              <Text style={styles.routineStepItem}>• Gentle Cleanser</Text>
              <Text style={styles.routineStepItem}>• Vitamin C Serum</Text>
              <Text style={styles.routineStepItem}>• Moisturizer</Text>
              <Text style={styles.routineStepItem}>• SPF 30+ Sunscreen</Text>
            </View>
          </View>

          <View style={styles.routineStep}>
            <View style={styles.routineStepIconContainer}>
              <Text style={styles.routineStepIcon}>PM</Text>
            </View>
            <View style={styles.routineStepContent}>
              <Text style={styles.routineStepTitle}>Evening Routine</Text>
              <Text style={styles.routineStepItem}>• Oil Cleanser</Text>
              <Text style={styles.routineStepItem}>• Water-Based Cleanser</Text>
              <Text style={styles.routineStepItem}>• Exfoliant (2-3x weekly)</Text>
              <Text style={styles.routineStepItem}>• Treatment Serum</Text>
              <Text style={styles.routineStepItem}>• Night Cream</Text>
            </View>
          </View>
        </View>
      </GlassmorphicCard>
    </View>
  )

  const renderGrooming = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Grooming Guide</Text>
      <Text style={styles.sectionDescription}>Expert advice for hair, beard, and eyebrow maintenance.</Text>

      <GlassmorphicCard style={styles.groomingCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="cut-outline" size={24} color="cyan" />
          <Text style={styles.cardTitle}>Hair Care</Text>
        </View>

        <View style={styles.groomingSection}>
          <Text style={styles.groomingSectionTitle}>Hairstyle Recommendations</Text>
          <Text style={styles.groomingText}>
            Based on your face shape (oval), these hairstyles would complement your features:
          </Text>
          <View style={styles.hairstyleOptions}>
            <TouchableOpacity style={styles.hairstyleOption}>
              <View style={styles.hairstyleImagePlaceholder}>
                <Ionicons name="person" size={30} color="white" />
              </View>
              <Text style={styles.hairstyleText}>Textured Crop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hairstyleOption}>
              <View style={styles.hairstyleImagePlaceholder}>
                <Ionicons name="person" size={30} color="white" />
              </View>
              <Text style={styles.hairstyleText}>Side Part</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hairstyleOption}>
              <View style={styles.hairstyleImagePlaceholder}>
                <Ionicons name="person" size={30} color="white" />
              </View>
              <Text style={styles.hairstyleText}>Quiff</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.groomingSection}>
          <Text style={styles.groomingSectionTitle}>Beard Styling</Text>
          <Text style={styles.groomingText}>Recommended beard styles to enhance your facial structure:</Text>
          <View style={styles.beardOptions}>
            <TouchableOpacity style={styles.beardOption}>
              <View style={styles.beardImagePlaceholder}>
                <Ionicons name="person" size={30} color="white" />
              </View>
              <Text style={styles.beardText}>Stubble</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.beardOption}>
              <View style={styles.beardImagePlaceholder}>
                <Ionicons name="person" size={30} color="white" />
              </View>
              <Text style={styles.beardText}>Short Boxed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.beardOption}>
              <View style={styles.beardImagePlaceholder}>
                <Ionicons name="person" size={30} color="white" />
              </View>
              <Text style={styles.beardText}>Full Beard</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.groomingButton}
          onPress={() => {
            Alert.alert(
              "Grooming Tips",
              "• Wash hair 2-3 times per week\n• Use conditioner after every wash\n• Trim beard every 1-2 weeks\n• Shape eyebrows monthly\n• Use beard oil daily for healthy growth",
            )
          }}
        >
          <Text style={styles.groomingButtonText}>View Detailed Grooming Guide</Text>
        </TouchableOpacity>
      </GlassmorphicCard>

      <GlassmorphicCard style={styles.hygieneCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="water-outline" size={24} color="cyan" />
          <Text style={styles.cardTitle}>Hygiene & Fragrance</Text>
        </View>

        <View style={styles.hygieneSection}>
          <Text style={styles.hygieneSectionTitle}>Daily Hygiene Routine</Text>
          <View style={styles.hygieneItem}>
            <Ionicons name="checkmark-circle-outline" size={20} color="cyan" />
            <Text style={styles.hygieneText}>Shower daily with antibacterial soap</Text>
          </View>
          <View style={styles.hygieneItem}>
            <Ionicons name="checkmark-circle-outline" size={20} color="cyan" />
            <Text style={styles.hygieneText}>Use antiperspirant deodorant</Text>
          </View>
          <View style={styles.hygieneItem}>
            <Ionicons name="checkmark-circle-outline" size={20} color="cyan" />
            <Text style={styles.hygieneText}>Brush teeth twice daily & floss</Text>
          </View>
          <View style={styles.hygieneItem}>
            <Ionicons name="checkmark-circle-outline" size={20} color="cyan" />
            <Text style={styles.hygieneText}>Clean under nails regularly</Text>
          </View>
        </View>

        <View style={styles.fragranceSection}>
          <Text style={styles.fragranceSectionTitle}>Cologne Recommendations</Text>
          <Text style={styles.fragranceText}>Based on your profile, these fragrance families would suit you:</Text>
          <View style={styles.fragranceTypes}>
            <TouchableOpacity style={styles.fragranceType}>
              <Text style={styles.fragranceTypeText}>Woody</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fragranceType}>
              <Text style={styles.fragranceTypeText}>Fresh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fragranceType}>
              <Text style={styles.fragranceTypeText}>Spicy</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.fragranceTip}>
            Tip: Apply cologne to pulse points (wrists, neck) for longer-lasting scent
          </Text>
        </View>
      </GlassmorphicCard>
    </View>
  )

  const renderConfidence = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Confidence & Social Skills</Text>
      <Text style={styles.sectionDescription}>Build your confidence, charisma, and social presence.</Text>

      <GlassmorphicCard style={styles.confidenceCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="star-outline" size={24} color="cyan" />
          <Text style={styles.cardTitle}>Confidence Building</Text>
        </View>

        <View style={styles.confidenceSection}>
          <Text style={styles.confidenceSectionTitle}>Daily Affirmations</Text>
          <View style={styles.affirmationContainer}>
            <Text style={styles.affirmationText}>"I am confident and comfortable in my own skin."</Text>
            <TouchableOpacity style={styles.affirmationButton}>
              <Ionicons name="refresh-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.confidenceSection}>
          <Text style={styles.confidenceSectionTitle}>Body Language Tips</Text>
          <View style={styles.bodyLanguageItems}>
            <View style={styles.bodyLanguageItem}>
              <Ionicons name="body-outline" size={24} color="cyan" />
              <Text style={styles.bodyLanguageText}>Stand tall with shoulders back</Text>
            </View>
            <View style={styles.bodyLanguageItem}>
              <Ionicons name="eye-outline" size={24} color="cyan" />
              <Text style={styles.bodyLanguageText}>Maintain comfortable eye contact</Text>
            </View>
            <View style={styles.bodyLanguageItem}>
              <Ionicons name="hand-right-outline" size={24} color="cyan" />
              <Text style={styles.bodyLanguageText}>Use open hand gestures when speaking</Text>
            </View>
            <View style={styles.bodyLanguageItem}>
              <Ionicons name="happy-outline" size={24} color="cyan" />
              <Text style={styles.bodyLanguageText}>Smile genuinely and appropriately</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.confidenceButton}
          onPress={() => {
            Alert.alert(
              "Confidence Exercise",
              "Today's exercise: Practice power posing for 2 minutes before any social interaction. Stand tall with your hands on your hips or stretched overhead to boost confidence.",
            )
          }}
        >
          <Text style={styles.confidenceButtonText}>Daily Confidence Exercise</Text>
        </TouchableOpacity>
      </GlassmorphicCard>

      <GlassmorphicCard style={styles.socialCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="people-outline" size={24} color="cyan" />
          <Text style={styles.cardTitle}>Social Skills & Charisma</Text>
        </View>

        <View style={styles.socialSection}>
          <Text style={styles.socialSectionTitle}>Conversation Starters</Text>
          <View style={styles.conversationContainer}>
            <Text style={styles.conversationText}>
              "What's the most interesting thing you've been working on lately?"
            </Text>
            <TouchableOpacity style={styles.conversationButton}>
              <Ionicons name="refresh-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.socialSection}>
          <Text style={styles.socialSectionTitle}>Charisma Tips</Text>
          <View style={styles.charismaTips}>
            <View style={styles.charismaTip}>
              <Ionicons name="ear-outline" size={24} color="cyan" />
              <Text style={styles.charismaTipText}>Be an active listener</Text>
            </View>
            <View style={styles.charismaTip}>
              <Ionicons name="help-circle-outline" size={24} color="cyan" />
              <Text style={styles.charismaTipText}>Ask thoughtful questions</Text>
            </View>
            <View style={styles.charismaTip}>
              <Ionicons name="person-outline" size={24} color="cyan" />
              <Text style={styles.charismaTipText}>Remember and use people's names</Text>
            </View>
            <View style={styles.charismaTip}>
              <Ionicons name="happy-outline" size={24} color="cyan" />
              <Text style={styles.charismaTipText}>Show genuine interest in others</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => {
            Alert.alert(
              "Social Challenge",
              "This week's challenge: Strike up a conversation with one new person each day. Practice active listening by asking follow-up questions based on what they share.",
            )
          }}
        >
          <Text style={styles.socialButtonText}>Weekly Social Challenge</Text>
        </TouchableOpacity>
      </GlassmorphicCard>
    </View>
  )

  const renderProgress = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Progress Tracking</Text>
      <Text style={styles.sectionDescription}>Track your skincare and grooming journey over time.</Text>

      <View style={styles.progressActions}>
        <TouchableOpacity style={styles.captureButton} onPress={captureImage}>
          <Ionicons name="camera-outline" size={24} color="white" />
          <Text style={styles.captureButtonText}>Capture Progress Photo</Text>
        </TouchableOpacity>
      </View>

      <GlassmorphicCard style={styles.progressCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="time-outline" size={24} color="cyan" />
          <Text style={styles.cardTitle}>Your Progress Timeline</Text>
        </View>

        {progressImages.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.progressTimeline}>
            {progressImages.map((image, index) => (
              <View key={index} style={styles.progressImageContainer}>
                <Image source={{ uri: image.uri }} style={styles.progressImage} />
                <Text style={styles.progressDate}>{image.date}</Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.noProgressContainer}>
            <Ionicons name="images-outline" size={40} color="rgba(255,255,255,0.3)" />
            <Text style={styles.noProgressText}>
              No progress photos yet. Capture your first photo to start tracking.
            </Text>
          </View>
        )}
      </GlassmorphicCard>

      <GlassmorphicCard style={styles.habitsCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="checkbox-outline" size={24} color="cyan" />
          <Text style={styles.cardTitle}>Habit Tracker</Text>
        </View>

        <View style={styles.habitsContainer}>
          <View style={styles.habitItem}>
            <View style={styles.habitCheckContainer}>
              <Ionicons name="checkmark-circle" size={24} color="cyan" />
            </View>
            <View style={styles.habitTextContainer}>
              <Text style={styles.habitTitle}>Morning Skincare Routine</Text>
              <View style={styles.habitStreak}>
                <Ionicons name="flame" size={16} color="#FF9500" />
                <Text style={styles.habitStreakText}>7 day streak</Text>
              </View>
            </View>
          </View>

          <View style={styles.habitItem}>
            <View style={styles.habitCheckContainer}>
              <Ionicons name="checkmark-circle" size={24} color="cyan" />
            </View>
            <View style={styles.habitTextContainer}>
              <Text style={styles.habitTitle}>Evening Skincare Routine</Text>
              <View style={styles.habitStreak}>
                <Ionicons name="flame" size={16} color="#FF9500" />
                <Text style={styles.habitStreakText}>5 day streak</Text>
              </View>
            </View>
          </View>

          <View style={styles.habitItem}>
            <View style={styles.habitCheckContainer}>
              <Ionicons name="checkmark-circle-outline" size={24} color="rgba(255,255,255,0.5)" />
            </View>
            <View style={styles.habitTextContainer}>
              <Text style={styles.habitTitle}>Weekly Exfoliation</Text>
              <Text style={styles.habitDueText}>Due today</Text>
            </View>
          </View>

          <View style={styles.habitItem}>
            <View style={styles.habitCheckContainer}>
              <Ionicons name="checkmark-circle-outline" size={24} color="rgba(255,255,255,0.5)" />
            </View>
            <View style={styles.habitTextContainer}>
              <Text style={styles.habitTitle}>Beard Maintenance</Text>
              <Text style={styles.habitDueText}>Due in 2 days</Text>
            </View>
          </View>
        </View>
      </GlassmorphicCard>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Looksmaxxing</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "facial" && styles.activeTab]}
            onPress={() => setActiveTab("facial")}
          >
            <Ionicons name="scan-outline" size={20} color={activeTab === "facial" ? "cyan" : "white"} />
            <Text style={[styles.tabText, activeTab === "facial" && styles.activeTabText]}>Facial</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "skincare" && styles.activeTab]}
            onPress={() => setActiveTab("skincare")}
          >
            <Ionicons name="water-outline" size={20} color={activeTab === "skincare" ? "cyan" : "white"} />
            <Text style={[styles.tabText, activeTab === "skincare" && styles.activeTabText]}>Skincare</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "grooming" && styles.activeTab]}
            onPress={() => setActiveTab("grooming")}
          >
            <Ionicons name="cut-outline" size={20} color={activeTab === "grooming" ? "cyan" : "white"} />
            <Text style={[styles.tabText, activeTab === "grooming" && styles.activeTabText]}>Grooming</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "confidence" && styles.active]}
            onPress={() => setActiveTab("confidence")}
          >
            <Ionicons name="star-outline" size={20} color={activeTab === "confidence" ? "cyan" : "white"} />
            <Text style={[styles.tabText, activeTab === "confidence" && styles.activeTabText]}>Confidence</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "progress" && styles.activeTab]}
            onPress={() => setActiveTab("progress")}
          >
            <Ionicons name="trending-up-outline" size={20} color={activeTab === "progress" ? "cyan" : "white"} />
            <Text style={[styles.tabText, activeTab === "progress" && styles.activeTabText]}>Progress</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "facial" && renderFacialEnhancement()}
        {activeTab === "skincare" && renderSkincare()}
        {activeTab === "grooming" && renderGrooming()}
        {activeTab === "confidence" && renderConfidence()}
        {activeTab === "progress" && renderProgress()}

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
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  tabs: {
    paddingHorizontal: 20,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginRight: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "cyan",
  },
  tabText: {
    color: "white",
    marginLeft: 5,
    fontSize: 14,
  },
  activeTabText: {
    color: "cyan",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionDescription: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 20,
  },
  analysisCard: {
    marginBottom: 20,
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  uploadContainer: {
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  uploadPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 10,
    textAlign: "center",
  },
  facialImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  analyzeButton: {
    backgroundColor: "cyan",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  analyzeButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  featuresCard: {
    padding: 20,
  },
  featuresList: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  featureDescription: {
    color: "#aaa",
    fontSize: 12,
  },
  skincareCard: {
    marginBottom: 20,
    padding: 20,
  },
  skinTypeContainer: {
    marginBottom: 20,
  },
  skinTypeLabel: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  skinTypeOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skinTypeOption: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  skinTypeOptionSelected: {
    backgroundColor: "rgba(0, 255, 255, 0.3)",
    borderWidth: 1,
    borderColor: "cyan",
  },
  skinTypeOptionText: {
    color: "white",
    fontSize: 14,
  },
  skinTypeOptionTextSelected: {
    color: "cyan",
    fontWeight: "bold",
  },
  skinConcernsContainer: {
    marginBottom: 20,
  },
  skinConcernsLabel: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  skinConcernsOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skinConcernOption: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  skinConcernOptionSelected: {
    backgroundColor: "rgba(0, 255, 255, 0.3)",
    borderWidth: 1,
    borderColor: "cyan",
  },
  skinConcernOptionText: {
    color: "white",
    fontSize: 14,
  },
  skinConcernOptionTextSelected: {
    color: "cyan",
    fontWeight: "bold",
  },
  getRoutineButton: {
    backgroundColor: "cyan",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  getRoutineButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  routineCard: {
    padding: 20,
  },
  routineSteps: {
    marginTop: 10,
  },
  routineStep: {
    flexDirection: "row",
    marginBottom: 20,
  },
  routineStepIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  routineStepIcon: {
    color: "cyan",
    fontWeight: "bold",
  },
  routineStepContent: {
    flex: 1,
  },
  routineStepTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  routineStepItem: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 5,
  },
  groomingCard: {
    marginBottom: 20,
    padding: 20,
  },
  groomingSection: {
    marginBottom: 20,
  },
  groomingSectionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  groomingText: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 15,
  },
  hairstyleOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hairstyleOption: {
    alignItems: "center",
    width: "30%",
  },
  hairstyleImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  hairstyleText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  beardOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  beardOption: {
    alignItems: "center",
    width: "30%",
  },
  beardImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  beardText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  groomingButton: {
    backgroundColor: "cyan",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  groomingButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  hygieneCard: {
    padding: 20,
  },
  hygieneSection: {
    marginBottom: 20,
  },
  hygieneSectionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  hygieneItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  hygieneText: {
    color: "#aaa",
    fontSize: 14,
    marginLeft: 10,
  },
  fragranceSection: {
    marginBottom: 20,
  },
  fragranceSectionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fragranceText: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 15,
  },
  fragranceTypes: {
    flexDirection: "row",
    marginBottom: 15,
  },
  fragranceType: {
    backgroundColor: "rgba(0, 255, 255, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  fragranceTypeText: {
    color: "cyan",
    fontSize: 14,
  },
  fragranceTip: {
    color: "#aaa",
    fontSize: 12,
    fontStyle: "italic",
  },
  confidenceCard: {
    marginBottom: 20,
    padding: 20,
  },
  confidenceSection: {
    marginBottom: 20,
  },
  confidenceSectionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  affirmationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    padding: 15,
  },
  affirmationText: {
    color: "white",
    fontSize: 16,
    fontStyle: "italic",
    flex: 1,
  },
  affirmationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  bodyLanguageItems: {
    marginTop: 10,
  },
  bodyLanguageItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  bodyLanguageText: {
    color: "#aaa",
    fontSize: 14,
    marginLeft: 15,
  },
  confidenceButton: {
    backgroundColor: "cyan",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confidenceButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  socialCard: {
    padding: 20,
  },
  socialSection: {
    marginBottom: 20,
  },
  socialSectionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  conversationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    padding: 15,
  },
  conversationText: {
    color: "white",
    fontSize: 16,
    fontStyle: "italic",
    flex: 1,
  },
  conversationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  charismaTips: {
    marginTop: 10,
  },
  charismaTip: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  charismaTipText: {
    color: "#aaa",
    fontSize: 14,
    marginLeft: 15,
  },
  socialButton: {
    backgroundColor: "cyan",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  socialButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  progressActions: {
    marginBottom: 20,
  },
  captureButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 255, 255, 0.2)",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 255, 0.5)",
  },
  captureButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  progressCard: {
    marginBottom: 20,
    padding: 20,
  },
  progressTimeline: {
    marginTop: 15,
  },
  progressImageContainer: {
    marginRight: 15,
    alignItems: "center",
  },
  progressImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },
  progressDate: {
    color: "#aaa",
    fontSize: 12,
  },
  noProgressContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  noProgressText: {
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    marginTop: 15,
  },
  habitsCard: {
    padding: 20,
  },
  habitsContainer: {
    marginTop: 10,
  },
  habitItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  habitCheckContainer: {
    marginRight: 15,
  },
  habitTextContainer: {
    flex: 1,
  },
  habitTitle: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  habitStreak: {
    flexDirection: "row",
    alignItems: "center",
  },
  habitStreakText: {
    color: "#FF9500",
    fontSize: 12,
    marginLeft: 5,
  },
  habitDueText: {
    color: "#aaa",
    fontSize: 12,
  },
  bottomPadding: {
    height: 100,
  },
})

export default LooksmaxxingScreen
