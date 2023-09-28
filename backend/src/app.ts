import express from "express";
import cors from "cors";
import rankingRouter from "./routes/rankingRouter";
import typingSessionRouter from "./routes/typingSessionRouter";
import scoreRouter from "./routes/userScoreRouter";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/ranking", rankingRouter);
app.use("/api/typing-session", typingSessionRouter);
app.use("/api/score", scoreRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
