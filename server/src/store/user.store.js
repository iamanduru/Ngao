import bcrypt from "bcryptjs";


const users = [];


/* Initialize Analyst */

export async function initializeAnalyst() {

    const email =
        process.env.ANALYST_EMAIL
            ?.trim()
            .toLowerCase();


    const password =
        process.env.ANALYST_PASSWORD;


    const name =
        process.env.ANALYST_NAME ||
        "Ngao Safety Analyst";


    if (!email || !password) {

        throw new Error(
            "Analyst environment variables are missing."
        );

    }


    const alreadyExists =
        users.some(
            (user) =>
                user.email === email
        );


    if (alreadyExists) {
        return;
    }


    const passwordHash =
        await bcrypt.hash(
            password,
            12
        );


    users.push({

        id: "ANL-001",

        name,

        email,

        passwordHash,

        role: "analyst",

        createdAt:
            new Date().toISOString()

    });


    console.log(
        "Ngao analyst account initialised."
    );

}



/* Find User */

export function findUserByEmail(email) {

    return users.find(
        (user) =>
            user.email ===
            email.toLowerCase()
    );

}



/* Create Normal User*/

export function createUser(user) {

    users.push(user);

    return user;

}