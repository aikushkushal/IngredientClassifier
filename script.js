// Mock ingredient database
const ingredientDB = {
  "tomato": "vegetarian",
  "lettuce": "vegan",
  "chicken": "non-vegetarian",
  "egg": "eggetarian",
  "tofu": "vegan",
  "cheese": "vegetarian",
  "fish": "non-vegetarian"
};

// Mock image-to-ingredient detection
function detectIngredients(file) {
  // For prototype, we’ll randomly pick ingredients
  const ingredients = ["tomato", "chicken", "egg", "lettuce"];
  return ingredients;
}

// Classify ingredients
function classifyImage() {
  const fileInput = document.getElementById("imageInput");
  const resultsDiv = document.getElementById("results");

  if (!fileInput.files.length) {
    alert("Please select an image first!");
    return;
  }

  const ingredients = detectIngredients(fileInput.files[0]);
  let html = "<h2>Detected Ingredients:</h2><ul>";

  ingredients.forEach(item => {
    const category = ingredientDB[item] || "Unknown";
    html += `<li>${item} → <strong>${category}</strong></li>`;
  });

  html += "</ul>";
  resultsDiv.innerHTML = html;
}
