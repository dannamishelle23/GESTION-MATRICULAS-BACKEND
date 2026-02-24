import app from './server.js';
import connection from './database.js';
import Usuarios from './models/Usuarios.js';

const seedAdmins = async () => {
    try {
        const admins = [
            {
                nombre: "Danna",
                apellido: "Lopez",
                email: "danna.lopez@epn.edu.ec",
                password: "dannamishelle23",
                rol: "Admin"
            },
            {
                nombre: "Jose",
                apellido: "Vargas",
                email: "jose.vargas@epn.edu.ec",
                password: "josevargas28",
                rol: "Admin"
            }
        ];

        for (let admin of admins) {

            const existe = await Usuarios.findOne({ email: admin.email });

            if (!existe) {

                const nuevoUsuario = new Usuarios(admin);

                //Guardar la contraseña encriptada en la base de datos
                nuevoUsuario.password = await nuevoUsuario.encryptPassword(admin.password);

                await nuevoUsuario.save();

                console.log(`Admin creado: ${admin.email}`);
            } else {
                console.log(`Admin ya existe: ${admin.email}`);
            }
        }

    } catch (error) {
        console.error("Error en seedAdmins:", error);
    }
};

const startServer = async () => {

    await connection();   // conectar base

    await seedAdmins();   // ejecutar seed

    app.listen(app.get('port'), () => {
        console.log(`Server ok on port "${app.get('port')}"`);
    });
};

startServer();