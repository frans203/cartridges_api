export const getCartridgesQuery = "SELECT * FROM cartridges";
export const getOneCartridgeQuery = "SELECT * FROM cartridges WHERE id = $1";
export const checkCartridgeExists =
  "SELECT * FROM cartridges WHERE name = $1 AND release_year = $2 AND console = $3";
export const insertCartridge =
  "INSERT INTO cartridges(name, release_year, console, conservation_status) VALUES($1, $2, $3, $4)";
export const deleteCartridgeQuery = "DELETE FROM cartridges WHERE id = $1";
export const updateCartridgeQuery =
  "UPDATE cartridges SET name = COALESCE($2, name), release_year = COALESCE($3, release_year), console = COALESCE($4, console), conservation_status = COALESCE($5, conservation_status), cover_url = COALESCE($6, cover_url) WHERE id = $1";
