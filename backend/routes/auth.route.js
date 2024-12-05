import express from 'express';
import { test,signup,signin, getOrders } from '../controllers/auth.controller.js';

const router = express.Router();

router.get("/test",test)
router.post("/signup", signup);
router.post("/signin", signin);

router.get("/orders",getOrders)

export default router;