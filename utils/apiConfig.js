import AsyncStorage from "@react-native-async-storage/async-storage"

// Function to securely get the OpenAI API key
export const getOpenAIApiKey = async () => {
  try {
    // First check if we have a stored key
    const storedKey = await AsyncStorage.getItem("openai_api_key")

    // If we have a stored key, return it
    if (storedKey) {
      return storedKey
    }

    return null
  } catch (error) {
    console.error("Error retrieving API key:", error)
    return null
  }
}

// Function to securely set the OpenAI API key
export const setOpenAIApiKey = async (apiKey) => {
  try {
    await AsyncStorage.setItem("openai_api_key", apiKey)
    return true
  } catch (error) {
    console.error("Error storing API key:", error)
    return false
  }
}

// New function to verify if the OpenAI API key is valid
export const verifyOpenAIApiKey = async (apiKey) => {
  try {
    // Use the key to make a simple request to the OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: "Hello, this is a test message to verify my API key is working.",
          },
        ],
        max_tokens: 10, // Keep it minimal for testing
      }),
    })

    const data = await response.json()

    // Check if the response contains an error
    if (data.error) {
      console.error("API key verification failed:", data.error)
      return {
        valid: false,
        error: data.error.message || "Invalid API key",
        details: data.error,
      }
    }

    // If we got a valid response with choices, the key is working
    if (data.choices && data.choices.length > 0) {
      return {
        valid: true,
        message: "API key is valid and working correctly",
      }
    }

    return {
      valid: false,
      error: "Unexpected response format",
      details: data,
    }
  } catch (error) {
    console.error("Error verifying API key:", error)
    return {
      valid: false,
      error: error.message || "Network error while verifying API key",
      details: error,
    }
  }
}
