import { Body, Controller, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-tasks.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post(':id')
    createTask(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.createTask(id, createTaskDto);
    }
}
