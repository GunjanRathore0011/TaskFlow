import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-tasks.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post('project/:id')
    createTask(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.createTask(id, createTaskDto);
    }

    @Get()
    findAll(@Query() query: any) {
        return this.tasksService.findAll(query);
    }

    @Put(':id')
    updateTask(@Param('id') id: string, @Body() updateTaskDto: CreateTaskDto) {
        return this.tasksService.updateTask(id, updateTaskDto);
    }

    // get all tasks for a specific project
    @Get('project/:projectId')
    findByProject(@Param('projectId') projectId: string) {
        return this.tasksService.findByProject(projectId);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string) {
        return this.tasksService.deleteTask(id);
    }
}
