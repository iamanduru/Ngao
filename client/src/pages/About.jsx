import InfoCard
    from "../components/ui/InfoCard";

import "./About.css";


const approachItems = [

    {
        title:
            "Report suspicious activity",

        description:
            "Users can document suspicious messages, links, emails and other online interactions."
    },

    {
        title:
            "Track submitted reports",

        description:
            "Users can view the reports they have submitted and follow their current review status."
    },

    {
        title:
            "Learn warning signs",

        description:
            "Ngao provides practical guidance to help users recognise common scam and phishing patterns."
    }

];


function About() {

    return (

        <main>

            <div className="container">


                {/* ABOUT INTRO */}

                <section
                    className="
                        about-hero
                        animate-fade-up
                    "
                >

                    <div className="about-hero-content">

                        <p className="eyebrow">
                            ABOUT NGAO
                        </p>


                        <h1>
                            Helping people respond
                            better to suspicious
                            digital activity.
                        </h1>


                        <p>
                            Ngao is a digital scam and
                            phishing reporting portal
                            designed to help users
                            document suspicious activity,
                            recognise common warning
                            signs and track submitted
                            reports.
                        </p>

                    </div>

                </section>



                {/* THE PROBLEM */}

                <section className="about-row">

                    <div className="about-number">
                        01
                    </div>


                    <div className="about-content">

                        <p className="eyebrow">
                            THE PROBLEM
                        </p>


                        <h2>
                            Digital scams can be
                            difficult to recognise.
                        </h2>


                        <p>
                            Suspicious messages can
                            arrive through email, SMS,
                            WhatsApp, social media and
                            websites.
                        </p>


                        <p>
                            They may appear to come from
                            banks, employers, government
                            institutions, companies or
                            even people the recipient
                            knows.
                        </p>


                        <p>
                            Users may not immediately
                            recognise the warning signs
                            or know what action to take
                            after receiving suspicious
                            digital content.
                        </p>

                    </div>

                </section>



                {/* NGAO APPROACH */}

                <section className="about-row">

                    <div className="about-number">
                        02
                    </div>


                    <div className="about-content">

                        <p className="eyebrow">
                            OUR APPROACH
                        </p>


                        <h2>
                            One simple place to report,
                            review and learn.
                        </h2>


                        <p>
                            Ngao provides a simple
                            reporting workflow while
                            helping users understand
                            common digital safety risks.
                        </p>


                        <div className="about-card-grid">

                            {approachItems.map(
                                (item) => (

                                    <InfoCard
                                        key={item.title}
                                        title={item.title}
                                        description={
                                            item.description
                                        }
                                    />

                                )
                            )}

                        </div>

                    </div>

                </section>



                {/* MISSION AND VISION */}

                <section className="purpose-grid">

                    <InfoCard
                        eyebrow="MISSION"
                        title="Make digital safety information easier to access and understand."
                        description="To provide users with a simple platform for reporting suspicious digital activity while improving awareness of common scam and phishing warning signs."
                    />


                    <InfoCard
                        eyebrow="VISION"
                        title="Safer and more informed digital communities."
                        description="To contribute towards digital spaces where users are better equipped to recognise suspicious activity, make informed decisions and practise safer online behaviour."
                    />

                </section>



                {/* PROJECT SCOPE */}

                <section className="scope-note">

                    <div>

                        <p className="eyebrow">
                            PROJECT SCOPE
                        </p>


                        <h2>
                            Built as a learning prototype.
                        </h2>

                    </div>


                    <p>
                        Ngao is currently an academic
                        prototype. Reports and analyst
                        classifications in this version
                        are simulated and should not be
                        treated as official cybersecurity
                        assessments.
                    </p>

                </section>


            </div>

        </main>

    );

}


export default About;