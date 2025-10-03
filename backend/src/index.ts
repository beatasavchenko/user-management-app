import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

const port = Number(process.env.PORT) ?? 8080;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
