/**
 * @param {string} img
 * @param {string} prompt
 * @returns {string}
 */
export async function getStructuredDataFromImage(img, prompt) {
  const res = await fetch(
    "https://jellyfish-app-wh8gr.ondigitalocean.app/read",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: img,
        prompt,
      }),
    }
  );

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error("Error reading image", data.message);
  }

  return data.candidates[0].content.parts[0].text;
}
