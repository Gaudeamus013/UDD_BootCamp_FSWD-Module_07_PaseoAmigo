import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    serviceType: { type: String, enum: ["paseo-30", "paseo-60", "full"], required: true },
    date: { type: Date, required: true },
    durationMins: { type: Number, required: true },
    priceUSD: { type: Number, required: true },
    payment: {
      provider: { type: String, default: "paypal" },
      orderId: String,
      captureId: String,
      status: { type: String, enum: ["CREATED", "APPROVED", "COMPLETED", "VOIDED", "FAILED"], default: "CREATED" },
    },
    notes: String,
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
