const buildAndStartSideNav = () => {
    document.querySelector(".secondary-content").appendChild(buildSideNav());
    return navScrollWatch();
};

const removeSideNav = () => {
    const sc = document.querySelector(".secondary-content");
    sc.removeChild(sc.firstChild);
};

const navScrollWatch = () => {
    let mainNavLinks = document.querySelectorAll("nav ul li a");
    //let mainSections = document.querySelectorAll(".content section");
    let navbar = document.querySelector(".sidenav");
    let navbarcon = navbar.parentElement;


    return window.addEventListener("scroll", event => {
        let fromTop = window.scrollY;
        let vpBotFromTop = fromTop + window.innerHeight;
        /*
        let lastLinkDest = document.querySelector(mainNavLinks[mainNavLinks.length - 1].hash);
        if (
            navbarcon.offsetTop <= fromTop &&
            lastLinkDest.offsetTop + lastLinkDest.offsetHeight > fromTop
        ) {
            navbar.classList.add("fixed");
        } else {
            navbar.classList.remove("fixed");
        }
        */
        mainNavLinks.forEach(link => {
            let section = document.querySelector(link.hash);
            let p;
            if (link.parentNode.parentNode.parentNode.tagName === "div")
                p = link.parentNode.parentNode.parentNode.parentNode;
            else
                p = link.parentNode.parentNode.parentNode;
            if (section.offsetTop + section.offsetHeight > fromTop) {
                if (section.offsetTop <= fromTop) {
                    link.classList.add("current");
                    p.classList.add("current");

                } else {
                    link.classList.remove("current");

                    if (p.querySelector(".current") === null)
                        p.classList.remove("current");
                    if (section.offsetTop < vpBotFromTop) {
                        link.classList.add("within");
                        p.classList.add("within");
                    } else {
                        link.classList.remove("within");
                        p.classList.remove("within");
                    }
                }
            } else {
                link.classList.remove("current", "within");

                if (p.querySelector(":is(.current, .within)") === null)
                    p.classList.remove("current", "within");
            }
        });
    });
};

const idToName = (id) => {
    return capitalizeAll(id.split("_")).join(" ");
};
const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
};
const capitalizeAll = (stringlist) => {
    const newlist = [];
    stringlist.forEach(string => {
        newlist.push(capitalize(string));
    });
    return newlist;
};


const buildSideNav = () => {
    const nav = document.createElement("nav");
    nav.className = "sidenav";
    nav.append(buildRecursiveNavList(searchRecursiveIds(document.querySelector(".primary-content"))));
    return nav;
};

const buildRecursiveNavList = (object) => {
    if (!object.id) {
        const outerlist = document.createElement("ul");
        const toplink = buildNavElement("top", ["top-link", "current"]);
        toplink.firstChild.firstChild.innerHTML = "back to top";
        outerlist.appendChild(toplink);
        object.children.forEach((child) => { outerlist.appendChild(buildRecursiveNavList(child)); });
        outerlist.children[1].className = "title";
        return outerlist;
    }
    if (object.children.length == 0) {
        return buildNavElement(object.id);
    }
    const dropdown = buildNavDropdown(object.id);
    const ul = dropdown.lastChild;
    object.children.forEach((child) => { ul.appendChild(buildRecursiveNavList(child)); });
    return dropdown;
};

const searchRecursiveIds = (element) => {
    let l = [];
    element.childNodes.forEach(child => {
        const childChildren = searchRecursiveIds(child);
        if (childChildren.id) {
            l.push(childChildren);
        } else if (childChildren.children.length > 0) {
            l = childChildren.children
        }
    });
    return { id: element.id, children: l };
};

const buildNavDropdown = (linkid) => {
    const odiv = document.createElement('div');
    odiv.appendChild(buildNavElement(linkid));
    odiv.id = `${linkid}_dropdown`;
    const idiv = document.createElement('div');
    idiv.appendChild(document.createElement("div"));
    idiv.setAttribute('onclick', 'nav.navdrop(this)');
    idiv.className = 'dropbtn';
    odiv.firstChild.firstChild.appendChild(idiv);
    odiv.appendChild(document.createElement("ul"));
    return odiv;
};

const buildNavElement = (linkid, classes = []) => {
    const e = document.createElement("li");
    const a = document.createElement("a");
    classes.forEach(cls => {
        e.classList.add(cls);
    })
    e.appendChild(document.createElement("span"));
    e.firstChild.appendChild(a);
    a.href = `#${linkid}`
    a.innerHTML = `${idToName(linkid)}`;
    return e;
};

const openMobileNav = () => {
    document.querySelector('.secondary-content').classList.add('mobile-menu-open');
};

const closeMobileNav = () => {
    document.querySelector('.secondary-content').classList.remove('mobile-menu-open');
};

const navdrop = (elem) => {
    const pdiv = elem.parentElement.parentElement.parentElement;
    if (pdiv.classList.contains('open'))
        pdiv.classList.remove('open');
    else
        pdiv.classList.add('open');
}
const nav = { navdrop: navdrop, openMobileNav: openMobileNav, closeMobileNav: closeMobileNav, removeSideNav: removeSideNav, buildAndStartSideNav: buildAndStartSideNav };
export { nav };