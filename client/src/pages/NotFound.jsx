import {
    Link
} from "react-router-dom";


import "./NotFound.css";


function NotFound() {

    return (

        <main className="not-found-page">

            <div className="container">

                <section
                    className="
                        not-found-content
                        animate-fade-up
                    "
                >

                    <p className="not-found-code">
                        404
                    </p>


                    <p className="eyebrow">
                        PAGE NOT FOUND
                    </p>


                    <h1>
                        We couldn't find that page.
                    </h1>


                    <p className="not-found-description">

                        The page may have moved,
                        the address may be incorrect,
                        or the resource may no longer
                        be available.

                    </p>


                    <div className="not-found-actions">

                        <Link
                            to="/"
                            className="btn btn-primary"
                        >

                            Return Home

                        </Link>


                        <Link
                            to="/about"
                            className="btn btn-outline"
                        >

                            About Ngao

                        </Link>

                    </div>

                </section>

            </div>

        </main>

    );

}


export default NotFound;