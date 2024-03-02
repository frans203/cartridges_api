import { Request, Response } from "express";
import { pool } from "../../db";
import {
  checkCartridgeExists,
  deleteCartridgeQuery,
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
    res.status(200).json({ count: response.rowCount, row: response.rows });
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
    checkCartridgeExists,
    [body.name, body.release_year, body.console],
    (error, results) => {
      if (results?.rows.length) {
        res.status(400).json({
          status: 400,
          message:
            "cartridge already exists with same name, release_year and/or console properties",
        });
        return;
      }

      pool.query(
        insertCartridge,
        [body.name, body.release_year, body.console, body.conservation_status],
        (error, status) => {
          if (error) throw error;
          res.status(201).json({ ...body });
        }
      );
    }
  );
};

export const deleteCartridge = (req: Request, res: Response) => {
  const { id } = req.params;
  pool.query(deleteCartridgeQuery, [id], (error, results) => {
    const noStudentFound = results.rowCount <= 0;
    if (noStudentFound) {
      res.status(404).json({ status: 404, message: "no cartridge found" });
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
  pool.query(
    updateCartridgeQuery,
    [
      id,
      body.name,
      body.release_year,
      body.console,
      body.conservation_status,
      body.cover_url,
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
