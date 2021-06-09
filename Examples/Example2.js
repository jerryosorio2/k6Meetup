import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  //1 VU, 30 Seconds, 1 request/second = 30 total request
  vus: 1, // 1 user looping for 30s
  duration: '30s',

  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1% 
    http_req_duration: ['p(99)<500'], // 99% of requests must complete below 500ms
  },
};

export default () => {
  http.get("http://test.k6.io");
  sleep(1);
};