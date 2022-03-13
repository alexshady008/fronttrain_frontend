import env from 'react-dotenv'
// import path from 'path'
// import dotenv from 'dotenv'
// dotenv.config({ path: path.join(__dirname, '../.env') });

console.log(env)

const config = {
    // urlServer: 'http://localhost:4000/api',
    // urlServerDb: 'http://localhost:4000/database/products/',
    // urlServerUserDb: 'http://localhost:4000/database/avatars/',
    // urlServerPdf: 'http://localhost:4000/pdf/',
    urlServer: 'https://front-train-backend.herokuapp.com/api',
    urlServerDb: 'https://front-train-backend.herokuapp.com/database/products/',
    urlServerUserDb: 'https://front-train-backend.herokuapp.com/database/avatars/',
    urlServerPdf: 'https://front-train-backend.herokuapp.com/pdf/',
    limitPage: 10,
    limitOffset: 100,
    intervalSesion: 1000,
    userRoleDefault: 'User',
    numberAdmin: '549113583-3475'
}

export default config