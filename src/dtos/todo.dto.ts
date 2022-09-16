import {
  IsNumber,
  IsDateString,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty({ message: 'Body field cannot be empty' })
  body: string;

  @IsOptional()
  @IsDateString({}, { message: 'Due date field must be a date' })
  dueDate?: Date;

  @IsOptional()
  @IsNumber(
    { allowInfinity: false },
    { message: 'Category id field must be a number' }
  )
  categoryId?: number;
}

export class UpdateTodoDto extends CreateTodoDto {
  @IsOptional()
  @IsBoolean({ message: 'Flag field must be a boolean' })
  isFlagged?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Completion field must be a boolean' })
  isCompleted?: boolean;
}
