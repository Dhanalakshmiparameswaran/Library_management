import express, { Application, Request, Response } from "express";
import { AppDataSource, checkConnection } from "./dbConfig";
import { userRoutes } from "./routes/userRouters";
import cors from 'cors';
import * as dotenv from "dotenv";
import { authRoutes } from "./routes/authRoutes";
import { adminRoutes } from "./routes/adminRouters";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 9082;

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use('/auth',authRoutes);

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "successssss" });
});

app.use(cors({
  origin: 'http://localhost:4000', //frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
  checkConnection();
});
