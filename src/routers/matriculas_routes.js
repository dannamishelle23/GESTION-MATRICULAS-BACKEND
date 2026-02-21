import { crearMatricula, listarMatriculas, detalleMatricula, eliminarMatricula } from "../controllers/matriculas_controller.js";
import { Router } from 'express';
import { verificarTokenJWT, autorizarEstudiante, autorizarAdminOEstudiante } from "../middlewares/JWT.js";

const router = Router();

//CRUD de matriculas (lo hace el estudiante)
//1. CREAR MATRICULA - Solo estudiantes
router.post('/matriculas/crear-matricula', verificarTokenJWT, autorizarEstudiante, crearMatricula)
//2. Listar todas las matriculas - Admin y Estudiante
router.get('/matriculas/listar-matriculas', verificarTokenJWT, autorizarAdminOEstudiante, listarMatriculas)
//3. Visualizar el detalle de una matricula por ID - Admin y Estudiante
router.get('/matriculas/detalle-matricula/:id', verificarTokenJWT, autorizarAdminOEstudiante, detalleMatricula)
//4. Editar una matricula por ID - Solo estudiantes
//router.put('/matriculas/editar-matricula/:id', verificarTokenJWT, autorizarEstudiante, actualizarMatricula)
//5. Eliminar matriculas definitivamente - Solo estudiantes
router.delete('/matriculas/eliminar-matricula/:id', verificarTokenJWT, autorizarEstudiante, eliminarMatricula)

export default router;