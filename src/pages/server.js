const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/api/oauth/github", async (req, res) => {
  const { clientId, clientSecret, code } = req.body;

  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error in GitHub OAuth:", error.response.data);
    res.status(500).json({ error: "OAuth exchange failed" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
