import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { CategoryService } from '../services/category.service';
import { CategoryEntity } from '../entities';
import { Category } from '../interfaces';
import { EntityNotFound } from '../errors';

export class CategoryController {
  categoryService = new CategoryService(CategoryEntity, AppDataSource.manager);

  public getCategories = async (req: Request, res: Response) => {
    try {
      const categories = await this.categoryService.getCategories(req, res);

      return res.json(categories);
    } catch (err) {
      if (err instanceof EntityNotFound) {
        return err.getResponse();
      }
    }
  };

  public getCategory = async (req: Request, res: Response) => {
    try {
      const category = await this.categoryService.getCategory(req, res);

      return res.json(category);
    } catch (err) {
      if (err instanceof EntityNotFound) {
        return err.getResponse();
      }
    }
  };

  public createCategory = async (req: Request, res: Response) => {
    try {
      const category = await this.categoryService.createCategory(req, res);

      return res.status(201).json(category);
    } catch (err) {
      return res.json(err);
    }
  };

  public updateCategory = async (req: Request, res: Response) => {
    try {
      const category = await this.categoryService.updateCategory(req, res);

      return res.json(category);
    } catch (err) {
      if (err instanceof EntityNotFound) {
        return err.getResponse();
      }
    }
  };

  public deleteCategory = async (req: Request, res: Response) => {
    try {
      const category = await this.categoryService.deleteCategory(req, res);

      return res.json(category);
    } catch (err) {
      if (err instanceof EntityNotFound) {
        return err.getResponse();
      }
    }
  };
}
