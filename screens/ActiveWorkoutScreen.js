"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Animated,
  Dimensions,
  Platform,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { supabase } from "../lib/supabase"
import GlassmorphicCard from "../components/GlassmorphicCard"
import Button from "../components/Button"
import ExerciseGifView from "../components/ExerciseGifView"

const { width, height } = Dimensions.get("window")
const isIphoneX = Platform.OS === "ios" && (height >= 812 || width >= 812)

const ActiveWorkoutScreen = ({ route }) => {
  const { workout, trainingStyle } = route.params || {
    workout: {
      name: "Full Body Strength",
      exercises: [
        { name: "Bench Press", sets: 4, reps: 8, weight: 135, restTime: 90 },
        { name: "Squat", sets: 4, reps: 10, weight: 185, restTime: 120 },
        { name: "Pull-Up", sets: 3, reps: 8, weight: 0, restTime: 90 },
        { name: "Deadlift", sets: 3, reps: 8, weight: 225, restTime: 120 },
        { name: "Shoulder Press", sets: 3, reps: 10, weight: 65, restTime: 60 },
      ],
    },
  }

  const [workoutExercises, setWorkoutExercises] = useState(workout.exercises)
  const [totalSets, setTotalSets] = useState(0)
  const [currentSetIndex, setCurrentSetIndex] = useState(0)
  const navigation = useNavigation()
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [completedSets, setCompletedSets] = useState({})
  const [weights, setWeights] = useState({})
  const [reps, setReps] = useState({})
  const [notes, setNotes] = useState("")
  const [workoutStartTime, setWorkoutStartTime] = useState(new Date())
  const [elapsedTime, setElapsedTime] = useState(0)
  const [showCalories, setShowCalories] = useState(true)
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0)
  const [showHowToModal, setShowHowToModal] = useState(false)
  const [selectedExerciseHowTo, setSelectedExerciseHowTo] = useState(null)
  const [showWeightModal, setShowWeightModal] = useState(false)
  const [tempWeight, setTempWeight] = useState(0)
  const [showConfirmEndModal, setShowConfirmEndModal] = useState(false)
  const [workoutComplete, setWorkoutComplete] = useState(false)
  const [restTimerAnimation] = useState(new Animated.Value(0))
  const [restTimeRemaining, setRestTimeRemaining] = useState(90) // Set default rest time to 90 seconds
  const [showRestTimer, setShowRestTimer] = useState(false) // Add this line
  const [selectedExercise, setSelectedExercise] = useState(null)

  // Refs
  const timerInterval = useRef(null)
  const scrollViewRef = useRef(null)

  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current
  const slideAnim = useRef(new Animated.Value(0)).current

  // New state for rest timer status

  // Calculate total sets
  useEffect(() => {
    let total = 0
    workoutExercises.forEach((exercise) => {
      total += exercise.sets
    })
    setTotalSets(total)
  }, [workoutExercises])

  // Timer for workout duration
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date()
      const diff = Math.floor((now - workoutStartTime) / 1000)
      setElapsedTime(diff)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [workoutStartTime])

  // Animation for exercise transition
  const animateExerciseTransition = useCallback(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 20,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start()
  }, [fadeAnim, slideAnim])

  const currentExercise = workoutExercises[currentExerciseIndex]

  const handleSetComplete = useCallback(() => {
    console.log("handleSetComplete - currentExerciseIndex:", currentExerciseIndex)
    console.log("handleSetComplete - currentSetIndex:", currentSetIndex)
    console.log("handleSetComplete - totalSets:", totalSets)
    // If this was the last set of the exercise
    if (currentSetIndex === currentExercise.sets - 1) {
      // If this was the last exercise
      if (currentExerciseIndex === workoutExercises.length - 1) {
        setWorkoutComplete(true)
      } else {
        // Move to next exercise
        animateExerciseTransition()
        setCurrentExerciseIndex((prev) => prev + 1)
        setCurrentSetIndex(0)
      }
    } else {
      // Move to next set of current exercise
      setCurrentSetIndex((prev) => prev + 1)
    }

    // Increment completed sets
    setCompletedSets((prevCompletedSets) => {
      const newCompletedSets = { ...prevCompletedSets }
      if (!newCompletedSets[currentExerciseIndex]) {
        newCompletedSets[currentExerciseIndex] = {}
      }
      newCompletedSets[currentExerciseIndex][currentSetIndex] = true
      return newCompletedSets
    })

    // Start rest timer
    setRestTimeRemaining(90) // Set rest time to 90 seconds
    setShowRestTimer(true) // Show the rest timer
  }, [
    animateExerciseTransition,
    currentExercise,
    currentExerciseIndex,
    currentSetIndex,
    workoutExercises.length,
    totalSets,
  ])

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }, [])

  const calculateWorkoutProgress = () => {
    let completed = 0
    Object.keys(completedSets).forEach((exerciseIndex) => {
      Object.keys(completedSets[exerciseIndex]).forEach(() => {
        completed++
      })
    })
    return (completed / totalSets) * 100
  }

  const handleAdjustWeight = () => {
    setTempWeight(currentExercise.weight)
    setShowWeightModal(true)
  }

  const saveWeight = () => {
    const updatedExercises = [...workoutExercises]
    updatedExercises[currentExerciseIndex].weight = tempWeight
    setWorkoutExercises(updatedExercises)
    setShowWeightModal(false)
  }

  const handleEndWorkout = useCallback(() => {
    setShowConfirmEndModal(true)
  }, [setShowConfirmEndModal])

  const confirmEndWorkout = useCallback(async () => {
    setShowConfirmEndModal(false)
    console.log("Starting confirmEndWorkout")
    // Calculate workout stats
    const duration = Math.floor((new Date() - workoutStartTime) / 1000)
    const totalWeight = workoutExercises.reduce((acc, exercise) => {
      // Check if exercise.weight is valid before using it
      const weight = exercise.weight || 0 // Default to 0 if weight is null or undefined
      const reps = exercise.reps || 0 // Default to 0 if reps is null or undefined
      const sets = exercise.sets || 0 // Default to 0 if sets is null or undefined
      return acc + sets * reps * weight
    }, 0)

    // Extract exercise names
    const exerciseNames = workoutExercises.map((exercise) => exercise.name)

    // Prepare workout log data
    const workoutLogData = {
      trainingStyle: trainingStyle.title,
      duration: formatTime(duration),
      exercise_count: workoutExercises.length,
      set_count: totalSets,
      completed_sets: Object.keys(completedSets).reduce((acc, key) => acc + Object.keys(completedSets[key]).length, 0),
      total_weight: totalWeight,
      exercise_names: exerciseNames,
      notes: notes,
    }

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        Alert.alert("Error", "No user logged in")
        return
      }

      // Log workout data before inserting
      console.log("Workout Log Data:", workoutLogData)

      // Insert into Supabase
      try {
        const { data, error } = await supabase
          .from("workout_logs")
          .insert([
            {
              user_id: user.id,
              training_style: workoutLogData.trainingStyle,
              duration: workoutLogData.duration,
              exercise_count: workoutLogData.exercise_count,
              set_count: workoutLogData.set_count,
              completed_sets: workoutLogData.completed_sets,
              total_weight: workoutLogData.total_weight || 0, // Ensure total_weight is not null
              exercise_names: workoutLogData.exercise_names,
              notes: notes,
            },
          ])
          .select()

        console.log("Supabase response data:", data)
        console.log("Supabase response error:", error)

        if (error) {
          console.error("Error saving workout log to Supabase:", error)
          Alert.alert("Error", `Failed to save workout log. Please try again. ${error.message}`)
          return
        }

        console.log("Navigation called")
        // Navigate to workout summary
        navigation.navigate("WorkoutLog")
      } catch (supabaseError) {
        console.error("Supabase insert error:", supabaseError)
        Alert.alert("Error", `Failed to save workout log. Please try again. ${supabaseError.message}`)
      }
    } catch (error) {
      console.log("Error in confirmEndWorkout:", error)
      console.error("Error in confirmEndWorkout:", error)
      Alert.alert("Error", `An unexpected error occurred. Please try again. ${error.message}`)
    }
  }, [workoutExercises, trainingStyle, totalSets, completedSets, notes, navigation, formatTime])

  // Get exercise steps from howToData
  const getExerciseSteps = (exerciseName) => {
    const howToData = {
      "back squat": {
        steps: [
          "Place bar on upper back, feet shoulder-width.",
          "Lower into a squat.",
          "Push through heels to return up.",
        ],
        image: "/placeholder.svg?height=150&width=150",
      },
      "bench press": {
        steps: ["Lie flat and grip the bar slightly wider than shoulders.", "Lower bar to chest.", "Press back up."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "bicep curl": {
        steps: ["Hold weights with palms facing forward.", "Curl up to shoulders.", "Lower slowly."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "box jump": {
        steps: ["Stand before a box.", "Jump up and land softly.", "Step or jump down."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "bulgarian split squat": {
        steps: ["Place rear foot on bench.", "Lower front leg into lunge.", "Push back up."],
        image: "/placeholder.svg?height=150&width=150",
      },
      burpees: {
        steps: ["Drop into plank, do a push-up.", "Jump feet forward.", "Explode upward."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "cable flyes": {
        steps: ["Stand between cables with arms out.", "Bring hands together in front.", "Return slowly."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "calf raise": {
        steps: ["Stand flat with feet hip-width apart.", "Lift heels to stand on toes.", "Lower back down."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "cat-cow stretch": {
        steps: ["Start on hands and knees.", "Arch back (cat), then drop belly (cow).", "Alternate slowly."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "clean and jerk": {
        steps: ["Lift bar to shoulders (clean).", "Dip and drive bar overhead (jerk).", "Stand tall to finish."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "close-grip bench press": {
        steps: ["Grip bar shoulder-width apart.", "Lower to chest.", "Press up using triceps."],
        image: "/placeholder.svg?height=150&width=150",
      },
      deadlift: {
        steps: ["Hinge at hips, grip bar.", "Stand tall with flat back.", "Lower under control."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "depth jump": {
        steps: ["Step off box.", "Land and jump upward.", "Reset and repeat."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "dumbbell bench press": {
        steps: ["Lie on a bench with dumbbells.", "Lower to chest level.", "Press back up."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "dumbbell row": {
        steps: ["Support one hand on bench.", "Row dumbbell to side.", "Lower with control."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "dumbbell shrug": {
        steps: ["Hold dumbbells at sides.", "Lift shoulders up.", "Lower back down."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "dumbbell skullcrusher": {
        steps: ["Lie down holding dumbbells overhead.", "Lower toward forehead.", "Extend arms to finish."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "face pull": {
        steps: ["Set rope at face height.", "Pull toward face with elbows out.", "Squeeze shoulder blades."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "front squat": {
        steps: ["Hold barbell across front shoulders.", "Squat down with upright torso.", "Stand back up."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "glute bridge": {
        steps: ["Lie down, feet flat.", "Lift hips up.", "Lower slowly."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "goblet squat": {
        steps: ["Hold weight at chest.", "Squat down.", "Stand back up."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "hammer curl": {
        steps: ["Hold dumbbells palms-in.", "Curl to shoulders.", "Lower with control."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "hanging leg raise": {
        steps: ["Hang from a bar.", "Raise legs straight.", "Lower slowly."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "high knees": {
        steps: ["Jog in place.", "Drive knees up fast.", "Swing arms rhythmically."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "jumping jacks": {
        steps: ["Jump feet out, arms up.", "Return to start.", "Repeat rhythmically."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "kettlebell swing": {
        steps: ["Hinge at hips.", "Swing kettlebell forward.", "Let it return between legs."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "lateral raise": {
        steps: ["Hold dumbbells at sides.", "Raise to shoulder height.", "Lower slowly."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "leg curl": {
        steps: ["Lie on machine, pad on ankles.", "Curl legs up.", "Lower slowly."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "leg extension": {
        steps: ["Sit with ankles under pad.", "Extend legs straight.", "Lower slowly."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "leg press": {
        steps: ["Sit and place feet on platform.", "Lower until knees are bent.", "Push back up."],
        image: "/placeholder.svg?height=150&width=150",
      },
      lunges: {
        steps: ["Step forward into a lunge.", "Lower both knees.", "Push back to start."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "medicine ball throw": {
        steps: ["Hold ball at chest.", "Throw forward or overhead.", "Retrieve and repeat."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "military press": {
        steps: ["Hold bar at shoulders.", "Press overhead.", "Lower with control."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "mountain climbers": {
        steps: ["Start in plank.", "Drive knees alternately.", "Keep hips level."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "pause squat": {
        steps: ["Lower into squat.", "Pause at bottom.", "Stand up."],
        image: "/placeholder.svg?height=150&width=150",
      },
      plank: {
        steps: ["Rest on forearms and toes.", "Keep body straight.", "Hold position."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "preacher curl": {
        steps: ["Rest arms on pad.", "Curl bar or dumbbell up.", "Lower under control."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "pull-up": {
        steps: ["Grip bar overhead.", "Pull chin above bar.", "Lower back down."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "push press": {
        steps: ["Dip slightly.", "Drive bar overhead.", "Lock out arms."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "push-ups": {
        steps: ["Lower chest to floor.", "Keep body straight.", "Push back up."],
        image: "/placeholder.svg?height=150&width=150",
      },
      row: {
        steps: ["Hinge at hips holding bar or dumbbells.", "Pull weight to torso.", "Lower back down."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "shoulder stretch": {
        steps: ["Pull one arm across chest.", "Hold with opposite hand.", "Switch sides."],
        image: "/placeholder.svg?height=150&width=150",
      },
      snatch: {
        steps: ["Pull bar explosively from floor.", "Catch overhead in a squat.", "Stand up to finish."],
        image: "/placeholder.svg?height=150&width=150",
      },
      squat: {
        steps: ["Stand with feet shoulder-width.", "Lower hips back and down.", "Push through heels to rise."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "treadmill (moderate pace)": {
        steps: ["Set pace to jog or brisk walk.", "Maintain steady form.", "Breathe rhythmically."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "tricep dip": {
        steps: ["Lower body between bars or from bench.", "Bend elbows to 90°.", "Push back up."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "tricep pushdown": {
        steps: ["Grip rope or bar.", "Extend arms downward.", "Return with control."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "upright row": {
        steps: ["Hold bar or dumbbells in front.", "Pull toward chin.", "Lower with control."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "walking lunges": {
        steps: ["Step forward into a lunge.", "Push through heel to rise.", "Step forward with opposite leg."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "weighted crunch": {
        steps: ["Lie down holding weight.", "Crunch up.", "Lower slowly."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "wrist curl": {
        steps: ["Hold bar with palms up.", "Curl wrists up.", "Lower with control."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "agility ladder drills": {
        steps: ["Choose a movement pattern.", "Move quickly through the ladder.", "Repeat with precision."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "cat-cow stretch": {
        steps: ["On hands and knees, arch back (cat).", "Drop belly and lift chest (cow).", "Alternate slowly."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "hamstring stretch": {
        steps: ["Sit or stand and extend one leg.", "Hinge at hips and reach forward.", "Hold and switch legs."],
        image: "/placeholder.svg?height=150&width=150",
      },
      "quad stretch": {
        steps: ["Stand, grab ankle behind you.", "Pull heel to glutes.", "Keep knees close together and hold"],
        image: "/placeholder.svg?height=150&width=150",
      },
      other: {
        steps: ["Step 1: Do this.", "Step 2: Do that.", "Step 3: Repeat."],
        image: "/placeholder.svg?height=150&width=150",
      },
    }
    const defaultSteps = ["No instructions available for this exercise."]
    return howToData[exerciseName?.toLowerCase()]?.steps || defaultSteps
  }

  // Render a single exercise set
  const renderSet = (exercise, exerciseIndex, setIndex) => {
    const isCompleted = completedSets[exerciseIndex] && completedSets[exerciseIndex][setIndex]
    const currentWeight = weights[exerciseIndex] ? weights[exerciseIndex][setIndex] || 0 : 0
    const currentReps =
      reps[exerciseIndex] && reps[exerciseIndex][setIndex] ? reps[exerciseIndex][setIndex] : exercise.reps || ""

    return (
      <View key={`set-${exerciseIndex}-${setIndex}`} style={styles.setRow}>
        <Text style={styles.setText}>Set {setIndex + 1}</Text>

        <View style={styles.weightContainer}>
          <Text style={styles.weightLabel}>Weight (lbs)</Text>
          <TextInput
            style={[styles.weightInput, isCompleted && styles.completedInput]}
            value={currentWeight?.toString()}
            onChangeText={(value) => updateWeight(exerciseIndex, setIndex, value)}
            keyboardType="numeric"
            editable={!isCompleted}
          />
        </View>

        <View style={styles.repsContainer}>
          <Text style={styles.repsLabel}>Reps</Text>
          <TextInput
            style={[styles.repsInput, isCompleted && styles.completedInput]}
            value={currentReps?.toString()}
            onChangeText={(value) => updateReps(exerciseIndex, setIndex, value)}
            keyboardType="numeric"
            editable={!isCompleted}
            placeholder={exercise.reps?.toString() || ""}
            placeholderTextColor="#666"
          />
        </View>

        <TouchableOpacity
          style={[styles.checkButton, isCompleted && styles.completedButton]}
          onPress={() => {
            if (currentExerciseIndex === exerciseIndex && currentSetIndex === setIndex) {
              handleSetComplete()
            }
          }}
          disabled={!(currentExerciseIndex === exerciseIndex && currentSetIndex === setIndex)}
        >
          <Ionicons
            name={isCompleted ? "checkmark-circle" : "ellipse-outline"}
            size={24}
            color={currentExerciseIndex === exerciseIndex && currentSetIndex === setIndex ? "#4CAF50" : "#666"}
          />
        </TouchableOpacity>
      </View>
    )
  }

  // Function to handle the "How-to" button press
  const handleHowToPress = (exercise) => {
    console.log("How-to button pressed for:", exercise.name)
    setSelectedExerciseHowTo(exercise)
    console.log("setSelectedExerciseHowTo:", exercise)
    setShowHowToModal(true)
    console.log("setShowHowToModal:", true)
  }

  // Render a single exercise with all its sets
  const renderExercise = (exercise, index) => {
    const targetMuscles = exercise.targetMuscles ? exercise.targetMuscles.join(", ") : ""
    const isCurrentExercise = index === currentExerciseIndex

    const handleExercisePress = (exercise) => {
      navigation.navigate("ExerciseDetail", { exercise })
    }

    return (
      <GlassmorphicCard
        key={`exercise-${index}`}
        style={[styles.exerciseCard, isCurrentExercise && styles.currentExerciseCard]}
      >
        <View style={styles.exerciseHeader}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <TouchableOpacity
            style={styles.howToButton}
            onPress={() => {
              console.log("How-to button pressed for:", exercise.name)
              handleHowToPress(exercise)
            }}
          >
            <Text style={styles.howToButtonText}>How-To</Text>
          </TouchableOpacity>
          {targetMuscles ? <Text style={styles.targetMuscles}>{targetMuscles}</Text> : null}
        </View>

        <TouchableOpacity onPress={() => handleExercisePress(exercise)}>
          <View style={styles.setsContainer}>
            {Array.from({ length: exercise.sets }).map((_, setIndex) => renderSet(exercise, index, setIndex))}
          </View>
        </TouchableOpacity>
      </GlassmorphicCard>
    )
  }

  const confirmFinishWorkout = () => {
    Alert.alert(
      "Finish Workout",
      "Are you sure you want to finish this workout?",
      [
        { text: "Cancel", style: "cancel", color: "black" },
        {
          text: "Finish",
          onPress: async () => {
            // Calculate workout stats
            const duration = Math.floor((new Date() - workoutStartTime) / 1000)
            const totalVolume = workoutExercises.reduce((acc, exercise) => {
              return acc + exercise.sets * exercise.reps * exercise.weight
            }, 0)

            // Navigate to workout summary
            navigation.navigate("WorkoutLog", {
              workout: workout.name,
              duration,
              exercises: workoutExercises,
              completedSets,
              totalSets,
              totalVolume,
            })
          },
        },
      ],
      { cancelable: false },
    )
  }

  const updateWeight = (exerciseIndex, setIndex, value) => {
    setWeights((prevWeights) => {
      const newWeights = { ...prevWeights }
      if (!newWeights[exerciseIndex]) {
        newWeights[exerciseIndex] = {}
      }
      newWeights[exerciseIndex][setIndex] = value
      return newWeights
    })
  }

  const updateReps = (exerciseIndex, setIndex, value) => {
    setReps((prevReps) => {
      const newReps = { ...prevReps }
      if (!newReps[exerciseIndex]) {
        newReps[exerciseIndex] = {}
      }
      newReps[exerciseIndex][setIndex] = value
      return newReps
    })
  }

  const toggleSetCompletion = (exerciseIndex, setIndex) => {
    setCompletedSets((prevCompletedSets) => {
      const newCompletedSets = { ...prevCompletedSets }
      if (!newCompletedSets[exerciseIndex]) {
        newCompletedSets[exerciseIndex] = {}
      }
      newCompletedSets[exerciseIndex][setIndex] = !newCompletedSets[exerciseIndex][setIndex]
      return newCompletedSets
    })
  }

  useEffect(() => {
    let intervalId

    if (showRestTimer && restTimeRemaining > 0) {
      intervalId = setInterval(() => {
        setRestTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId)
            setShowRestTimer(false)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    } else if (!showRestTimer) {
      clearInterval(intervalId)
    }

    return () => clearInterval(intervalId)
  }, [showRestTimer, restTimeRemaining])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              Alert.alert("Exit Workout", "Are you sure you want to exit? Your progress will be lost.", [
                { text: "Cancel", style: "cancel" },
                { text: "Exit", onPress: () => navigation.goBack() },
              ])
            }}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.workoutTitle}>{workout.name || (trainingStyle ? trainingStyle.title : "Workout")}</Text>
            <View style={styles.timerContainer}>
              <Ionicons name="time-outline" size={16} color="#0099ff" />
              <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>

              {showCalories && (
                <View style={styles.calorieContainer}>
                  <Ionicons name="flame-outline" size={16} color="#ff6b6b" />
                  <Text style={styles.calorieText}>{totalCaloriesBurned} cal</Text>
                </View>
              )}
            </View>
          </View>

          <TouchableOpacity style={styles.finishButton} onPress={handleEndWorkout}>
            <Text style={styles.finishButtonText}>Finish</Text>
          </TouchableOpacity>
        </View>

        {/* Workout content */}
        <ScrollView ref={scrollViewRef} style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {workoutExercises.map((exercise, index) => renderExercise(exercise, index))}

          {selectedExercise && <ExerciseGifView exercise={selectedExercise} />}

          {/* Notes section */}
          <GlassmorphicCard style={styles.notesCard}>
            <Text style={styles.notesTitle}>Workout Notes</Text>
            <TextInput
              style={styles.notesInput}
              multiline
              placeholder="Add notes about your workout..."
              placeholderTextColor="#666"
              value={notes}
              onChangeText={setNotes}
            />
          </GlassmorphicCard>

          {/* Finish button at bottom */}
          <Button variant="primary" size="lg" style={styles.bottomFinishButton} onPress={handleEndWorkout}>
            Finish Workout
          </Button>
        </ScrollView>

        {/* How-to Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showHowToModal}
          onRequestClose={() => {
            setShowHowToModal(false)
            setSelectedExerciseHowTo(null)
          }}
        >
          {console.log("Modal is visible:", showHowToModal)}
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>How to {selectedExerciseHowTo?.name}</Text>
              <Image
                source={{
                  uri:
                    selectedExerciseHowTo?.image ||
                    `/placeholder.svg?height=200&width=300&text=${selectedExerciseHowTo?.name}`,
                }}
                style={styles.howToImage}
              />
              <ScrollView style={styles.howToStepsContainer}>
                {getExerciseSteps(selectedExerciseHowTo?.name).map((step, index) => (
                  <Text key={index} style={styles.howToStep}>
                    {index + 1}. {step}
                  </Text>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.howToCloseButton}
                onPress={() => {
                  setShowHowToModal(false)
                  setSelectedExerciseHowTo(null)
                }}
              >
                <Text style={styles.howToCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Confirm End Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showConfirmEndModal}
          onRequestClose={() => setShowConfirmEndModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.confirmEndModalContent}>
              <Text style={styles.confirmEndModalTitle}>End Workout?</Text>
              <Text style={styles.confirmEndModalText}>Are you sure you want to end this workout?</Text>
              <View style={styles.modalButtons}>
                <Button
                  variant="secondary"
                  size="sm"
                  style={styles.modalButton}
                  onPress={() => setShowConfirmEndModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Button>
                <Button variant="primary" size="sm" style={styles.modalButton} onPress={confirmEndWorkout}>
                  End Workout
                </Button>
              </View>
            </View>
          </View>
        </Modal>
        {showRestTimer && (
          <View style={styles.restTimerContainer}>
            <Text style={styles.restTimerValue}>{restTimeRemaining}</Text>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={() => {
                setShowRestTimer(false)
              }}
            >
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? (isIphoneX ? 10 : 10) : 40,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  workoutTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  timerText: {
    color: "#0099ff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
  calorieContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  calorieText: {
    color: "#ff6b6b",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
  finishButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "rgba(0, 153, 255, 0.2)",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 153, 255, 0.3)",
  },
  finishButtonText: {
    color: "#0099ff",
    fontSize: 14,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  exerciseCard: {
    marginBottom: 15,
    padding: 15,
  },
  currentExerciseCard: {
    borderColor: "rgba(0, 153, 255, 0.5)",
    borderWidth: 2,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  exerciseName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  targetMuscles: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 5,
  },
  setsContainer: {
    marginTop: 10,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  setText: {
    color: "white",
    fontSize: 16,
    width: 60,
  },
  weightContainer: {
    alignItems: "center",
    width: 80,
  },
  weightLabel: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 5,
  },
  weightInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 70,
    textAlign: "center",
  },
  repsContainer: {
    alignItems: "center",
    width: 80,
  },
  repsLabel: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 5,
  },
  repsInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 70,
    textAlign: "center",
  },
  completedInput: {
    backgroundColor: "rgba(76, 175, 80, 0.2)",
    borderColor: "rgba(76, 175, 80, 0.5)",
    borderWidth: 1,
  },
  checkButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  completedButton: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderRadius: 20,
  },
  notesCard: {
    marginTop: 10,
    marginBottom: 20,
    padding: 15,
  },
  notesTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  notesInput: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
    textAlignVertical: "top",
  },
  bottomFinishButton: {
    marginTop: 20,
    marginBottom: 30,
  },
  restTimerContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 153, 255, 0.5)",
    overflow: "hidden",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  restTimerContent: {
    alignItems: "center",
  },
  restTimerTitle: {
    color: "#0099ff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  restTimerValue: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 15,
  },
  dismissButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
  },
  dismissButtonText: {
    color: "white",
    fontSize: 14,
  },
  // How-to Button Style
  howToButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "rgba(0, 153, 255, 0.1)",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 153, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  howToButtonText: {
    color: "white",
    fontSize: 12,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "#1a1a1a",
    borderRadius: 15,
    padding: 20,
    maxHeight: "90%",
  },
  modalTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  howToImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  howToStepsContainer: {
    maxHeight: 200,
    width: "100%",
  },
  howToStep: {
    color: "#ddd",
    fontSize: 14,
    marginBottom: 5,
    textAlign: "left",
  },
  howToCloseButtonText: {
    color: "white",
    fontSize: 16,
  },
  modalText: {
    color: "white",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButton: {
    backgroundColor: "cyan",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  confirmEndModalContent: {
    backgroundColor: "#1a1a1a",
    borderRadius: 15,
    padding: 20,
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
  },
  confirmEndModalTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  confirmEndModalText: {
    color: "#ddd",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  cancelButtonText: {
    color: "black",
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  clearButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 59, 48, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 59, 48, 0.3)",
  },
  messageCounter: {
    backgroundColor: "rgba(0, 153, 255, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 153, 255, 0.3)",
  },
  messageCountText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  syncStatusContainer: {
    backgroundColor: "rgba(0, 153, 255, 0.1)",
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 153, 255, 0.3)",
  },
  syncStatusText: {
    color: "#0099ff",
    textAlign: "center",
    fontSize: 14,
  },
  infoButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "rgba(0, 153, 255, 0.1)",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 153, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  restTimerValue: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 15,
  },
  skipButton: {
    backgroundColor: "cyan",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginLeft: 10,
  },
  skipButtonText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
})

export default ActiveWorkoutScreen
