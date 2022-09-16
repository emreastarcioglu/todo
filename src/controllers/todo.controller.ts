import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { TodoEntity } from '../entities';
import { TodoService } from '../services/todo.service';
import { EntityNotFound } from '../errors';

export class TodoController {
  public todoService = new TodoService(TodoEntity, AppDataSource.manager);

  public getTodos = async (req: Request, res: Response) => {
    try {
      const todos = await this.todoService.getAllTodos(req, res);

      return res.json(todos);
    } catch (err) {
      if (err instanceof EntityNotFound) {
        return err.getResponse();
      }
    }
  };

  public getTodo = async (req: Request, res: Response) => {
    try {
      const todo = await this.todoService.getTodo(req, res);

      return res.json(todo);
    } catch (err) {
      if (err instanceof EntityNotFound) {
        return err.getResponse();
      }
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    try {
      const todo = await this.todoService.createTodo(req, res);

      return res.status(201).json(todo);
    } catch (err) {
      if (err instanceof EntityNotFound) {
        return err.getResponse();
      }
    }
  };

  public updateTodo = async (req: Request, res: Response) => {
    try {
      const result = await this.todoService.updateTodo(req, res);

      return res.json(result);
    } catch (err) {
      if (err instanceof EntityNotFound) {
        return err.getResponse();
      }
    }
  };

  public archiveTodo = async (req: Request, res: Response) => {
    try {
      const todo = await this.todoService.archiveTodo(req, res);

      return res.json(todo);
    } catch (err) {
      if (err instanceof EntityNotFound) {
        return err.getResponse();
      }
    }
  };

  public unarchiveTodo = async (req: Request, res: Response) => {
    try {
      const todo = await this.todoService.unarchiveTodo(req, res);

      return res.json(todo);
    } catch (err) {
      if (err instanceof EntityNotFound) {
        return err.getResponse();
      }
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    try {
      const todo = await this.todoService.deleteTodo(req, res);

      return res.json(todo);
    } catch (err) {
      if (err instanceof EntityNotFound) {
        return err.getResponse();
      }
    }
  };
}
