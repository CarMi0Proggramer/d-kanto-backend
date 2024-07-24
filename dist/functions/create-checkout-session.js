"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSession = createCheckoutSession;
const stripe_1 = __importDefault(require("stripe"));
async function createCheckoutSession(lineItems) {
    const stripe = new stripe_1.default(process.env.SECRET_STRIPE_KEY);
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: getLineItems(lineItems),
        success_url: "https://d-kanto-frontend.onrender.com/src/pages/success.html",
        cancel_url: "https://d-kanto-frontend.onrender.com/src/pages/cancel.html",
    });
    return session;
}
function getLineItems(lineItems) {
    return lineItems.map(item => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.data.name,
                    images: [item.data.urlimg],
                },
                unit_amount: Math.round(item.data.price * 100),
            },
            quantity: item.quantity,
        };
    });
}
//# sourceMappingURL=create-checkout-session.js.map