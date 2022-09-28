import { Router } from "express";
import TransactionController from "../controller/transaction.controller";

const router = Router();

const controller = new TransactionController();

router.get("/transaction/getAll", async (req, res, next) => {
    const response = await controller.getAllTransactions();
    return res.send(response);
});

router.post("/transaction", async (req, res, next) => {
    const response = await controller.createTransaction(req.body);
    console.log(response, typeof response);
    if (response instanceof Error) {
        return res.status(400).send(response);
    }
    return res.send(response);
});

router.put("/transaction/:id", async (req, res, next) => {
    const response = await controller.updateTransaction(req.params.id, req.body);
    return res.send(response);
});

router.delete("/transaction/:id", async (req, res, next) => {
    try {
		await controller.deleteTransaction(req.params.id);
		return res.send()
	 } catch (error) {
		return next(error)
	}
});

export default router;