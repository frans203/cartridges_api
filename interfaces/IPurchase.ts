enum payment_form_type {
  "BOLETO",
  "BERRIES",
  "PIX",
  "CARTAO",
}

export interface IPurchase {
  id: number;
  id_cartridge: number;
  id_client: number;
  id_seller: number;
  payment_form: payment_form_type;
  confirmed: boolean;
  quantity: number;
  total: number;
  have_discount: number;
  discount: number;
}
