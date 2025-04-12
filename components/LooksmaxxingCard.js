import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import GlassmorphicCard from "./GlassmorphicCard"

const LooksmaxxingCard = () => {
  const navigation = useNavigation()

  return (
    <GlassmorphicCard style={styles.card}>
      <TouchableOpacity style={styles.cardContent} onPress={() => navigation.navigate("Looksmaxxing")}>
        <View style={styles.iconContainer}>
          <Ionicons name="person" size={24} color="cyan" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Looksmaxxing</Text>
          <Text style={styles.description}>
            Enhance your appearance with AI-powered facial analysis, skincare, and grooming tips
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#aaa" />
      </TouchableOpacity>
    </GlassmorphicCard>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    color: "#aaa",
    fontSize: 12,
  },
})

export default LooksmaxxingCard
