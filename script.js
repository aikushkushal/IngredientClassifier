async function classifyImage() {
  const fileInput = document.getElementById("imageInput");
  const resultsDiv = document.getElementById("results");

  if (!fileInput.files.length) {
    alert("Please select an image!");
    return;
  }

  resultsDiv.innerHTML = "Processing image... ⏳";

  const file = fileInput.files[0];
  const base64 = await toBase64(file);

  try {
    const response = await fetch("https://project-2ttqk.vercel.app/api/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64: base64 })
    });

    const data = await response.json();
    resultsDiv.innerHTML = `<h2>Detected Ingredients:</h2><pre>${data.result}</pre>`;
  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = "Error detecting ingredients.";
  }
}
