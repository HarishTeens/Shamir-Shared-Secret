const utils = require("./utils");
const fs = require('fs')
const DIR_NAME = './shares';

const encrypt = (secret = "I love my mom!") => {

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

    return secretShares;
}

// Get back secret using any two shares
const decrypt = (ss1, ss2) => {
    let answer = "";
    for (let i = 0; i < ss1.length; i++) {

        const x1 = ss1[i][0], x2 = ss2[i][0];
        const y1 = ss1[i][1], y2 = ss2[i][1];

        // // const ans = y1 - ((((y2 - y1) % 256) / (x2 - x1)) * x1) % 256;
        const answerChar = y1 - ((y2 - y1) / (x2 - x1)) * x1;
        answer += String.fromCharCode(answerChar);
    }

    return answer;
}

const exportSecretShares = (secretShares) => {
    if (!fs.existsSync(DIR_NAME)) {
        fs.mkdirSync(DIR_NAME);
    }
    secretShares.forEach((ss, i) => {
        const secretkey = ss.map(e => e.join(':')).join(';');
        try {
            fs.writeFileSync(`${DIR_NAME}/share${i + 1}.txt`, secretkey)
        } catch (err) {
            console.error(err)
        }
    })
    console.log("The shared secret keys have been exported");
}

const readSecretShares = async () => {
    const filenames = await fs.promises.readdir(DIR_NAME);
    if (filenames.length < 2) throw Error("Atleast two keys are required");

    const ss1 = await fs.promises.readFile(DIR_NAME + "/" + filenames[0], "utf-8");
    const ss2 = await fs.promises.readFile(DIR_NAME + "/" + filenames[1], "utf-8");

    return [ss1, ss2].map(ss => (
        ss.split(";").map(function (e) {
            return e.split(":").map(Number);
        })
    ))
}

const main = async () => {
    // ENCRYPTOR
    const secret = "Dogecoin to the moon!";
    const secretShares = encrypt(secret);
    exportSecretShares(secretShares);

    // DECRYPTOR
    console.log("Validating using the generated keys...");
    const sharedSecrets = await readSecretShares();
    const decryptedSecret = decrypt(sharedSecrets[0], sharedSecrets[1]);

    console.log("Input Secret:", secret)
    console.log("Decrypted Secret:", decryptedSecret)
    console.log("Success: ", secret == decryptedSecret);
}

main()