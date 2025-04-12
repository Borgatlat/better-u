"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import GlassmorphicCard from "../components/GlassmorphicCard"

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get("window")
const isIphoneX = Platform.OS === "ios" && (height >= 812 || width >= 812)

const SkincareRoutineScreen = ({ route, navigation }) => {
  const { skinType, concerns } = route.params || { skinType: "Combination", concerns: ["Acne", "Dryness"] }
  const [activeTab, setActiveTab] = useState("morning")

  // Mock product recommendations based on skin type and concerns
  const getRecommendedProducts = () => {
    const baseProducts = {
      cleanser: {
        morning: {
          name: "Gentle Foaming Cleanser",
          description: "A gentle cleanser to remove overnight oil buildup without stripping the skin.",
          ingredients: ["Glycerin", "Ceramides", "Hyaluronic Acid"],
        },
        evening: {
          name: "Double Cleanse System",
          description: "Oil cleanser followed by water-based cleanser to thoroughly remove makeup and impurities.",
          ingredients: ["Jojoba Oil", "Glycerin", "Amino Acids"],
        },
      },
      treatment: {
        morning: {
          name: "Vitamin C Serum",
          description: "Brightening antioxidant serum that protects against environmental damage.",
          ingredients: ["Ascorbic Acid", "Ferulic Acid", "Vitamin E"],
        },
        evening: {
          name: "Retinol Serum",
          description: "Anti-aging treatment that promotes cell turnover and collagen production.",
          ingredients: ["Retinol", "Peptides", "Niacinamide"],
        },
      },
      moisturizer: {
        morning: {
          name: "Lightweight Gel Moisturizer",
          description: "Oil-free hydration that won't clog pores or feel heavy.",
          ingredients: ["Hyaluronic Acid", "Aloe Vera", "Glycerin"],
        },
        evening: {
          name: "Repair Cream",
          description: "Rich moisturizer that restores the skin barrier overnight.",
          ingredients: ["Ceramides", "Fatty Acids", "Shea Butter"],
        },
      },
      sunscreen: {
        morning: {
          name: "Broad Spectrum SPF 50",
          description: "Lightweight, non-greasy protection against UVA and UVB rays.",
          ingredients: ["Zinc Oxide", "Titanium Dioxide", "Niacinamide"],
        },
      },
    }

    // Customize based on skin type
    if (skinType === "Oily") {
      baseProducts.cleanser.morning.name = "Oil-Control Foam Cleanser"
      baseProducts.moisturizer.morning.name = "Oil-Free Gel Moisturizer"
      baseProducts.moisturizer.evening.name = "Balancing Night Gel"
    } else if (skinType === "Dry") {
      baseProducts.cleanser.morning.name = "Hydrating Cream Cleanser"
      baseProducts.moisturizer.morning.name = "Rich Hydrating Cream"
      baseProducts.moisturizer.evening.name = "Intensive Repair Balm"
    }

    // Add treatments based on concerns
    const specialTreatments = []
    if (concerns.includes("Acne")) {
      specialTreatments.push({
        name: "Salicylic Acid Treatment",
        description: "Spot treatment that unclogs pores and reduces inflammation.",
        ingredients: ["2% Salicylic Acid", "Tea Tree Oil", "Zinc"],
        when: "evening",
      })
    }
    if (concerns.includes("Aging")) {
      specialTreatments.push({
        name: "Peptide Complex",
        description: "Firms skin and reduces the appearance of fine lines.",
        ingredients: ["Copper Peptides", "Matrixyl", "Argireline"],
        when: "both",
      })
    }
    if (concerns.includes("Hyperpigmentation")) {
      specialTreatments.push({
        name: "Brightening Treatment",
        description: "Reduces dark spots and evens skin tone.",
        ingredients: ["Alpha Arbutin", "Kojic Acid", "Niacinamide"],
        when: "both",
      })
    }

    return { baseProducts, specialTreatments }
  }

  const { baseProducts, specialTreatments } = getRecommendedProducts()

  const renderMorningRoutine = () => (
    <View style={styles.routineContainer}>
      <Text style={styles.routineDescription}>
        Your morning routine focuses on protection and prevention. These products are selected for your{" "}
        {skinType.toLowerCase()} skin type.
      </Text>

      <View style={styles.routineSteps}>
        <View style={styles.routineStep}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Cleanse</Text>
            <GlassmorphicCard style={styles.productCard}>
              <Text style={styles.productName}>{baseProducts.cleanser.morning.name}</Text>
              <Text style={styles.productDescription}>{baseProducts.cleanser.morning.description}</Text>
              <View style={styles.ingredientsContainer}>
                <Text style={styles.ingredientsTitle}>Key Ingredients:</Text>
                <View style={styles.ingredientsList}>
                  {baseProducts.cleanser.morning.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                      <Ionicons name="checkmark-circle" size={16} color="cyan" />
                      <Text style={styles.ingredientText}>{ingredient}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </GlassmorphicCard>
          </View>
        </View>

        <View style={styles.routineStep}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Treatment</Text>
            <GlassmorphicCard style={styles.productCard}>
              <Text style={styles.productName}>{baseProducts.treatment.morning.name}</Text>
              <Text style={styles.productDescription}>{baseProducts.treatment.morning.description}</Text>
              <View style={styles.ingredientsContainer}>
                <Text style={styles.ingredientsTitle}>Key Ingredients:</Text>
                <View style={styles.ingredientsList}>
                  {baseProducts.treatment.morning.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                      <Ionicons name="checkmark-circle" size={16} color="cyan" />
                      <Text style={styles.ingredientText}>{ingredient}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </GlassmorphicCard>

            {specialTreatments
              .filter((treatment) => treatment.when === "morning" || treatment.when === "both")
              .map((treatment, index) => (
                <GlassmorphicCard key={index} style={[styles.productCard, { marginTop: 10 }]}>
                  <Text style={styles.productName}>{treatment.name}</Text>
                  <Text style={styles.productDescription}>{treatment.description}</Text>
                  <View style={styles.ingredientsContainer}>
                    <Text style={styles.ingredientsTitle}>Key Ingredients:</Text>
                    <View style={styles.ingredientsList}>
                      {treatment.ingredients.map((ingredient, idx) => (
                        <View key={idx} style={styles.ingredientItem}>
                          <Ionicons name="checkmark-circle" size={16} color="cyan" />
                          <Text style={styles.ingredientText}>{ingredient}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </GlassmorphicCard>
              ))}
          </View>
        </View>

        <View style={styles.routineStep}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Moisturize</Text>
            <GlassmorphicCard style={styles.productCard}>
              <Text style={styles.productName}>{baseProducts.moisturizer.morning.name}</Text>
              <Text style={styles.productDescription}>{baseProducts.moisturizer.morning.description}</Text>
              <View style={styles.ingredientsContainer}>
                <Text style={styles.ingredientsTitle}>Key Ingredients:</Text>
                <View style={styles.ingredientsList}>
                  {baseProducts.moisturizer.morning.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                      <Ionicons name="checkmark-circle" size={16} color="cyan" />
                      <Text style={styles.ingredientText}>{ingredient}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </GlassmorphicCard>
          </View>
        </View>

        <View style={styles.routineStep}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>4</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Sun Protection</Text>
            <GlassmorphicCard style={styles.productCard}>
              <Text style={styles.productName}>{baseProducts.sunscreen.morning.name}</Text>
              <Text style={styles.productDescription}>{baseProducts.sunscreen.morning.description}</Text>
              <View style={styles.ingredientsContainer}>
                <Text style={styles.ingredientsTitle}>Key Ingredients:</Text>
                <View style={styles.ingredientsList}>
                  {baseProducts.sunscreen.morning.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                      <Ionicons name="checkmark-circle" size={16} color="cyan" />
                      <Text style={styles.ingredientText}>{ingredient}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </GlassmorphicCard>
          </View>
        </View>
      </View>
    </View>
  )

  const renderEveningRoutine = () => (
    <View style={styles.routineContainer}>
      <Text style={styles.routineDescription}>
        Your evening routine focuses on repair and regeneration. These products are selected for your{" "}
        {skinType.toLowerCase()} skin type.
      </Text>

      <View style={styles.routineSteps}>
        <View style={styles.routineStep}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Cleanse</Text>
            <GlassmorphicCard style={styles.productCard}>
              <Text style={styles.productName}>{baseProducts.cleanser.evening.name}</Text>
              <Text style={styles.productDescription}>{baseProducts.cleanser.evening.description}</Text>
              <View style={styles.ingredientsContainer}>
                <Text style={styles.ingredientsTitle}>Key Ingredients:</Text>
                <View style={styles.ingredientsList}>
                  {baseProducts.cleanser.evening.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                      <Ionicons name="checkmark-circle" size={16} color="cyan" />
                      <Text style={styles.ingredientText}>{ingredient}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </GlassmorphicCard>
          </View>
        </View>

        <View style={styles.routineStep}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Treatment</Text>
            <GlassmorphicCard style={styles.productCard}>
              <Text style={styles.productName}>{baseProducts.treatment.evening.name}</Text>
              <Text style={styles.productDescription}>{baseProducts.treatment.evening.description}</Text>
              <View style={styles.ingredientsContainer}>
                <Text style={styles.ingredientsTitle}>Key Ingredients:</Text>
                <View style={styles.ingredientsList}>
                  {baseProducts.treatment.evening.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                      <Ionicons name="checkmark-circle" size={16} color="cyan" />
                      <Text style={styles.ingredientText}>{ingredient}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </GlassmorphicCard>

            {specialTreatments
              .filter((treatment) => treatment.when === "evening" || treatment.when === "both")
              .map((treatment, index) => (
                <GlassmorphicCard key={index} style={[styles.productCard, { marginTop: 10 }]}>
                  <Text style={styles.productName}>{treatment.name}</Text>
                  <Text style={styles.productDescription}>{treatment.description}</Text>
                  <View style={styles.ingredientsContainer}>
                    <Text style={styles.ingredientsTitle}>Key Ingredients:</Text>
                    <View style={styles.ingredientsList}>
                      {treatment.ingredients.map((ingredient, idx) => (
                        <View key={idx} style={styles.ingredientItem}>
                          <Ionicons name="checkmark-circle" size={16} color="cyan" />
                          <Text style={styles.ingredientText}>{ingredient}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </GlassmorphicCard>
              ))}
          </View>
        </View>

        <View style={styles.routineStep}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Moisturize</Text>
            <GlassmorphicCard style={styles.productCard}>
              <Text style={styles.productName}>{baseProducts.moisturizer.evening.name}</Text>
              <Text style={styles.productDescription}>{baseProducts.moisturizer.evening.description}</Text>
              <View style={styles.ingredientsContainer}>
                <Text style={styles.ingredientsTitle}>Key Ingredients:</Text>
                <View style={styles.ingredientsList}>
                  {baseProducts.moisturizer.evening.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                      <Ionicons name="checkmark-circle" size={16} color="cyan" />
                      <Text style={styles.ingredientText}>{ingredient}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </GlassmorphicCard>
          </View>
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Your Skincare Routine</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileItem}>
          <Text style={styles.profileLabel}>Skin Type</Text>
          <Text style={styles.profileValue}>{skinType}</Text>
        </View>
        <View style={styles.profileItem}>
          <Text style={styles.profileLabel}>Concerns</Text>
          <Text style={styles.profileValue}>{concerns.join(", ")}</Text>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "morning" && styles.activeTab]}
          onPress={() => setActiveTab("morning")}
        >
          <Ionicons name="sunny-outline" size={20} color={activeTab === "morning" ? "cyan" : "white"} />
          <Text style={[styles.tabText, activeTab === "morning" && styles.activeTabText]}>Morning</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "evening" && styles.activeTab]}
          onPress={() => setActiveTab("evening")}
        >
          <Ionicons name="moon-outline" size={20} color={activeTab === "evening" ? "cyan" : "white"} />
          <Text style={[styles.tabText, activeTab === "evening" && styles.activeTabText]}>Evening</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "morning" ? renderMorningRoutine() : renderEveningRoutine()}
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
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileItem: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
  },
  profileLabel: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 5,
  },
  profileValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: "rgba(0, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "cyan",
  },
  tabText: {
    color: "white",
    marginLeft: 5,
  },
  activeTabText: {
    color: "cyan",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  routineContainer: {
    marginBottom: 20,
  },
  routineDescription: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 20,
  },
  routineSteps: {},
  routineStep: {
    flexDirection: "row",
    marginBottom: 20,
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    marginTop: 5,
  },
  stepNumber: {
    color: "cyan",
    fontWeight: "bold",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productCard: {
    padding: 15,
  },
  productName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productDescription: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 10,
  },
  ingredientsContainer: {
    marginTop: 5,
  },
  ingredientsTitle: {
    color: "white",
    fontSize: 14,
    marginBottom: 5,
  },
  ingredientsList: {},
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  ingredientText: {
    color: "#aaa",
    fontSize: 14,
    marginLeft: 10,
  },
  bottomPadding: {
    height: 100,
  },
})

export default SkincareRoutineScreen
