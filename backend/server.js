import express from "express";
import cors from "cors";
import { getNowAsIso } from "../qtools/qdat.js";
import dotenv from "dotenv";
import { supplierRouter } from './routes/supplier.js';

dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT || 3040;

app.use(cors());
app.use(express.json());

app.use('/supplier', supplierRouter);

app.use((_req, _res, next) => {
  console.log(
    `${process.env.LOGGING_MESSAGE}: ${getNowAsIso()}: accessed base route`
  );
  next();
});

app.get("/", (_req, res) => {
  res.send({
    title: "JSON SUPPLIER API",
    description: "manange your supplier information with this handy API.",
  });
});

app.use((req, res) => {
  res.status(404).send({
    message: "404 route not found",
    url: req.originalUrl,
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
