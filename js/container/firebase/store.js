import db from "./firebase.js";
import * as _noti from "../../common/notify.js";


async function createUser(email, name, phone, imageUrl) {
    try {
        const response = await db.collection("users").add({
            email,
            name,
            phone,
            imageUrl,
        });
        console.log(response);
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        // ..
        console.log(errorCode, errorMessage);
        _noti.error(errorCode, errorMessage);
    }
}
async function getUserByEmail(email) {
    try {
        const querySnapshot = await db
            .collection("users")
            .where("email", "==", email)
            .get();
        if (querySnapshot.docs.length === 0) {
            return null;
        }
        return querySnapshot.docs[0].data();
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        _noti.error(errorCode, errorMessage);
    }
}
async function getUserStoreID(email) {
    try {
        const querySnapshot = await db
            .collection("users")
            .where("email", "==", email)
            .get();
        if (querySnapshot.docs.length === 0) {
            return null;
        }
        return querySnapshot.docs[0].id;
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        _noti.error(errorCode, errorMessage);
    }
}
async function updateUserData(email, name, phone, imageUrl) {
    try {
        const userID = await getUserStoreID(email)
        console.log(userID);
        await db
            .collection("users")
            .doc(userID)
            .update({
                name,
                phone,
                imageUrl,
            });
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        _noti.error(errorCode, errorMessage);
    }
}
export { createUser, getUserByEmail, updateUserData }