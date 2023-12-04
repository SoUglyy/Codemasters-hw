const SERVER_URL = 'http://localhost:3000/';
// Это должен быть ts файл

export async function get (url) {
  const api = `${SERVER_URL}${url}`;

  return await (await fetch(api)).json();
}

export async function post (url, data) {
  const api = `${SERVER_URL}${url}`;

  return await (await fetch(api, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })).json();
}
