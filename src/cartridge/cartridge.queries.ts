export const getCartridgesQuery = "SELECT * FROM cartridges";
export const getOneCartridgeQuery = "SELECT * FROM cartridges WHERE id = $1";
export const checkCartridgeExists =
  "SELECT * FROM cartridges WHERE name = $1 AND release_year = $2 AND console = $3";
export const insertCartridge =
  "INSERT INTO cartridges(name, release_year, console, conservation_status, cover_url, quantity, price, made_in_mari) VALUES($1, $2, $3, $4, $5, $6, $7, $8)";
export const deleteCartridgeQuery = "DELETE FROM cartridges WHERE id = $1";
export const updateCartridgeQuery =
  "UPDATE cartridges SET name = COALESCE($2, name), release_year = COALESCE($3, release_year), console = COALESCE($4, console), conservation_status = COALESCE($5, conservation_status), cover_url = COALESCE($6, cover_url), made_in_mari = COALESCE($7, made_in_mari), quantity = COALESCE($8, quantity), price = COALESCE($9, price) WHERE id = $1";
export const getCartridgesByPriceQuery =
  "Select * from cartridges where price between $1 and $2";
export const getCartridgesByNameQuery =
  "Select * from cartridges where name LIKE $1";
export const getCartridgesMadeInMariQuery =
  "Select * from cartridges_made_in_mari";
export const getCartridgesLessThan5Query =
  "Select * from cartridges_less_then_5";
export const getCartridgesByConsoleQuery =
  "Select * from cartridges where console = $1";
