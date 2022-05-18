const dndShorthand = (text) => {
    if (typeof(text) != 'string') return;
    const arr = text.split('--');
    if (arr.length < 2) return text;
    switch (arr[0]) {
        case "type":
            arr.splice(0, 1);
            return dndShorthandType(arr);
        case "skill":
        case "weapon":
            return arr[1];
        case "tool":
            return dndShorthandTools(arr[1]);
        case "save":
            return dndShorthandAbilities(arr[1]);
    }
};
const dndShorthandAbilities = (short) => {
    if (typeof(short) != 'string') return;
    switch (short) {
        case "str":
            return "Strength";
        case "dex":
            return "Dexterity";
        case "con":
            return "Constitution";
        case "int":
            return "Intelligence";
        case "wis":
            return "Wisdom";
        case "cha":
            return "Charisma";
    }
};
const dndShorthandTools = (short) => {
    if (typeof(short) != 'string') return;
    let kind = "";
    Object.keys(toolEndings).forEach(key => {
        if (toolEndings[key].contains(short)) {
            kind = key;
        }
    });
    switch (kind) {
        case "":
        case "none":
            return short;
        case "aastools":
            return `${short}s' tools`;
        case "set":
        case "kit":
            return `${short} ${kind}`;
        default:
            return `${short}'s ${kind}`;
    }
}
const defaultDndTypes = {
    weapon: {
        simple: [
            "club",
            "dagger",
            "greatclub",
            "handaxe",
            "javelin",
            "light hammer",
            "mace",
            "quarterstaff",
            "sickle",
            "spear",
            "light crossbow",
            "dart",
            "shortbow",
            "sling"
        ],
        martial: [
            "battleaxe",
            "flail",
            "glaive",
            "greataxe",
            "greatsword",
            "halberd",
            "lance",
            "longsword",
            "maul",
            "morningstar",
            "pike",
            "rapier",
            "scimitar",
            "shortsword",
            "trident",
            "war pick",
            "warhammer",
            "whip",
            "blowgun",
            "hand crossbow",
            "heavy crossbow",
            "longbow",
            "net"
        ],
        melee: [
            "club",
            "dagger",
            "greatclub",
            "handaxe",
            "javelin",
            "light hammer",
            "mace",
            "quarterstaff",
            "sickle",
            "spear",
            "battleaxe",
            "flail",
            "glaive",
            "greataxe",
            "greatsword",
            "halberd",
            "lance",
            "longsword",
            "maul",
            "morningstar",
            "pike",
            "rapier",
            "scimitar",
            "shortsword",
            "trident",
            "war pick",
            "warhammer",
            "whip"
        ],
        ranged: [
            "light crossbow",
            "dart",
            "shortbow",
            "sling",
            "blowgun",
            "hand crossbow",
            "heavy crossbow",
            "longbow",
            "net"
        ],
        _: []
    },
    focus: {
        arcane: [
            "crystal",
            "orb",
            "rod",
            "staff",
            "wand"
        ],
        druidic: [
            "sprig of mistletoe",
            "totem",
            "wooden stagg",
            "yew wand"
        ],
        holysymbol: [
            "amulet",
            "emblem",
            "reliquary"
        ],
        _: []
    },
    tool: {
        artisan: [
            "alchemist",
            "brewer",
            "calligrapher",
            "carpenter",
            "cartographer",
            "cobbler",
            "cook",
            "glassblower",
            "jeweler",
            "leatherworker",
            "mason",
            "painter",
            "potter",
            "smith",
            "tinker",
            "weaver",
            "woodcarver"
        ],
        gaming: [
            "dice",
            "dragonchess",
            "playing card",
            "three-dragon ante"
        ],
        instrument: [
            "bagpipes",
            "drum",
            "dulcimer",
            "flute",
            "lute",
            "lyre",
            "horn",
            "pan flute",
            "shawm",
            "viol"
        ],
        _: [
            "disguise",
            "forgery",
            "herbalism",
            "navigator",
            "poisoner",
            "thieve"
        ]
    },
    damage: {
        _: [
            "bludgeoning",
            "piercing",
            "slashing",
            "fire",
            "cold",
            "acid",
            "poison",
            "thunder",
            "lightning",
            "radiant",
            "necrotic",
            "psychic",
            "force"
        ],
        physical: [
            "bludgeoning",
            "piercing",
            "slashing"
        ],
        elemental: [
            "fire",
            "cold",
            "acid",
            "poison",
            "thunder",
            "lightning"
        ],
        divine: [
            "radiant",
            "necrotic"
        ]
    }
}
const toolEndings = {
    supplies: [
        "alchemist",
        "brewer",
        "calligrapher",
        "painter"
    ],
    utensils: [
        "cook"
    ],
    set: [
        "dice",
        "dragonchess",
        "playing card",
        "three-dragon ante"
    ],
    kit: [
        "disguise",
        "forgery",
        "herbalism",
        "poisoner"
    ],
    tools: [
        "carpenter",
        "cartographer",
        "cobbler",
        "glassblower",
        "jeweler",
        "leatherworker",
        "mason",
        "potter",
        "smith",
        "tinker",
        "weaver",
        "woodcarver"
    ],
    aastools: [
        "thieve"
    ],
    none: [
        "bagpipes",
        "drum",
        "dulcimer",
        "flute",
        "lute",
        "lyre",
        "horn",
        "pan flute",
        "shawm",
        "viol"
    ]
}



export { dndShorthand, dndShorthandAbilities, dndShorthandTools, defaultDndTypes, toolEndings };