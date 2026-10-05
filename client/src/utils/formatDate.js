export function formatDate(
    dateValue
) {

    if (!dateValue) {

        return "Not available";

    }


    const date =
        new Date(
            dateValue
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "Invalid date";

    }


    return new Intl.DateTimeFormat(
        "en",
        {

            dateStyle:
                "medium",

            timeStyle:
                "short"

        }
    ).format(
        date
    );

}