const {getConnection} = require('./database')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

async function consultarUsuario(usuario, clave){
        const conn = await getConnection();
        const result = await conn.query('SELECT * FROM users WHERE user = ? AND pass=?', [usuario, clave])
        return result[0];
}

module.exports = {consultarUsuario}
