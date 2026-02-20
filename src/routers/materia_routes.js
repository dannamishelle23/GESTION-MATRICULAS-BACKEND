import { crearMateria, listarMaterias, detalleMateria, actualizarMateria, eliminarMaterias } from "../controllers/materias_controller.js";
import { Router } from 'express';
import { verificarTokenJWT } from "../middlewares/JWT.js";

const router = Router();

//CRUD de materias por medio de un usuario (administrador)
//1. CREAR MATERIA 
router.post('/materias/crear-materia', verificarTokenJWT, crearMateria)
//2. Listar todas las materias
router.get('/materias/listar-materias', verificarTokenJWT, listarMaterias)
//3. Visualizar el detalle de una materia por ID
router.get('/materias/detalle-materia/:id', verificarTokenJWT, detalleMateria)
//4. Editar una materia por ID 
router.put('/materias/editar-materia/:id', verificarTokenJWT, actualizarMateria)
//5. Eliminar materias y pasar a inactivas por auditoria
router.delete('/materias/eliminar-materias', verificarTokenJWT, eliminarMaterias)

export default router;