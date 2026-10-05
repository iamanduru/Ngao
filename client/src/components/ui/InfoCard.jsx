function InfoCard({
    eyebrow,
    title,
    description
}) {

    return (

        <article className="info-card">

            {eyebrow && (

                <p className="eyebrow">
                    {eyebrow}
                </p>

            )}


            <h3>
                {title}
            </h3>


            <p>
                {description}
            </p>

        </article>

    );

}


export default InfoCard;