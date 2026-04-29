import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const getDestinationSuggestions = async (req, res) => {
  try {
    const { destination } = req.body;

    if (!destination || !destination.trim()) {
      return res.status(400).json({
        message: 'Destination is required',
      });
    }

    if (!GEMINI_API_KEY) {
      return res.status(500).json({
        message: 'Gemini API key is not configured on the server.',
      });
    }

    const prompt = `
You are a helpful travel planner.

Given a destination location, list the nearest best tourist places around it (within roughly 50km radius if possible).

Return ONLY a valid JSON array (no extra text, no Markdown, no code fences).

Each item in the array must be an object with this exact shape:
{
  "name": string,
  "shortDescription": string,
  "category": string,
  "approxDistanceKm": number,
  "rating": number,
  "bestTimeToVisit": string
}

Destination: "${destination}"
    `.trim();

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return res.status(502).json({
        message: 'Failed to fetch suggestions from Gemini API.',
      });
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || '')
        .join(' ')
        .trim() || '[]';

    let places = [];
    try {
      places = JSON.parse(text);
      if (!Array.isArray(places)) {
        places = [];
      }
    } catch (err) {
      console.error('Failed to parse Gemini response as JSON:', err);
      places = [];
    }

    return res.json({
      destination: destination.trim(),
      places,
    });
  } catch (error) {
    console.error('Error in getDestinationSuggestions:', error);
    return res.status(500).json({
      message: 'Something went wrong while generating destination suggestions.',
    });
  }
};

export default { getDestinationSuggestions };

