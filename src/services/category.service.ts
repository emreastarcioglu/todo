import { Request, Response } from 'express';
import { Repository, UpdateResult } from 'typeorm';
import { Category } from '../interfaces';
import { CategoryEntity } from '../entities';
import { EntityNotFound } from '../errors';

export class CategoryService extends Repository<CategoryEntity> {
  public getCategories = async (
    req: Request,
    res: Response
  ): Promise<CategoryEntity[]> => {
    const categories = await CategoryEntity.find({ order: { id: 'ASC' } });

    if (categories.length === 0) {
      throw new EntityNotFound('Could not find any record', res);
    }

    return categories;
  };

  public getCategory = async (
    req: Request,
    res: Response
  ): Promise<CategoryEntity> => {
    return await this.findCategory(req, res);
  };

  public createCategory = async (
    req: Request,
    res: Response
  ): Promise<CategoryEntity> => {
    const { name, color }: Category = req.body;

    let category = new CategoryEntity();
    category.name = name;
    category.color = color;

    category = await category.save();

    return category;
  };

  public updateCategory = async (
    req: Request,
    res: Response
  ): Promise<CategoryEntity> => {
    const id = Number(req.params.id);
    const { name, color }: Category = req.body;

    let category = await CategoryEntity.findOneBy({ id });

    if (!category) {
      throw new EntityNotFound('Could not find any record', res);
    }

    category.name = name ?? category.name;
    category.color = color ?? category.color;

    category = await CategoryEntity.save(category);

    return category;
  };

  public deleteCategory = async (
    req: Request,
    res: Response
  ): Promise<CategoryEntity> => {
    const category = await this.findCategory(req, res);

    return await this.softRemove(category);
  };

  private findCategory = async (
    req: Request,
    res: Response
  ): Promise<CategoryEntity> => {
    const id = Number(req.params.id);
    const category = await CategoryEntity.findOneBy({ id });

    if (!category) {
      throw new EntityNotFound('Could not find any record', res);
    }

    return category;
  };
}
