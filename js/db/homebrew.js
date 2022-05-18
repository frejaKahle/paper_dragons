import { auth, usersRef, hbContainerRef, fsdbOps } from "./firebase.js";

const HBTypes = ["class", "race", "subclass", "feat", "background", "spell", "monster", "item", "type"];

const getUserHbList = async(docrefOrUser = null) => {
    if (typeof(docrefOrUser) === 'string') docrefOrUser = fsdbOps.doc(usersRef, docrefOrUser)
    if (!docrefOrUser) docrefOrUser = fsdbOps.doc(usersRef, auth.currentUser.uid)

    return (await fsdbOps.getDoc(docrefOrUser)).data().homebrew
};
const createHb = async(type, data) => {
    if (!(HBTypes.includes(type))) return null;
    data = data || {};
    data.user = auth.currentUser.uid
    const hbRef = await fsdbOps.addDoc(collection(hbContainerRef, type), data)
    const userRef = fsdbOps.doc(db, "users", auth.currentUser.uid);
    const hblist = getHbList(userRef);
    hblist.push(hbRef);
    await fsdbOps.updateDoc(userRef, { homebrew: hblist });
    return hbRef.id;
};
const deleteHb = async(hbRef) => {
    const userRef = fsdbOps.doc(db, "users", auth.currentUser.uid);
    const hblist = await getHbList(userRef);
    let idx = 0;
    while (hbRef.id != hblist[idx].id) {
        idx++;
        if (idx >= hblist.length) return 1;
    }
    hblist.splice(idx, 1);
    await fsdbOps.updateDoc(userRef, { homebrew: hblist });
    if (await hbExists(hbRef))
        await fsdbOps.deleteDoc(hbRef);
    return 0;
};
const setHb = async(hbRef, data) => {
    if (!await hbExists(hbRef)) return 1;
    await fsdbOps.setDoc(hbRef, data);
    return 0;
}
const hbExists = async(docRef) => {
    return (await fsdbOps.getDoc(docRef)).exists();
}
const getHb = async(docRef) => {
    return (await fsdbOps.getDoc(docRef)).data();
};
window.hb = { createHb: createHb, setHb: setHb, deleteHb: deleteHb, getHb: getHb, getUserHbList: getUserHbList }