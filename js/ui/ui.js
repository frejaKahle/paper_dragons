import { nav } from "./nav.js";



const addpageSections = () => {
    let siteNav = document.createElement("section");
    sitenav.id = "top";
    let content = document.createElement("section");
    content.classname = "content";
    document.body.appendChild(siteNav);
    document.body.appendChild(content);
}
const addTwoSectionFormat = () => {
    let primary = document.createElement("section");
    primary.classname = "primary-content";
    let secondary = document.createElement("section");
    secondary.classname = "secondary-content";
}
const clearPage = () => {
    deleteAllChildNodes(document.body);
    addpageSections();
};

const clearContent = () => {
    deleteAllChildNodes(document.querySelector("section.content"));
};

const deleteAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}