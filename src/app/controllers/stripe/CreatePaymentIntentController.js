import { Stripe } from "stripe";
import * as Yup from 'yup';
import { stripeSecret } from "../../../config/auth";

const stripe = new Stripe(stripeSecret.secret);

const calculateOrderAmount = (items) => {
    const total = items.reduce((acc, current) => {
        return current.price * current.quantity + acc;
    }, 0);

    return total;
};

class CreatePaymentIntentControler {
    async store(req, res) {
        const schema = Yup.object({
            products: Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                    price: Yup.number().required(),
                }),
            ),
        });

        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }

        const { products } = req.body;

        const amount = calculateOrderAmount(products);

        if (amount < 100) { // Valor mínimo de 1 real (100 centavos)
            return res.status(400).json({ error: "O valor mínimo para pagamento é R$ 1,00." });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "brl",
            automatic_payment_methods: {
                enabled: true,
            },
        });


        res.json({
            clientSecret: paymentIntent.client_secret,
            dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
        });
    }
}

export default new CreatePaymentIntentControler();