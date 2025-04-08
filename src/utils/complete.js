const axios = require("axios");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const crypto = require("crypto");
dotenv.config();

const cacheFilePath = path.join(__dirname, "../../prompts/cache.json");
let cache = {};

// Load cache from file if it exists
if (fs.existsSync(cacheFilePath)) {
  const cacheData = fs.readFileSync(cacheFilePath, "utf-8");
  cache = JSON.parse(cacheData);
}

// Save cache to file
function saveCacheToFile() {
  fs.writeFileSync(cacheFilePath, JSON.stringify(cache, null, 2), "utf-8");
}

// Generate cache key
function generateCacheKey({ system, user, model, max_tokens }) {
  const key = `${system}-${user}-${model}-${max_tokens}`;
  return crypto.createHash("md5").update(key).digest("hex");
}

// Check if cache entry is expired
function isCacheExpired(timestamp) {
  const oneMonth = 30 * 24 * 60 * 60 * 1000; // One month in milliseconds
  return Date.now() - timestamp > oneMonth;
}

async function complete({ system, user, model, max_tokens }) {
  const cacheKey = generateCacheKey({ system, user, model, max_tokens });
  const cacheEntry = cache[cacheKey];

  if (cacheEntry && !isCacheExpired(cacheEntry.timestamp)) {
    return { data: cacheEntry.data, fromCache: true };
  }

  try {
    if (model == undefined) model = "llama-3.1-8b-instant";
    const is_chat = !model.includes("instruct");

    let apiUrl = "https://api.openai.com/v1/completions";
    if (is_chat) apiUrl = "https://api.groq.com/openai/v1/chat/completions";

    const headers = {
      Authorization: `Bearer ${process.env.GATSBY_OPENAI_KEY}`,
      "Content-Type": "application/json",
    };

    let requestData = {
      model,
      max_tokens,
    };

    if (is_chat) {
      requestData.messages = [
        {
          role: "system",
          content: system,
        },
        {
          role: "user",
          content: user,
        },
      ];
    } else {
      requestData.prompt = `${system} \n ${user}`;
    }

    const response = await axios.post(apiUrl, requestData, { headers });

    const interpretedContent = is_chat
      ? response.data.choices[0].message.content
      : response.data.choices[0].text;

    cache[cacheKey] = {
      data: interpretedContent,
      timestamp: Date.now(),
    };

    saveCacheToFile();

    return { data: interpretedContent, fromCache: false };
  } catch (error) {
    console.error("OpenAI API Request Error:", error.toString());
    return null;
  }
}

module.exports = { complete };
