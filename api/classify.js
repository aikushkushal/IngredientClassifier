export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "No image provided" });
    }

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
                text: "Identify ingredients and classify them as vegetarian, non-vegetarian, eggetarian, or vegan."
              },
              {
                type: "input_image",
                image: imageBase64
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    return res.status(200).json({
      result: data.output_text || JSON.stringify(data)
    });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error"
    });
  }
}
