import express from "express";
import cors from "cors";
import rankingRouter from "./routes/rankingRouter.js";
import typingSessionRouter from "./routes/typingSessionRouter.js";
import performanceSummaryRouter from "./routes/performanceSummaryRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Connection successful!");
});
app.use("/api/ranking", rankingRouter);
app.use("/api/typing-session", typingSessionRouter);
app.use("/api/performance-summary", performanceSummaryRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
