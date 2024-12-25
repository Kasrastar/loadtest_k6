// import http from 'k6/http';
// import { sleep } from 'k6';

// // Define test configuration
// export const options = {
//     vus: 10, // Number of virtual users
//     duration: '30s', // Test duration
// };

// // Entry point for the test
// export default function () {
//     const res = http.get('https://test.k6.io');
//     console.log(`Response time for this request: ${res.timings.duration}ms`);
//     sleep(1); // Simulate user think time of 1 second
// }

import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {

    vus: 1,
    duration: '1m',
    // iterations: 10,
};

// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
export default function () {


    const url = 'https://tourapi.snapptrip.com/listing/search';
    const payload = JSON.stringify({
        origin: 'THR',
        destination: 'MHD',
        departureDate: '2024-12-31',
        returnDate: '2025-01-02',
        rooms: [{ adultCount: 2, children: [] }],
        filter: {}
    });


    // const headers = {
    //     'Accept': 'application/json',
    //     'Authorization': 'Bearer YOUR_JWT_TOKEN',
    //     'Content-Type': 'application/json',
    //     'channel': 'website',
    //     'clientId': 'website',
    // };

    const res = http.post(url, payload, { headers });

    check(res, {
        'is status 200': (r) => r.status === 200,
        'contains solutions': (r) => JSON.parse(r.body).solutions.length > 0,
    });

    console.log(`Response time: ${res.timings.duration} ms`);
    sleep(1);


    // // Make a GET request to the target URL
    // check(http.get('https://test-api.k6.io'), {
    //     "status is 200" : (r) => r.status == 200
    // });
    // // Sleep for 1 second to simulate real-world usage
    // sleep(1);
}



