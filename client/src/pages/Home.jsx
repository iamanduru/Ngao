import {
    Link
} from "react-router-dom";

import "./Home.css";


const steps = [

    {
        number: "01",
        title: "Report",
        description:
            "Submit information about suspicious messages, links, emails or online interactions."
    },

    {
        number: "02",
        title: "Review",
        description:
            "Submitted reports can be reviewed by an authorised safety analyst."
    },

    {
        number: "03",
        title: "Learn",
        description:
            "Understand common warning signs and improve your digital safety awareness."
    }

];


const threats = [

    {
        title: "Phishing",
        description:
            "Messages designed to trick users into revealing passwords, account details or other sensitive information."
    },

    {
        title: "Fake Job Offers",
        description:
            "Fraudulent recruitment messages that may request payment or personal information."
    },

    {
        title: "Impersonation",
        description:
            "Scammers pretending to represent trusted companies, institutions or people."
    }

];


function Home() {

    return (

        <main>

            <div className="container">


                {/* HERO */}

                <section
                    className="
                        home-hero
                        animate-fade-up
                    "
                >

                    <div className="hero-content">

                        <p className="eyebrow">
                            DIGITAL SAFETY PLATFORM
                        </p>


                        <h1>
                            Spot something
                            suspicious online?
                        </h1>


                        <p className="hero-description">
                            Ngao helps users report
                            suspicious digital activity,
                            track submitted reports and
                            learn common scam warning signs.
                        </p>


                        <div className="hero-actions">

                            <Link
                                to="/report"
                                className="
                                    btn
                                    btn-primary
                                "
                            >
                                Report a Scam
                            </Link>


                            <a
                                href="#how-it-works"
                                className="
                                    btn
                                    btn-outline
                                "
                            >
                                How It Works
                            </a>

                        </div>

                    </div>

                </section>



                {/* HOW IT WORKS */}

                <section
                    className="home-section"
                    id="how-it-works"
                >

                    <div className="section-heading">

                        <p className="eyebrow">
                            HOW NGAO WORKS
                        </p>


                        <h2>
                            A simple reporting process
                        </h2>


                        <p>
                            Ngao provides a clear way
                            to document suspicious
                            activity and understand
                            common digital threats.
                        </p>

                    </div>


                    <div className="feature-grid">

                        {steps.map((step) => (

                            <article
                                className="feature-card"
                                key={step.number}
                            >

                                <span className="feature-number">
                                    {step.number}
                                </span>


                                <h3>
                                    {step.title}
                                </h3>


                                <p>
                                    {step.description}
                                </p>

                            </article>

                        ))}

                    </div>

                </section>



                {/* COMMON THREATS */}

                <section className="home-section">

                    <div className="section-heading">

                        <p className="eyebrow">
                            COMMON THREATS
                        </p>


                        <h2>
                            Know what to look out for
                        </h2>

                    </div>


                    <div className="threat-grid">

                        {threats.map((threat) => (

                            <article
                                className="threat-card"
                                key={threat.title}
                            >

                                <h3>
                                    {threat.title}
                                </h3>


                                <p>
                                    {threat.description}
                                </p>

                            </article>

                        ))}

                    </div>

                </section>



                {/* CTA */}

                <section className="home-cta">

                    <div>

                        <h2>
                            Received something suspicious?
                        </h2>

                        <p>
                            Document what happened and
                            keep track of your report.
                        </p>

                    </div>


                    <Link
                        to="/report"
                        className="
                            btn
                            cta-button
                        "
                    >
                        Submit a Report
                    </Link>

                </section>

            </div>

        </main>

    );

}


export default Home;