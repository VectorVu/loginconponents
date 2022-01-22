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
        throw error;
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
        return {
            id:querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data(),
        }
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        throw error;
    }
}

async function updateUserData( uid, name, phone, imageUrl) {
    try {
        const reponse = await db
            .collection("users")
            .doc(uid)
            .update({
                name,
                phone,
                imageUrl,
            });
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        throw error;
    }
}
async function createChat(name, imageUrl, users, email){
    try {
        const reponse = await db.collection("chat").add({
            name,
            imageUrl,
            users,
            creator: email,
            updateAt: new Date().getTime()
        })
        console.log(reponse);
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        throw error; 
    }
}


async function deleteChat(id){
    try {
        await db.collection("chat").doc(id).delete();
        
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        throw error;
    }
}
async function updateChat(id, name, imageUrl, users, email){
    try {
        const reponse = await db.collection("chat").doc(id).update({
            name,
            imageUrl,
            description: desc,
            users,
            creator: email,
        })
        console.log(reponse);
    } catch (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
        throw error; 
    }
}
export { 
    createUser, 
    getUserByEmail, 
    updateUserData, 
    createChat, 
    updateChat, 
    deleteChat, 
} 