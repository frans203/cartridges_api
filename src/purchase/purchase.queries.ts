export const getAllPurchases = "select * from purchase";
export const getAllNotConfirmedPurchasesQuery =
  "select * from cartridges_not_confirmed order by id DESC";
export const insertPurchaseQuery =
  "insert into purchase(id_cartridge, id_client, payment_form, quantity) values($1, $2, $3, $4)";
export const confirmPurchaseQuery =
  "update purchase set id_seller = $2 where id = $1";
export const getConfirmedPurchasesQuery =
  "select * from cartridges_confirmed where id_seller = $1";
