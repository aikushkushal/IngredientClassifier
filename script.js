const statusText = document.getElementById("status");
const resultsDiv = document.getElementById("results");

async function classifyImage() {
  const fileInput = document.getElementById("imageInput");

  if (!fileInput.files.length) {
    alert("Please select an image!");
    return;
  }

  statusText.innerText = "Processing image... ⏳";
  resultsDiv.innerText = "";

  const file = fileInput.files[0];
  const base64 = await toBase64(file);

  try {
    const response = await fetch("https://project-2ttqk.vercel.app/api/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64: base64 })
    });

    const data = await response.json();

    console.log("API response:", data); // DEBUG

    if (!response.ok) {
      throw new Error(data.error || "API failed");
    }

    statusText.innerText = "✅ Done!";
    resultsDiv.innerText = data.result;

  } catch (err) {
    console.error("Frontend error:", err);
    statusText.innerText = "❌ Error";
    resultsDiv.innerText = err.message;
  }
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
}
