import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Project } from 'src/projects/project.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project,User])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
