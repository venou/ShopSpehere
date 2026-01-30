import Subscriber from "../models/subscriber.js";
import httpsstatus from "http-status";

export const newsLetterSubscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(httpsstatus.NOT_FOUND)
      .json({ message: "Email is required" });
  }
  try {
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      return res
        .status(httpsstatus.BAD_REQUEST)
        .json({ message: "email is already subscribed" });
    }

    // Create a new subscriber
    subscriber = new Subscriber({ email });
    await subscriber.save();
    res
      .status(httpsstatus.CREATED)
      .json({ message: "Sucessfully subscribed to the newsletter!" });
  } catch (error) {
    console.error(error);
    res
      .status(httpsstatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};
