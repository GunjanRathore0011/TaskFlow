import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository.js';
import { Task } from './tasks.entity';
import { Project } from 'src/projects/project.entity';
import { CreateTaskDto } from './dto/create-tasks.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Project)
        private projectRepo: Repository<Project>,

        @InjectRepository(Task)
        private taskRepo: Repository<Task>,
    ) {}    

    async createTask(id: string,createTaskDto: CreateTaskDto) {
        const project = await this.projectRepo.findOne({where: {id}});
        if (!project) {
            throw new Error('Project not found');
        }

        const task = this.taskRepo.create({
            ...createTaskDto,
            project,
        });
        return this.taskRepo.save(task);
    }
}