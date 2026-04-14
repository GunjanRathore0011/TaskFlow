import {
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { TaskStatus, TaskPriority } from '../tasks.entity'

export class CreateTaskDto {
  @IsString()
  taskCode: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsUUID()
  assigneeId?: string;

  @IsOptional()
  @IsUUID()
  reporterId?: string;
}