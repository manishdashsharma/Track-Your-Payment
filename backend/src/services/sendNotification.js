import { getMessaging } from "firebase-admin/messaging";
import { firebaseNotification } from "../config/firebase.config.js";

const sendNotification = async (title, body, token, res) => {
  const message = {
    notification: {
      title: title,
      body: body
    },
    token: token
  };

  try {
    const response = await getMessaging(firebaseNotification).send(message);
    res.status(200).json({
      message: "Successfully sent message",
      token: token,
      response: response
    });
    console.log("Successfully sent message:", response);
  } catch (error) {
    res.status(400).send(error);
    console.log("Error sending message:", error);
  }
};

export { sendNotification };
