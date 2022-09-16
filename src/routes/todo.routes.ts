import { Router } from 'express';
import { TodoController } from '../controllers';
import { CreateTodoDto, UpdateTodoDto } from '../dtos';
import { validationMiddleware } from '../middlewares/validation.middleware';

const router = Router();
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  archiveTodo,
  unarchiveTodo,
  deleteTodo,
} = new TodoController();

router.get('/', getTodos);

router.get('/:id', getTodo);

router.post('/', validationMiddleware(CreateTodoDto, 'body'), createTodo);

router.put('/:id', validationMiddleware(UpdateTodoDto, 'body'), updateTodo);

router.put('/:id/archive', archiveTodo);

router.put('/:id/unarchive', unarchiveTodo);

router.delete('/:id', deleteTodo);

export default router;
