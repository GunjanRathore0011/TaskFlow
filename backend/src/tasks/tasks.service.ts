import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Task } from './tasks.entity';
import { Project } from 'src/projects/project.entity';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Project)
        private projectRepo: Repository<Project>,

        @InjectRepository(Task)
        private taskRepo: Repository<Task>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async createTask(id: string, createTaskDto: CreateTaskDto) {
        const project = await this.projectRepo.findOne({ where: { id } });
        if (!project) {
            throw new Error('Project not found');
        }

        const { assignee: assigneeId, reporter: reporterId, ...taskData } = createTaskDto;
        console.log('Creating task with data:', taskData, 'Assignee ID:', assigneeId, 'Reporter ID:', reporterId);

        const assignee = assigneeId
            ? await this.userRepository.findOne({ where: { id: assigneeId } })
            : null;

        if (assigneeId && !assignee) {
            throw new Error('Assignee not found');
        }

        const reporter = reporterId
            ? await this.userRepository.findOne({ where: { id: reporterId } })
            : null;

        if (reporterId && !reporter) {
            throw new Error('Reporter not found');
        }

        const task = this.taskRepo.create({
            ...taskData,
            project,
            assignee,
            reporter,
        } as DeepPartial<Task>);
        return this.taskRepo.save(task);
    }

    findAll(query: { status?: string; priority?: string }) {
        const { status, priority } = query;

        const where: any = {};

        if (status) {
            where.status = status;
        }

        if (priority) {
            where.priority = priority;
        }

        return this.taskRepo.find({
            where,
            relations: ['project', 'assignee', 'reporter'],
        });
    }

    async updateTask(id: string, updateTaskDto: CreateTaskDto) {
        const task = await this.taskRepo.findOne({ where: { id } });
        if (!task) {
            throw new Error('Task not found');
        }

        const {taskCode, assignee: assigneeId, reporter: reporterId, ...updateData } = updateTaskDto;

        const assignee = assigneeId ? await this.userRepository.findOne({ where: { id: assigneeId } }) : null;
        if (assigneeId && !assignee) {
            throw new Error('Assignee not found');
        }

        const reporter = reporterId ? await this.userRepository.findOne({ where: { id: reporterId } }) : null;
        if (reporterId && !reporter) {
            throw new Error('Reporter not found');
        }

        Object.assign(task, updateData, { assignee, reporter });
        return this.taskRepo.save(task);
    }

    findByProject(projectId: string) {
        return this.taskRepo.find({
            where: { project: { id: projectId } },
            relations: ['project', 'assignee', 'reporter'],
        });
    }

    async deleteTask(id: string) {
        const task = await this.taskRepo.findOne({ where: { id } });
        if (!task) {
            throw new Error('Task not found');
        }
        return this.taskRepo.remove(task);
    }
}