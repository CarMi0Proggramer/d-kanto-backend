import Stripe from "stripe";

export async function createCheckoutSession(lineItems: lineItem[]) {
    const stripe = new Stripe(process.env.SECRET_STRIPE_KEY);

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: getLineItems(lineItems),
        success_url: "https://d-kanto.onrender.com/src/pages/success.html",
        cancel_url: "https://d-kanto.onrender.com/src/pages/cancel.html",
    });

    return session;
}

function getLineItems(lineItems: lineItem[]) {
    return lineItems.map( item => {
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
        }
    })
}
