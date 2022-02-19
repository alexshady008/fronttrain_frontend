//require('dotenv').config()

const config = {
    urlServer: process.env.URL_SERVER || 'http://localhost:4000/api',
    urlServerDb: process.env.URL_SERVER_DB || 'http://localhost:4000/database/products/',
    urlServerUserDb: process.env.URL_SERVER_USER_DB || 'http://localhost:4000/database/avatars/',
    urlServerPdf: process.env.URL_SERVER_PDF || 'http://localhost:4000/pdf/',
    limitPage: 10,
    limitOffset: 100,
    intervalSesion: 1000,
    userRoleDefault: 'User',
    numberAdmin: '549113583-3475'
}

export default config