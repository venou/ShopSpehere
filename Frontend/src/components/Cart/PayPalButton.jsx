import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const PayPalButton = ({amount, onSuccess, onError}) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "Afh__O0JPFWUlrKlpAEyUciob8hOvwZtpUj6PSn146Im00RiXTrXEbQlxyOUCw6JEDv4_RrBVLs60Raa",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount } }],
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
