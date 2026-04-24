import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepo: Repository<Project>,
    ) { }

    create(createProjectDto: CreateProjectDto) {
        const project = this.projectRepo.create(createProjectDto);
        return this.projectRepo.save(project);
    }

    findAll() {
        return this.projectRepo.find({
            relations: [
                'tasks',
                'tasks.assignee',
                'tasks.reporter',
            ]
        });
    }

    findOne(id: string) {
        return this.projectRepo.findOne({
            where: { id },
            relations: ['tasks'],
        });
    }

    async update(id: string, updateProjectDto: CreateProjectDto) {
        const project = await this.projectRepo.findOneBy({ id });

        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        await this.projectRepo.update(id, updateProjectDto);

        return { message: 'Updated successfully' };
    }

    async remove(id: string) {

        const project = await this.projectRepo.findOneBy({ id });

        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        await this.projectRepo.delete(id);
        return { message: `Project with ID ${id} deleted successfully` };
    }
}
