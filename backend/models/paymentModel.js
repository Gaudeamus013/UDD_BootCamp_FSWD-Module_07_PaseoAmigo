// ============================================================
// 💾 Modelo: Payment (Registro de Pagos)
// ============================================================

import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderId: { type: String, required: true },
  amountClp: { type: Number, required: true },
  amountUsd: { type: Number, required: true },
  items: [{ name: String, price: Number }],
  status: { type: String, default: "COMPLETED" },
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
