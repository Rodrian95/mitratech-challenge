import express from "express";
import bodyParser from "body-parser";
import productsRouter from "./routes/products.route";
import cors from "cors";

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

router.get("/", (req: express.Request, res: express.Response) => {
  res.json({
    message: "Mitratech API Challenge!",
  });
});

app.use("/", router);
app.use("/api", productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };
