import express from "express";
import { submitContact } from "../controller/contactController.js";

const contactRoutes = express.Router();

contactRoutes.post("/contact", submitContact);

export default contactRoutes;