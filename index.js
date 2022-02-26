const utils = require("./utils");

const main = () => {
    const secret = "I love my mom!";

    for (let i = 0; i < secret.length; i++) {
        // BUILD EQUATION
        const charCode = secret.charCodeAt(i);
        const rand = utils.generateRandom();

        // GENERATE 4 Points using y = a0 +a1*x
        const xArray = Array.apply(null, Array(4)).map((x) => utils.generateRandom());
        // const yArray = xArray.map(x => (charCode + rand * x) % 256);
        const yArray = xArray.map(x => (charCode + rand * x));

        console.log(xArray, yArray);

        const x1 = xArray[0], x2 = xArray[1];
        const y1 = yArray[0], y2 = yArray[1];

        // const ans = y1 - ((((y2 - y1) % 256) / (x2 - x1)) * x1) % 256;
        const ans = y1 - ((y2 - y1) / (x2 - x1)) * x1;
        console.log(ans, charCode, ans == charCode);
    }

}


main()


