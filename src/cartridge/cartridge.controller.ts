import { Request, Response } from "express";
import { pool } from "../../db";
import {
  checkCartridgeExists,
  deleteCartridgeQuery,
  getCartridgesByConsoleQuery,
  getCartridgesByNameQuery,
  getCartridgesByPriceQuery,
  getCartridgesLessThan5Query,
  getCartridgesMadeInMariQuery,
  getCartridgesQuery,
  getOneCartridgeQuery,
  insertCartridge,
  updateCartridgeQuery,
} from "./cartridge.queries";
import { ICartridge } from "../../interfaces/ICartridge";

export const getCartridges = (req: Request, res: Response) => {
  pool.query(getCartridgesQuery, (error, response) => {
    if (error) {
      res.status(404).json({ error: 404, message: "cartridges not found" });
      return;
    }
    res.status(200).json({
      count: response.rowCount,
      rows: response.rows.sort((a, b) => a.id - b.id),
    });
    return;
  });
};

export const getCartridge = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  pool.query(getOneCartridgeQuery, [id], (error, response) => {
    if (response?.rowCount <= 0 || error) {
      res.status(404).json({ error: 404, message: "cartridge not found" });
      return;
    }
    res.status(200).json(response.rows[0]);
    return;
  });
};

export const createCartridge = (req: Request, res: Response) => {
  const body: ICartridge = req.body;
  pool.query(
    insertCartridge,
    [
      body.name,
      body.release_year,
      body.console,
      body.conservation_status,
      body.cover_url,
      body?.quantity != null ? body?.quantity : 1,
      body?.price != null ? body?.price : 10,
      body?.made_in_mari != null ? body?.made_in_mari : false,
    ],
    (error, status) => {
      if (error) {
        res.status(400).json({ status: 400, message: error.message });
        return;
      }
      res.status(201).json({ ...body });
    }
  );
};

export const deleteCartridge = (req: Request, res: Response) => {
  const { id } = req.params;
  pool.query(deleteCartridgeQuery, [id], (error, results) => {
    const noCartridgeFound = results?.rowCount <= 0;
    if (error) {
      res.status(404).json({ status: 404, message: error });
      return;
    }
    res
      .status(200)
      .json({ status: 200, message: "cartridge deleted successfully" });
    return;
  });
};

export const updateCartridge = (req: Request, res: Response) => {
  const { id } = req.params;
  const body: ICartridge = req.body;
  console.log(id);
  pool.query(
    updateCartridgeQuery,
    [
      id,
      body.name,
      body.release_year,
      body.console,
      body.conservation_status,
      body.cover_url,
      body.made_in_mari,
      body.quantity,
      body.price,
    ],
    (error, results) => {
      if (results?.rowCount <= 0 || !results || error) {
        res.status(404).json({ status: 404, message: "no Cartridge found" });
        return;
      }
      return getCartridge(req, res);
    }
  );
};

export const filterCartridgesByPrice = (req: Request, res: Response) => {
  const query = req.query;
  console.log(query);
  pool.query(
    getCartridgesByPriceQuery,
    [query.from, query.to],
    (error, results) => {
      if (error) {
        res.status(404).json({
          status: 404,
          message: error.message,
        });
        return;
      }

      res.status(200).json({ count: results.rowCount, rows: results.rows });
      return;
    }
  );
};

export const filterCartridgesByName = (req: Request, res: Response) => {
  const body = req.query;
  pool.query(getCartridgesByNameQuery, [`%${body.name}%`], (error, results) => {
    if (error) {
      res.status(404).json({
        status: 404,
        message: error.message,
      });
      return;
    }

    res.status(200).json({ count: results.rowCount, rows: results.rows });
    return;
  });
};

export const filterCartridgesMadeInMari = (req: Request, res: Response) => {
  pool.query(getCartridgesMadeInMariQuery, (error, results) => {
    if (error) {
      res.status(404).json({
        status: 404,
        message: error.message,
      });
      return;
    }

    res.status(200).json({ count: results.rowCount, rows: results.rows });
  });
};

export const filterCartridgesLessThan5 = (req: Request, res: Response) => {
  pool.query(getCartridgesLessThan5Query, (error, results) => {
    if (error) {
      res.status(404).json({
        status: 404,
        message: error.message,
      });
      return;
    }

    res.status(200).json({ count: results.rowCount, rows: results.rows });
  });
};

export const filterCartridgesByConsole = (req: Request, res: Response) => {
  const body = req.query;
  pool.query(getCartridgesByConsoleQuery, [body.console], (error, results) => {
    if (error) {
      res.status(404).json({
        status: 404,
        message: error.message,
      });
      return;
    }

    res.status(200).json({ count: results.rowCount, rows: results.rows });
  });
};
