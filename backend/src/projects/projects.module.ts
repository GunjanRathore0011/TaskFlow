import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Task } from 'src/tasks/tasks.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Project, Task]) ],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
