export const getUserQuery =
  'SELECT id, name, email, type, is_flamengo, watch_one_piece, is_from_sousa FROM "user" WHERE id = $1';
export const getUserByEmailQuery =
  'SELECT id, name, email, type, is_flamengo, watch_one_piece, is_from_sousa FROM "user" WHERE email = $1';

export const getAllUsersQuery =
  'SELECT id, name, email, type, is_flamengo, watch_one_piece, is_from_sousa FROM "user" ';
export const createUserQuery =
  "INSERT into \"user\" (name, email, password, type, watch_one_piece, is_flamengo, is_from_sousa) values ($1, $2, $3, COALESCE($4::user_type, 'CLIENT'::user_type), $5, $6, $7)";
export const deleteUserQuery = 'DELETE FROM "user" WHERE id=$1';
export const loginUserQuery =
  'SELECT * from "user" where email = $1 AND password = $2';
export const getPurchasesFromUserQuery =
  "Select * from purchases_from_user where id_client = $1 order by id DESC";
