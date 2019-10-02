module.exports = function check(str, bracketsConfig) {
    const [openAlphabet, closeAlphabet] = bracketsConfig.reduce(
        (acc, el) => {
            const [openAlphabet, closeAlphabet] = acc;
            return [
                { ...openAlphabet, [el[0]]: el[1] },
                `${closeAlphabet}${el[1]}`
            ];
        },
        [{}, ""]
    );

    const isCanDel = (str, sym) => str.length && str[0] === sym;

    const resultString = [...str].reduce((acc, el) => {
        if (
            Object.keys(openAlphabet).includes(el) &&
            closeAlphabet.indexOf(el) !== -1
        ) {
            return isCanDel(acc, el) ? acc.slice(1) : [el, ...acc];
        } else if (Object.keys(openAlphabet).includes(el)) {
            return [openAlphabet[el], ...acc];
        } else {
            return isCanDel(acc, el) ? acc.slice(1) : ["ERROR"];
        }
    }, []);

    return !resultString.length;
};
