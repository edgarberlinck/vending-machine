import express, { Request, Response } from "express";
// TODO: import controller
const router = express.Router();

router.get("/products", (req: Request, res: Response) => {
  res.status(200).json({});
});

export = router;
