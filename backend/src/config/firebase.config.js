import config from "./index.js";
import admin from "firebase-admin";

const serviceAccount = {
  "type": config.SERVICE_ACCOUNT_TYPE,
  "project_id": config.PROJECT_ID,
  "private_key_id": config.SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  "private_key": config.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newline characters
  "client_email": config.SERVICE_ACCOUNT_CLIENT_EMAIL,
  "client_id": config.SERVICE_ACCOUNT_CLIENT_ID,
  "auth_uri": config.SERVICE_ACCOUNT_AUTH_URI,
  "token_uri": config.SERVICE_ACCOUNT_TOKEN_URI,
  "auth_provider_x509_cert_url": config.SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": config.SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
  "universe_domain": config.SERVICE_ACCOUNT_UNIVERSE_DOMAIN
};

const firebaseNotification = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export { firebaseNotification };
