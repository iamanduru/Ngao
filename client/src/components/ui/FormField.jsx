import "./FormField.css";


function FormField({
    label,
    name,
    error,
    helpText,
    children
}) {

    return (

        <div className="form-field">

            <label htmlFor={name}>
                {label}
            </label>


            {children}


            {helpText && !error && (

                <small className="field-help">
                    {helpText}
                </small>

            )}


            {error && (

                <p
                    className="field-error"
                    role="alert"
                >
                    {error}
                </p>

            )}

        </div>

    );

}


export default FormField;