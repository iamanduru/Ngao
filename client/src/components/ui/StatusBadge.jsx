import "./StatusBadge.css";


function StatusBadge({
    status
}) {

    const allowedStatuses = [
        "Pending",
        "Reviewed",
        "Suspicious"
    ];


    const safeStatus =
        allowedStatuses.includes(status)
            ? status
            : "Pending";


    return (

        <span
            className={
                `status-badge status-${safeStatus.toLowerCase()}`
            }
        >

            {safeStatus}

        </span>

    );

}


export default StatusBadge;