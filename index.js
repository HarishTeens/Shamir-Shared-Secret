const utils = require("./utils");

const main = () => {
    const secret = "I love my mom!";

    let secretShares = [[], [], [], []];

    for (let i = 0; i < secret.length; i++) {
        // BUILD EQUATION
        const charCode = secret.charCodeAt(i);
        const rand = utils.generateRandom();

        // GENERATE 4 Points using y = a0 +a1*x
        for (let j = 0; j < 4; j++) {
            const x = utils.generateRandom();
            const y = charCode + rand * x;
            secretShares[j].push([x, y]);
        };
    }

    // Get back secret using any two shares
    const ss1 = secretShares[0], ss2 = secretShares[1];
    let answer = "";
    for (let i = 0; i < secret.length; i++) {

        const x1 = ss1[i][0], x2 = ss2[i][0];
        const y1 = ss1[i][1], y2 = ss2[i][1];

        // // const ans = y1 - ((((y2 - y1) % 256) / (x2 - x1)) * x1) % 256;
        const answerChar = y1 - ((y2 - y1) / (x2 - x1)) * x1;
        answer += String.fromCharCode(answerChar);
    }

    console.log(answer);
}


main()


