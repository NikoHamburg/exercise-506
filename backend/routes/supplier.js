import express from "express";
import { getNowAsIso } from "../../qtools/qdat.js";
import { LowSync, JSONFileSync } from "lowdb";

const adapter = new JSONFileSync("./backend/data/supplier.json");
const db = new LowSync(adapter);
db.read();

const supplierRouter = express.Router();

supplierRouter.use((_req, _res, next) => {
  console.log(
    `${process.env.LOGGING_MESSAGE}: ${getNowAsIso()}: accessed supplier route`
  );
  next();
});

const baseSupplier = (m) => {
  return {
    _id: m._id,
    companyName: m.companyName,
    contactName: m.contactName,
    contactTitle: m.contactTitle,
    address: m.address,
  };
};

const getNextId = () => {
  const sortedItems = db.data.sort((a, b) => b._id - a._id);
  return sortedItems[0]._id + 1;
};

const replaceWithNewItems = (items) => {
  db.data.splice(0, db.data.length);
  items.forEach((m) => db.data.push(m));
  db.write();
};

supplierRouter.get("/", (_req, res) => {
  res.json(db.data.map(baseSupplier));
});

supplierRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  res.send(db.data.find((m) => m._id === id));
});

supplierRouter.post("/", (req, res) => {
  const supplier = req.body;
  supplier._id = getNextId();
  db.data.push(supplier);
  db.write();
  res.send(`added supplier: ${JSON.stringify(supplier)}`);
});

supplierRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const newItems = db.data.filter((m) => m._id !== id);
  replaceWithNewItems(newItems);
  res.send(`deleted the supplier with the ID = ${id}`);
});

supplierRouter.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const supplierEdit = req.body;
  db.data = db.data.map((supplier) => {
    return supplier._id !== id ? supplier : { ...supplierEdit };
  });
  db.write();
  res.send(`updated the supplier for ID = ${id}`);
});

export { supplierRouter };
