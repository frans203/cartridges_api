import { Request, Response } from "express";
import { pool } from "../../db";
import {
  createUserQuery,
  deleteUserQuery,
  getAllUsersQuery,
  getPurchasesFromUserQuery,
  getUserByEmailQuery,
  getUserQuery,
  loginUserQuery,
} from "./user.queries";
import { IUser } from "../../interfaces/IUser";

export const getUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  pool.query(getUserQuery, [id], (error, response) => {
    if (response?.rowCount <= 0 || error) {
      res.status(404).json({ status: 404, message: "User not exists" });
      return;
    }
    res.status(200).json(response.rows[0]);
    return;
  });
};

export const getUsers = (req: Request, res: Response) => {
  pool.query(getAllUsersQuery, (error, response) => {
    if (response?.rowCount <= 0 || error) {
      res.status(404).json({ error: 404, message: "Users not found" });
      return;
    }
    res.status(200).json({
      count: response.rowCount,
      rows: response.rows.sort((a, b) => a.id - b.id),
    });
    return;
  });
};

export const createUser = (req: Request, res: Response) => {
  const body: IUser = req.body;
  pool.query(
    createUserQuery,
    [
      body.name,
      body.email,
      body.password,
      body.type,
      body.watch_one_piece != null ? body.watch_one_piece : false,
      body.is_flamengo != null ? body.is_flamengo : false,
      body.is_from_sousa != null ? body.is_from_sousa : false,
    ],
    (error) => {
      if (error) {
        res.status(400).json({
          status: 400,
          message: "Something went wrong",
          error: error.message,
        });
        return;
      }
      pool.query(getUserByEmailQuery, [body.email], (error, results) => {
        res.status(201).json(results.rows[0]);
      });

      return;
    }
  );
};

export const deleteUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  pool.query(deleteUserQuery, [id], (error, results) => {
    const noUserFound = results.rowCount <= 0;
    if (noUserFound || error) {
      res.status(404).json({
        status: 404,
        message: "User not exists",
      });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
    return;
  });
};

export const loginUser = (req: Request, res: Response) => {
  const body: IUser = req.body;
  console.log(body);
  pool.query(loginUserQuery, [body.email, body.password], (error, results) => {
    console.log(error);
    console.log(results.rows);
    if (error || results.rowCount == 0) {
      res.status(404).json({
        status: 404,
        message: "message",
      });
      return;
    }
    res.status(200).json(results.rows[0]);
    return;
  });
};

export const getPurchasesFromUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  pool.query(getPurchasesFromUserQuery, [id], (error, results) => {
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
