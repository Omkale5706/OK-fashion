class OKFashion {
  constructor() {
    this.uploadArea = document.getElementById("uploadArea")
    this.imageInput = document.getElementById("imageInput")
    this.uploadedImage = document.getElementById("uploadedImage")
    this.loading = document.getElementById("loading")
    this.results = document.getElementById("results")
    this.resultsGrid = document.getElementById("resultsGrid")
    this.currentImage = null

    this.initializeEventListeners()
    this.initializeSmoothScrolling()
  }

  initializeEventListeners() {
    // Upload area click
    this.uploadArea.addEventListener("click", () => {
      this.imageInput.click()
    })

    // File input change
    this.imageInput.addEventListener("change", (e) => {
      this.handleFileSelect(e.target.files[0])
    })

    // Drag and drop
    this.uploadArea.addEventListener("dragover", (e) => {
      e.preventDefault()
      this.uploadArea.classList.add("dragover")
    })

    this.uploadArea.addEventListener("dragleave", () => {
      this.uploadArea.classList.remove("dragover")
    })

    this.uploadArea.addEventListener("drop", (e) => {
      e.preventDefault()
      this.uploadArea.classList.remove("dragover")
      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith("image/")) {
        this.handleFileSelect(file)
      }
    })
  }

  initializeSmoothScrolling() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }

  handleFileSelect(file) {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please select a valid image file.")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB.")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      this.currentImage = e.target.result
      this.uploadedImage.src = this.currentImage
      this.uploadedImage.style.display = "block"

      // Start analysis automatically
      this.analyzeStyle()
    }
    reader.readAsDataURL(file)
  }

  async analyzeStyle() {
    if (!this.currentImage) return

    // Show loading state
    this.loading.style.display = "block"
    this.results.style.display = "none"

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Hide loading and show results
    this.loading.style.display = "none"
    this.generateStyleRecommendations()
  }

  generateStyleRecommendations() {
    // This is where you would integrate with your AI service
    const recommendations = this.getPlaceholderRecommendations()
    this.displayRecommendations(recommendations)

    // Show results section with smooth animation
    this.results.style.display = "block"
    this.results.classList.add("fade-in")

    // Scroll to results
    this.results.scrollIntoView({ behavior: "smooth" })
  }

  getPlaceholderRecommendations() {
    // Placeholder data - replace with actual AI service integration
    return [
      {
        icon: "👔",
        title: "Perfect Outfit Match",
        description:
          "Based on your body type and style, we recommend a tailored blazer in navy blue with well-fitted chinos. This combination enhances your natural proportions and creates a sophisticated look.",
      },
      {
        icon: "💇",
        title: "Ideal Hairstyle",
        description:
          "Your face shape would be perfectly complemented by a modern textured cut with a slight fade on the sides. This style will highlight your best features and give you a contemporary look.",
      },
      {
        icon: "🎨",
        title: "Your Color Palette",
        description:
          "Your skin tone works beautifully with jewel tones - emerald green, sapphire blue, and deep burgundy. These colors will make your complexion glow and enhance your natural radiance.",
      },
      {
        icon: "💍",
        title: "Accessory Recommendations",
        description:
          "Complete your look with a classic leather watch, minimalist silver jewelry, and a structured leather bag. These accessories will add sophistication without overwhelming your style.",
      },
      {
        icon: "👓",
        title: "Eyewear Suggestions",
        description:
          "Your face shape is ideal for rectangular or square-framed glasses. Consider frames in tortoiseshell or classic black for a timeless, intellectual appearance.",
      },
      {
        icon: "✨",
        title: "Style Transformation Tips",
        description:
          "To elevate your overall style, focus on fit over trends. Invest in quality basics in your recommended colors, and don't be afraid to add one statement piece to each outfit.",
      },
    ]
  }

  displayRecommendations(recommendations) {
    const recommendationsHTML = recommendations
      .map(
        (rec) => `
            <div class="result-card">
                <div class="result-icon">${rec.icon}</div>
                <div class="result-title">${rec.title}</div>
                <div class="result-description">${rec.description}</div>
            </div>
        `,
      )
      .join("")

    this.resultsGrid.innerHTML = recommendationsHTML
  }

  // Method for future AI integration
  async callAIService(imageData) {
    // This is where you would integrate with GPT Vision or Replicate
    /*
        try {
            const response = await fetch('/api/analyze-style', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: imageData,
                    analysisType: 'comprehensive', // outfit, hairstyle, color, accessories
                    preferences: this.getUserPreferences()
                })
            });
            
            const data = await response.json();
            return data.recommendations;
        } catch (error) {
            console.error('AI service error:', error);
            throw error;
        }
        */
  }

  getUserPreferences() {
    // This could be expanded to collect user preferences
    return {
      style: "modern", // classic, modern, trendy, casual
      budget: "medium", // low, medium, high
      occasion: "everyday", // everyday, work, formal, casual
      bodyType: "auto-detect",
      colorPreferences: [],
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new OKFashion()

  // Add navbar scroll effect
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
      navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "none"
    }
  })
})
