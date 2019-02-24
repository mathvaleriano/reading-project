const BASE_URL = 'http://localhost:3001';
let auth = localStorage.getItem('auth');

if (!auth) {
  auth = new Date().toISOString();
  localStorage.setItem('auth', auth);
}

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: auth,
};

const tryAwaitRequest = async (req) => {
  const response = await req;
  const data = await response.json();
  return data;
};

export const doRequest = ({
  url, method = 'GET', body, headers,
}) => tryAwaitRequest(
  fetch(`${BASE_URL}${url}`, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  }),
);

export default {
  doRequest,
};
