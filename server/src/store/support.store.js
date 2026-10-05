const supportRequests = [];


export function createSupportRequest(
    request
) {

    supportRequests.unshift(
        request
    );


    return request;

}