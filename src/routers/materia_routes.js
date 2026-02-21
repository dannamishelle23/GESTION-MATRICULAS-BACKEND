import { crearMateria, listarMaterias, detalleMateria, actualizarMateria, eliminarMaterias } from "../controllers/materias_controller.js";
import { Router } from 'express';
import { verificarTokenJWT, autorizarAdmin, autorizarAdminOEstudianteLectura } from "../middlewares/JWT.js";

const router = Router();

//CRUD de materias por medio de un usuario (administrador)
//1. CREAR MATERIA - Solo Admin
router.post('/materias/crear-materia', verificarTokenJWT, autorizarAdmin, crearMateria)
//2. Listar todas las materias - Admin y Estudiante (lectura)
router.get('/materias/listar-materias', verificarTokenJWT, autorizarAdminOEstudianteLectura, listarMaterias)
//3. Visualizar el detalle de una materia por ID - Admin y Estudiante (lectura)
router.get('/materias/detalle-materia/:id', verificarTokenJWT, autorizarAdminOEstudianteLectura, detalleMateria)
//4. Editar una materia por ID - Solo Admin
router.put('/materias/editar-materia/:id', verificarTokenJWT, autorizarAdmin, actualizarMateria)
//5. Eliminar materias y pasar a inactivas por auditoria - Solo Admin
router.delete('/materias/eliminar-materias', verificarTokenJWT, autorizarAdmin, eliminarMaterias)

export default router;