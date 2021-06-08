import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {

  stages: [
    { duration: '10s', target: 5 }, // simulate ramp-up of traffic from 1 to 5 users over 10 seconds.
    { duration: '10s', target: 5 }, // stay at 10 users for 15 seconds
    { duration: '10s', target: 0 }, // ramp-down to 0 users
  ],

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
