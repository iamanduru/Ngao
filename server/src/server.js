import "dotenv/config";


import app
    from "./app.js";


import {
    initializeAnalyst
} from "./store/user.store.js";


const PORT =
    process.env.PORT || 5000;



async function startServer() {

    try {

        await initializeAnalyst();


        app.listen(
            PORT,
            () => {

                console.log(
                    `Ngao API running on http://localhost:${PORT}`
                );

            }
        );

    } catch (error) {

        console.error(
            "Unable to start Ngao:",
            error.message
        );


        process.exit(1);

    }

}


startServer();