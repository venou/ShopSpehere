import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "Afh__O0JPFWUlrKlpAEyUciob8hOvwZtpUj6PSn146Im00RiXTrXEbQlxyOUCw6JEDv4_RrBVLs60RaaAfh__O0JPFWUlrKlpAEyUciob8hOvwZtpUj6PSn146Im00RiXTrXEbQlxyOUCw6JEDv4_RrBVLs60Raa",
        currency: "USD",
        locale: "en_US",
      }}
    >
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "black",
          shape: "rect",
          label: "paypal",
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: String(amount),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
