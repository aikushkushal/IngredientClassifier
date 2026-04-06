const resultsDiv = document.getElementById("results");

async function classifyImage() {
  const fileInput = document.getElementById("imageInput");
  if (!fileInput.files.length) {
    alert("Please select an image!");
    return;
  }

  resultsDiv.innerHTML = "Processing image... ⏳";

  const file = fileInput.files[0];

  try {
    // Convert image to Base64
    const base64 = await toBase64(file);

    // Call OpenAI API (GPT-4V)
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: "Identify the ingredients in this image and classify each as vegetarian, non-vegetarian, eggetarian, or vegan." },
              { type: "input_image", image: base64 }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    // GPT response text
    const text = data.output_text || "Could not identify ingredients.";

    resultsDiv.innerHTML = `<h2>Detected Ingredients:</h2><pre>${text}</pre>`;

  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = "Error detecting ingredients. Make sure your API key is correct.";
  }
}

// Helper: convert file to Base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });
}
