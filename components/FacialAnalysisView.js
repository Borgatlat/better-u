import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const FacialAnalysisView = ({ imageUri, analysisResults, onClose }) => {
  // In a real app, analysisResults would come from an AI service
  const mockResults = {
    faceShape: "Oval",
    skinTone: "Medium",
    features: {
      eyes: {
        shape: "Almond",
        recommendations: ["Use eyelid tape for more defined crease", "Apply cold compress to reduce puffiness"],
      },
      nose: {
        shape: "Straight",
        recommendations: ["Use contour to slim the bridge", "Highlight the tip for definition"],
      },
      jawline: {
        shape: "Defined",
        recommendations: ["Maintain with jawline exercises", "Keep beard trimmed to enhance definition"],
      },
      lips: {
        shape: "Medium",
        recommendations: ["Use lip liner slightly outside natural lip line", "Keep hydrated with lip balm"],
      },
    },
    overallRecommendations: [
      "Your oval face shape works well with most hairstyles",
      "Your defined jawline is a strong feature - maintain with exercises",
      "Consider a skincare routine focused on hydration",
      "Eyebrow grooming would enhance your eye area",
    ],
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Facial Analysis Results</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={styles.overlayContainer}>
          {/* This would be replaced with actual facial landmark overlays */}
          <View style={[styles.landmark, { top: "30%", left: "25%" }]} />
          <View style={[styles.landmark, { top: "30%", right: "25%" }]} />
          <View style={[styles.landmark, { top: "45%", left: "50%" }]} />
          <View style={[styles.landmark, { top: "60%", left: "30%" }]} />
          <View style={[styles.landmark, { top: "60%", right: "30%" }]} />
        </View>
      </View>

      <View style={styles.resultsContainer}>
        <View style={styles.overviewContainer}>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Face Shape</Text>
            <Text style={styles.overviewValue}>{mockResults.faceShape}</Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>Skin Tone</Text>
            <Text style={styles.overviewValue}>{mockResults.skinTone}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Feature Analysis</Text>

        {Object.entries(mockResults.features).map(([feature, data]) => (
          <View key={feature} style={styles.featureContainer}>
            <Text style={styles.featureTitle}>{feature.charAt(0).toUpperCase() + feature.slice(1)}</Text>
            <Text style={styles.featureSubtitle}>{data.shape}</Text>
            <View style={styles.recommendationsList}>
              {data.recommendations.map((rec, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <Ionicons name="checkmark-circle" size={16} color="cyan" />
                  <Text style={styles.recommendationText}>{rec}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Overall Recommendations</Text>
        <View style={styles.overallRecommendations}>
          {mockResults.overallRecommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationItem}>
              <Ionicons name="star" size={16} color="cyan" />
              <Text style={styles.recommendationText}>{rec}</Text>
            </View>
          ))}
        </View>
      </View>
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
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  imageContainer: {
    position: "relative",
    height: 300,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  landmark: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "cyan",
    borderWidth: 1,
    borderColor: "white",
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  overviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  overviewItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 15,
    width: "48%",
  },
  overviewLabel: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 5,
  },
  overviewValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  featureContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  featureTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  featureSubtitle: {
    color: "cyan",
    fontSize: 14,
    marginBottom: 10,
  },
  recommendationsList: {
    marginTop: 10,
  },
  recommendationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  recommendationText: {
    color: "#aaa",
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  overallRecommendations: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
  },
})

export default FacialAnalysisView
