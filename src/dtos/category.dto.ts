import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty({ message: 'Name field cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'Color field cannot be empty' })
  color: string;
}
