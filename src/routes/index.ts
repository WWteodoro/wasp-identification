import express from "express"
import { mainRouter } from "./mainRoute"
import { identificateRoute } from "./identificateRoute";

export const route = express.Router();

route.use('/', mainRouter);
route.use('/identificate', identificateRoute);