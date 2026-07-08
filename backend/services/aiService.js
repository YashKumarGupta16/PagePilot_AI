const { GoogleGenerativeAI } = require('@google/generative-ai');

const generateWebsiteCode = async (prompt) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  // Using gemini-flash-latest to automatically use the current fast model
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

  const systemInstruction = `You are an expert web developer.
Generate a complete responsive website based on the user idea below.
Return valid JSON only, no markdown formatting, no code fences, matching exactly this shape:
{
 "title":"",
 "description":"",
 "features":[],
 "html":"",
 "css":"",
 "js":""
}
Requirements:
- Use modern UI design and a visually attractive layout.
- Use responsive layout (mobile-friendly).
- Use semantic HTML.
- html should contain only the body content (no <html>/<head> tags) since it will be injected into a preview template.
- css should be plain CSS (no preprocessor syntax).
- js should be vanilla JS only (no external libraries).

User idea: ${prompt}`;

  const generationConfig = {
    responseMimeType: 'application/json',
  };

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: systemInstruction }] }],
    generationConfig,
  });

  const response = result.response;
  let text = response.text();

  // Strip markdown fences just in case the model ignores mimeType
  if (text.startsWith('```json')) {
    text = text.substring(7);
  }
  if (text.startsWith('```')) {
    text = text.substring(3);
  }
  if (text.endsWith('```')) {
    text = text.substring(0, text.length - 3);
  }

  try {
    const parsedJSON = JSON.parse(text);
    return parsedJSON;
  } catch (error) {
    console.error('Raw Gemini Response:', text);
    console.error('Parsing Error:', error.message);
    throw new Error('Failed to parse AI response as JSON');
  }
};

module.exports = { generateWebsiteCode };
