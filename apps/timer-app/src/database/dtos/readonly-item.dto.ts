import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReadOnlyItemDto {
  @IsNumber()
  @IsNotEmpty()
  item_id: number;

  @IsString()
  @IsNotEmpty()
  item_type: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  grade: string | null;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  image_url: string | null;

  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @IsNumber()
  required_study_time: number | null;

  @IsNumber()
  @IsNotEmpty()
  effect_code: number;
}