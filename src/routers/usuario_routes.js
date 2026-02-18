import {Router} from 'express';
import { registroUsuarios, recuperarPassword, comprobarTokenPassword, crearNuevoPassword, loginUsuario, perfilUsuario } from '../controllers/usuario_controller.js';
import { verificarTokenJWT } from '../middlewares/JWT.js';

const router = Router();
//Ruta para registro
router.post('/usuario/registro', registroUsuarios)
//Recuperar contraseña
router.post('/usuario/recuperarpassword', recuperarPassword)
router.get('/usuario/recuperarpassword/:token', comprobarTokenPassword)
router.post('/usuario/crearnuevopassword/:token', crearNuevoPassword)
//Login de usuario
router.post('/usuario/login', loginUsuario)
//Perfil de usuario
router.get('/usuario/perfil', verificarTokenJWT, perfilUsuario)

export default router;
