const API_BASE_URL =
    import.meta.env.VITE_API_URL;


export class ApiError extends Error {

    constructor(
        message,
        status,
        data
    ) {

        super(message);

        this.name =
            "ApiError";

        this.status =
            status;

        this.data =
            data;

    }

}



export async function apiRequest(
    path,
    options = {}
) {

    const {
        method = "GET",
        body,
        headers = {}
    } = options;


    const response =
        await fetch(
            `${API_BASE_URL}${path}`,
            {

                method,

                credentials:
                    "include",

                headers: {

                    ...(body
                        ? {
                            "Content-Type":
                                "application/json"
                        }
                        : {}),

                    ...headers

                },

                body:
                    body
                        ? JSON.stringify(
                            body
                        )
                        : undefined

            }
        );


    const contentType =
        response.headers.get(
            "content-type"
        );


    const data =
        contentType?.includes(
            "application/json"
        )
            ? await response.json()
            : null;


    if (!response.ok) {

        throw new ApiError(

            data?.message ||
                "Request failed.",

            response.status,

            data

        );

    }


    return data;

}