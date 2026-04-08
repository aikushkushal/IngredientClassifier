try {
  const response = await fetch("https://project-2ttqk.vercel.app/api/classify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ imageBase64: base64 })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "API error");
  }

  resultsDiv.innerHTML = `<h2>Detected Ingredients:</h2><pre>${data.result}</pre>`;

} catch (err) {
  console.error(err);
  resultsDiv.innerHTML = "❌ Error: " + err.message;
}
