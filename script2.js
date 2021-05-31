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
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

export default () => {
  http.get("http://test.k6.io");
  sleep(1);
};