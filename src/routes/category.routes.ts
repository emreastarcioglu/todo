import { Router } from 'express';
import { CategoryController } from '../controllers';
import { CategoryDto } from '../dtos';
import { validationMiddleware } from '../middlewares/validation.middleware';

const router = Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = new CategoryController();

router.get('/', getCategories);

router.get('/:id', getCategory);

router.post('/', validationMiddleware(CategoryDto, 'body'), createCategory);

router.put('/:id', validationMiddleware(CategoryDto, 'body'), updateCategory);

router.delete('/:id', deleteCategory);

export default router;
