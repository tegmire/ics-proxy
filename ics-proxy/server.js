import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

const calendarUrl = "https://hub.cartoonist.coop/lib/plugins/davcal/ics.php/dokuwiki-90c630ae8f3b120ded7152e40d68aba1.ics";

app.get("/", (req, res) => {
  res.send("ICS Proxy is running");
});

app.get("/ics", async (req, res) => {
  try {
    const response = await fetch(calendarUrl);
    const icsData = await response.text();
    res.set("Content-Type", "text/calendar");
    res.send(icsData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch calendar.");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
