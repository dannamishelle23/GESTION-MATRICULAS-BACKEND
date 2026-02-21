import {Router} from 'express';
import { crearEstudiante, listarEstudiantes, detalleEstudiante, actualizarEstudiante, eliminarEstudiante } from '../controllers/estudiante_controller.js';
import { verificarTokenJWT, autorizarAdmin } from '../middlewares/JWT.js';

const router = Router();

//CRUD de estudiantes por medio de un usuario (administrador)
//1. CREAR ESTUDIANTES
router.post('/estudiantes/crear-estudiante', verificarTokenJWT, autorizarAdmin, crearEstudiante)
//2. VER/LISTAR ESTUDIANTES
router.get('/estudiantes/listar-estudiantes', verificarTokenJWT, autorizarAdmin, listarEstudiantes)
//Ver el registro de un estudiante
router.get('/estudiantes/detalle-estudiante/:id', verificarTokenJWT, autorizarAdmin, detalleEstudiante)
//3. ACTUALIZAR INFO ESTUDIANTES
router.put('/estudiantes/actualizar-estudiante/:id', verificarTokenJWT, autorizarAdmin, actualizarEstudiante)
//4. ELIMINAR ESTUDIANTES (ESTADO INACTIVO)
router.delete('/estudiantes/eliminar-estudiante/:id', verificarTokenJWT, autorizarAdmin, eliminarEstudiante)

export default router;