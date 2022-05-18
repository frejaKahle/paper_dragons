const clickroll = (event) => {
        let s = event.target.innerHTML;
        let mod, mult = 1;
        switch (s.charAt(0)) {
            case '-':
                mult = -1;
            case '+':
                mod = mult * parseInt(s.substring(1));
                break;
            case '0':
                mod = 0;
                break;
            default:
                // TODO implement dice notation rolling (i.e. 2d6)
                break;
        }

        const baseroll = roll(20);
        alert(`Rolled 1d20${mod ? ` ${mod < 0 ? '-' : '+'} ${Math.abs(mod)}` : ""}\n ${baseroll} ${mod ? ` ${mod < 0 ? '-' : '+'} ${Math.abs(mod)}` : ""} = ${baseroll+mod}`);
}

const roll = (sides) => {
    return Math.ceil(Math.random() * sides);
}

document.addEventListener('DOMContentLoaded', event => {
    document.querySelectorAll(".rollable").forEach(elem => {
        elem.addEventListener("click", clickroll);
    });
});