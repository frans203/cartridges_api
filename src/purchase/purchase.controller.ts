import { pool } from "../../db";
import { IPurchase } from "../../interfaces/IPurchase";
import {
  confirmPurchaseQuery,
  getAllNotConfirmedPurchasesQuery,
  getConfirmedPurchasesQuery,
  insertPurchaseQuery,
} from "./purchase.queries";
import { Request, Response } from "express";

export const getAllNotConfirmedPurchases = (req: Request, res: Response) => {
  pool.query(getAllNotConfirmedPurchasesQuery, (error, response) => {
    if (error) {
      res.status(404).json({ error: 404, message: error.message });
      return;
    }

    res.status(200).json({
      count: response.rowCount,
      rows: response.rows.sort((a, b) => a.id - b.id),
    });

    return;
  });
};

export const insertPurchase = (req: Request, res: Response) => {
  const body: IPurchase = req.body;
  pool.query(
    insertPurchaseQuery,
    [body.id_cartridge, body.id_client, body.payment_form, body.quantity],
    (error, response) => {
      if (error) {
        res.status(400).json({ status: 400, message: error.message });
        return;
      }

      res.status(201).json({ ...body });
    }
  );
  return;
};

export const confirmPurchaseByAdmin = (req: Request, res: Response) => {
  const body: IPurchase = req.body;

  pool.query(
    confirmPurchaseQuery,
    [body.id, body.id_seller],
    (error, response) => {
      if (error) {
        res.status(400).json({ status: 400, message: error.message });
        return;
      }

      res.status(201).json({
        message: `Purchase with id ${body.id} is confirmed by admin ${body.id_seller}`,
      });
    }
  );
};

export const getConfirmedPurchases = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  pool.query(getConfirmedPurchasesQuery, [id], (error, response) => {
    if (response?.rowCount <= 0 || error) {
      res.status(404).json({ error: 404, message: "cartridges not found" });
      return;
    }
    res.status(200).json({ count: response.rowCount, rows: response.rows });
    return;
  });
};
