import { dndShorthand } from "../util/dndshorthand.js"

async function buildElement(json, parentElement = null, currentElement = null) {
    if (typeof json === 'string') {
        json = await (await fetch(json)).json();
    }
    let newElement;
    if (currentElement)
        newElement = currentElement;
    else {
        while (json.fromFile) {
            json = await (await fetch(json.fromFile)).json();
        }
        newElement = document.createElement(json.mTag);
    }

    await Promise.all(Object.keys(json).map(async(key) => {
        switch (key) {
            case "children":
                json.children.forEach(async(child) => {
                    await buildElement(child, newElement);
                });
                return;
            case "attributes":
                Object.keys(json.attributes).forEach((attribute) => {
                    newElement.setAttribute(attribute, json[attribute]);
                });
                return;
            case "mTag":
            case "fromFile":
                return;
            default:
                newElement[key] = json[key];
                return;
        }
    }));
    if (!parentElement) return newElement;
    parentElement.append(newElement);
}
/** Json objects for buildElement() follow the following pattern:
 *  object = { 
 *      "mTag":"h1",                        //tag name
 *      "value":"TEXT"                      //use for text inside element if there are no children
 *      "class":"class1 class2 ... classn"  //add css classes to the element
 *      "style":"width:100%; height:100%;"  //add style to element
 *      "id":"headingone"                   //add id to element
 *      ...                                 //works for any normal DOMElement key
 *      "children": [
 *          {                               //child 1
 *              mTag:"div"
 *          }, {                            //child 2
 *              mTag:"a"
 *          }, ... {                        //child 3
 *              mTag:
 *          }
 *      ]
 *  } 
 */
const getDndElement = {
    hitpoints: (className, hitDieSides, id = "hit_points") => {
        if (typeof(hitDieSides) != "number" || typeof(className) != "string" || typeof(id) != "string") return;
        return {
            mTag: "div",
            id: "hit_points",
            children: [{
                mTag: "h3",
                innerHTML: `Hit Points`
            }, {
                mTag: "p",
                innerHTML: `<b>Hit Dice:</b> 1d${hitDieSides} per ${className} level<br><b>Hit Points at 1st Level:</b> ${hitDieSides} + your Constitution modifier<br><b>Hit Points at Higher Levels:</b> 1d${hitDieSides} (or ${Math.ceil((hitDieSides+1)/2)}) + your Constitution modifier per ${className} level after 1st`
            }]
        }
    },
    proficiency: (proficiencyObject, id = "proficiencies") => {
        if (typeof(id) != "string") return;
        return {
            mTag: "div",
            id: id,
            children: [{
                mTag: "h3",
                innerHTML: "Proficiencies"
            }, {
                mTag: "p",
                innerHTML: `<b>Armor: </b><br><b>Weapons: </b><br><b>Tools: </b><br><b>Skills: </b><br><b>Saves: </b>`
            }]
        }
    }
};
window.buildElement = buildElement;
window.getDndElement = getDndElement;

export { buildElement, getDndElement }