import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  http.get("http://test.k6.io");
}



///////////////
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '1m',

  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1% 
    http_req_duration: ['p(99)<5'], // 99% of requests must complete below 5ms
  },
};

export default () => {
  http.get("http://test.k6.io");
  sleep(1);
};

//Multiple Tresholds
import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  thresholds: {
    // 90% of requests must finish within 400ms, 95% within 800, and 99.9% within 2s.
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
  },
};
export default function () {
  let res1 = http.get('https://test-api.k6.io/public/crocodiles/1/');
  sleep(1);
}


// Check 

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '1m',

  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1% 
    http_req_duration: ['p(99)<5'], // 99% of requests must complete below 5ms
  },
};

export default () => {
  let response = http.get("http://test.k6.io");
  check(response, {
    'is status 200': r => r.status === 200,
  })
  sleep(1);
};