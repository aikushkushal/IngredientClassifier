export default async function handler(req, res) {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });

    const { imageBase64 } = req.body;
    if (!imageBase64)
      return res.status(400).json({ error: "No image provided" });

    // Prompt: classify ingredients from image
    const prompt = `You are a food assistant. Extract all ingredient names from the image and classify each as Vegetarian, Non-Vegetarian, Eggetarian, or Vegan.
Return the output as JSON in this format:
[
  {"ingredient": "Tomato", "type": "Vegetarian"},
  {"ingredient": "Egg", "type": "Eggetarian"}
]`;

    // Call OpenAI Responses API
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: prompt },
              { type: "input_image", image: imageBase64 }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    // Extract text
    const result = data.output_text || "Could not detect ingredients";

    res.status(200).json({ result });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}
