const express = require("express");
const router = express.Router();

const stripe = require("stripe")(
  "sk_test_51NgWPmSGfkWV2bFNX662HiTrKJyBXV4nVzHBrMH9BOlD4VeeHOLyEKMhCyYy9Co392lxWM2jihfhdj1sv39syjq500GkRGi10t"
);

router.post("/process", async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Mahadi",
    },
  });

  console.log(
    "Stripe Secret Key:",
    "sk_test_51NgWPmSGfkWV2bFNX662HiTrKJyBXV4nVzHBrMH9BOlD4VeeHOLyEKMhCyYy9Co392lxWM2jihfhdj1sv39syjq500GkRGi10t"
  );

  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

router.get("/stripeapikey", async (req, res, next) => {
  console.log(
    "Stripe API Key:",
    "pk_test_51NgWPmSGfkWV2bFNoW0sAJ8p3N4zT4gUlMNIghlF0TUPDJuYwLDhNRbdze7XTFpwuGaDWsNckAj62ByNci0syMuf00mojvpaw4"
  );

  res
    .status(200)
    .json({
      stripeApikey:
        "pk_test_51NgWPmSGfkWV2bFNoW0sAJ8p3N4zT4gUlMNIghlF0TUPDJuYwLDhNRbdze7XTFpwuGaDWsNckAj62ByNci0syMuf00mojvpaw4",
    });
});

module.exports = router;
