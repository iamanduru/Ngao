import "./PageLoader.css";


function PageLoader({
    message = "Loading..."
}) {

    return (

        <main className="page-loader">

            <div className="container">

                <div
                    className="page-loader-content"
                    role="status"
                    aria-live="polite"
                >

                    <div
                        className="loader-spinner"
                        aria-hidden="true"
                    />


                    <div>

                        <p className="eyebrow">
                            NGAO
                        </p>

                        <p>
                            {message}
                        </p>

                    </div>

                </div>

            </div>

        </main>

    );

}


export default PageLoader;