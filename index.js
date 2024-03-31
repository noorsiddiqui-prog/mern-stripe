const express = require("express");
const stripe = require("stripe")(
  "sk_test_51Oxl4RLfti1R0dn6wlVlI16EAzWiz3dpffssv4hWGYJF8F14I1CiMIBBQ7mQ4fbgQbDb7FN6FM5O15YPJqWoAYNa00pfBPauVA"
);
const app = express();

const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

app.get("/", (req, res) => {
  res.send("Hello world");
});

// app.post(
//   "/hooks",
//   bodyParser.raw({
//     type: "application/json",
//   }),
//   async (req, res) => {
//     let signingsecret =
//       "whsec_5647fb041cfd72195d80d6be2b9b1df9b75bea02ea67a8e5ed1fc27dcb50bd91";

//     const payload = req.body;
//     const sig = req.headers["stripe-signature"];

//     let event;
//     try {
//       event = stripe.webhooks.constructEvent(payload, sig, signingsecret);
//     } catch (error) {
//       console.log(error.message);
//       res.status(400).json({ sucess: false });
//       return;
//     }

//     console.log("Webhook received:", event);
//     console.log(event.type);
//     console.log(event.data.object);
//     console.log(event.data.object.id);
//     res.json({
//       success: true,
//     });
//   }
// );

const endpointSecret = "whsec_l6KM4PYwQepYcWODmSiw4MoazhFcyWTK";

// const EMAIL = "noorulainsiddiqui88@gmail.com";
// const EMAIL = "noorsiddiqui011@hotmail.com";
const EMAIL = "noor1@yopmail.com";
const PASS = "Everafter1";

app.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.async_payment_failed":
        const checkoutSessionAsyncPaymentFailed = event.data.object;
        console.log(checkoutSessionAsyncPaymentFailed);

        // Then define and call a function to handle the event checkout.session.async_payment_failed
        break;
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        console.log(checkoutSessionCompleted);
        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        let emailto = checkoutSessionCompleted.customer_details.email;

        const transporter = nodemailer.createTransport({
          //   host: "smtp.gmail.com",
          host: "smtp.ethereal.email",
          port: 587,
          auth: {
            user: "ricardo39@ethereal.email",
            pass: "ahsqHn8DS41CXgGR7B",
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
          // send mail with defined transport object
          const info = await transporter.sendMail({
            from: "ricardo39@ethereal.email", // sender address
            to: emailto, // list of receivers
            subject: "Thanks for the Payment of the Product", // Subject line
            text: "Thanks for the Payment of the Product", // plain text body
            html: `
            Hello ${
              checkoutSessionCompleted.customer_details.email
            } Thanks for the payment
            Here is the link of the product from google drive ${"https://drive.google.com/file/d/1aSUGzesuAnsks4OkseSNuJyvOkizZyAK/view?usp=drive_link"}
            You can download the file by going to this link`, // html body
          });

          console.log("Message sent: %s", info.messageId);
          // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        }

        main().catch(console.error);
        break;
      case "customer.created":
        const customerCreated = event.data.object;
        // Then define and call a function to handle the event customer.created
        break;
      case "customer.deleted":
        const customerDeleted = event.data.object;
        // Then define and call a function to handle the event customer.deleted
        break;
      case "customer.updated":
        const customerUpdated = event.data.object;
        // Then define and call a function to handle the event customer.updated
        break;
      case "customer.discount.created":
        const customerDiscountCreated = event.data.object;
        // Then define and call a function to handle the event customer.discount.created
        break;
      case "customer.discount.deleted":
        const customerDiscountDeleted = event.data.object;
        // Then define and call a function to handle the event customer.discount.deleted
        break;
      case "customer.discount.updated":
        const customerDiscountUpdated = event.data.object;
        // Then define and call a function to handle the event customer.discount.updated
        break;
      case "customer.source.created":
        const customerSourceCreated = event.data.object;
        // Then define and call a function to handle the event customer.source.created
        break;
      case "customer.source.deleted":
        const customerSourceDeleted = event.data.object;
        // Then define and call a function to handle the event customer.source.deleted
        break;
      case "customer.source.expiring":
        const customerSourceExpiring = event.data.object;
        // Then define and call a function to handle the event customer.source.expiring
        break;
      case "customer.source.updated":
        const customerSourceUpdated = event.data.object;
        // Then define and call a function to handle the event customer.source.updated
        break;
      case "customer.subscription.created":
        const customerSubscriptionCreated = event.data.object;
        // Then define and call a function to handle the event customer.subscription.created
        break;
      case "customer.subscription.deleted":
        const customerSubscriptionDeleted = event.data.object;
        // Then define and call a function to handle the event customer.subscription.deleted
        break;
      case "customer.subscription.paused":
        const customerSubscriptionPaused = event.data.object;
        // Then define and call a function to handle the event customer.subscription.paused
        break;
      case "customer.subscription.pending_update_applied":
        const customerSubscriptionPendingUpdateApplied = event.data.object;
        // Then define and call a function to handle the event customer.subscription.pending_update_applied
        break;
      case "customer.subscription.pending_update_expired":
        const customerSubscriptionPendingUpdateExpired = event.data.object;
        // Then define and call a function to handle the event customer.subscription.pending_update_expired
        break;
      case "customer.subscription.resumed":
        const customerSubscriptionResumed = event.data.object;
        // Then define and call a function to handle the event customer.subscription.resumed
        break;
      case "customer.subscription.trial_will_end":
        const customerSubscriptionTrialWillEnd = event.data.object;
        // Then define and call a function to handle the event customer.subscription.trial_will_end
        break;
      case "customer.subscription.updated":
        const customerSubscriptionUpdated = event.data.object;
        // Then define and call a function to handle the event customer.subscription.updated
        break;
      case "customer.tax_id.created":
        const customerTaxIdCreated = event.data.object;
        // Then define and call a function to handle the event customer.tax_id.created
        break;
      case "customer.tax_id.deleted":
        const customerTaxIdDeleted = event.data.object;
        // Then define and call a function to handle the event customer.tax_id.deleted
        break;
      case "customer.tax_id.updated":
        const customerTaxIdUpdated = event.data.object;
        // Then define and call a function to handle the event customer.tax_id.updated
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.listen(5000, () => {
  console.log("App is listening on port 5000");
});
