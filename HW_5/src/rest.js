const SERVER_URL = 'http://localhost:3000/';

export async function get(url) {
    const api = `${SERVER_URL}${url}`;

    return (await fetch(api)).json();
}

// const renderQuiz = async () =>{
//     const api = await fetch(SERVER_URL);
//     const quiz = await api.json()
// }
