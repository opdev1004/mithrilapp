import express from "express";
import cors from "cors";
import axios from "axios";
import Match from "../shared/match";

const API_TOKEN = "Your_Token"; // Replace with your football-data.org API token
const API_URL = "https://api.football-data.org/v4/matches";
const app = express();
const PORT = 3001;

app.use(cors());

let matchesCache: Match[] = [];

app.get("/api/matches", async (_, res) => {
  if (matchesCache.length === 0) {
    matchesCache = await fetchData();
  }
  res.json(matchesCache);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

async function fetchData(): Promise<Match[]> {
  const res = await axios.get(API_URL, {
    headers: { "X-Auth-Token": API_TOKEN },
  });

  return res.data.matches.map(
    (m: any): Match => ({
      id: m.id,
      utcDate: m.utcDate,
      homeTeam: m.homeTeam.name,
      awayTeam: m.awayTeam.name,
      score: `${m.score.fullTime.home ?? "-"} : ${
        m.score.fullTime.away ?? "-"
      }`,
    })
  );
}
