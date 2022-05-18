import { auth, usersRef, charactersRef, fsdbOps } from "./firebase.js";

const getUsercharacterList = async(docrefOrUser = null) => {
    if (typeof(docrefOrUser) === 'string') docrefOrUser = fsdbOps.doc(usersRef, docrefOrUser)
    if (!docrefOrUser) docrefOrUser = fsdbOps.doc(usersRef, auth.currentUser.uid)

    return (await fsdbOps.getDoc(docrefOrUser)).data().characters
};

const getCharacter = async(characterRefOrID) => {
    if (typeof(characterRefOrID) === 'string') character = fsdbOps.doc(charactersRef, characterRefOrID);
    return await fsdbOps.getDoc(characterRefOrID);
};

const getCharacterData = async(characterRefOrID) => {
    return (await getCharacter(characterRefOrID)).data()
};

const updateCharacterData = async(characterRefOrID, data) => {
    if (typeof(characterRefOrID) === 'string') character = fsdbOps.doc(charactersRef, characterRefOrID);
    return await fsdbOps.updateDoc(characterRefOrID, data);
};

const setCharacterData = async(characterRefOrID, data) => {
    if (typeof(characterRefOrID) === 'string') character = fsdbOps.doc(charactersRef, characterRefOrID);
    return await fsdbOps.setDoc(characterRefOrID, data);
};

window.chars = { getUsercharacterList: getUsercharacterList, fsdbOps: fsdbOps }