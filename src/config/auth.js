import 'dotenv/config';

export default {
    secret: process.env.AUTH_SECRET,
    expiresIn: process.env.AUTH_EXPIRES_IN,
};

export const stripeSecret = {
    secret: process.env.STRIPE_SECRET_KEY,
};
