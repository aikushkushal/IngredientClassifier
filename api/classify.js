export default async function handler(req, res) {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });

    const { imageBase64 } = req.body;
    if (!imageBase64)
      return res.status(400).json({ error: "No image provided" });

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
              {
                type: "input_text",
                text: `You are a food classification assistant.
Analyze the attached image of ingredients and return a JSON array where each ingredient has its name and type (vegetarian, non-vegetarian, eggetarian, vegan).
Example output format:
[
  {"ingredient": "Carrot", "type": "Vegetarian"},
  {"ingredient": "Egg", "type": "Eggetarian"}
]
Only include ingredients you can clearly identify.`
              },
              { type: "input_image", image: imageBase64 }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    // Extract text output
    const result = data.output_text || "Could not detect ingredients";

    res.status(200).json({ result });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
