import admin from "firebase-admin";
import serviceAccount from "../config/mern-ecommerce-2cc24-firebase-adminsdk-zge1a-825fb4ea57.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
