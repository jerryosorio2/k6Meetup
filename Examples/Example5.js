import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 100, // 100 RPS, since timeUnit is the default 1s
      duration: '30s',
      preAllocatedVUs: 5,
      maxVUs: 5,
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}