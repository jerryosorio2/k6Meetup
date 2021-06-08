import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  //2 VU, 30 Seconds, 2 request/second = 60 total request
  vus: 2, // 2 users looping for 30 seconds
  duration: '30s',

  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1% 
    // 90% of requests must finish within 400ms, 95% within 800ms, and 99.9% within 2s.
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
  },
};

export default () => {
  let response = http.get("http://test.k6.io");
  check(response, {
    'is status 200': r => r.status === 200,
  })
  sleep(1);
};
