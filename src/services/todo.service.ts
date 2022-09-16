import { Request, Response } from 'express';
import { Repository, UpdateResult } from 'typeorm';
import { Todo } from '../interfaces';
import { TodoEntity, CategoryEntity } from '../entities';
import { EntityNotFound } from '../errors';

export class TodoService extends Repository<TodoEntity> {
  public getAllTodos = async (
    req: Request,
    res: Response
  ): Promise<TodoEntity[]> => {
    const todos = await this.find({
      where: { archivedAt: undefined },
      order: { id: 'ASC' },
    });

    if (todos.length === 0) {
      throw new EntityNotFound('Could not find any record', res);
    }

    return todos;
  };

  public getTodo = async (req: Request, res: Response): Promise<TodoEntity> => {
    return await this.findTodo(req, res);
  };

  public createTodo = async (
    req: Request,
    res: Response
  ): Promise<TodoEntity> => {
    const { body, categoryId, dueDate }: Todo = req.body;

    let category: CategoryEntity | null = null;
    let todo = new TodoEntity();

    category = await CategoryEntity.findOneBy({ id: categoryId });

    if (!category) {
      throw new EntityNotFound('Given category is undefined', res);
    }

    //Adds category entity if program finds a category entity with given category id
    if (categoryId) {
      todo.category = category;
    }

    todo.body = body;
    todo.dueDate = dueDate;

    return await this.save(todo);
  };

  public updateTodo = async (
    req: Request,
    res: Response
  ): Promise<TodoEntity> => {
    const id = Number(req.params.id);
    const { body, categoryId, dueDate, isFlagged, isCompleted }: Todo =
      req.body;

    let todo = await this.findOneBy({ id });

    if (!todo) {
      throw new EntityNotFound('Could not find any record with given Id', res);
    }

    let category: CategoryEntity | null = null;

    if (categoryId) {
      category = await CategoryEntity.findOneBy({ id: categoryId });

      if (!category) {
        throw new EntityNotFound('Given category is undefined', res);
      }
    }

    todo.body = body ?? todo.body;
    todo.category = category ?? todo.category;
    todo.dueDate = dueDate;
    todo.isFlagged = isFlagged ?? todo.isFlagged;
    todo.isCompleted = isCompleted ?? todo.isCompleted;

    return await this.save(todo);
  };

  public archiveTodo = async (
    req: Request,
    res: Response
  ): Promise<TodoEntity> => {
    const todo = await this.findTodo(req, res);

    todo.archivedAt = new Date();

    return await this.save(todo);
  };

  public unarchiveTodo = async (
    req: Request,
    res: Response
  ): Promise<TodoEntity> => {
    const todo = await this.findTodo(req, res);

    todo.archivedAt = null;

    return await this.save(todo);
  };

  public deleteTodo = async (
    req: Request,
    res: Response
  ): Promise<TodoEntity> => {
    const todo = await this.findTodo(req, res);

    return await this.softRemove(todo);
  };

  private findTodo = async (
    req: Request,
    res: Response
  ): Promise<TodoEntity> => {
    const id = Number(req.params.id);

    const todo = await TodoEntity.findOneBy({
      id,
    });

    if (!todo) {
      throw new EntityNotFound('Could not find any record with given Id', res);
    }

    return todo;
  };
}
