import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { TasksService } from './tasks.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ConflictException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { UpdateTaskDTO } from 'src/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Post()
  async create(@Body() createTask: CreateTaskDTO) {
    try {
      return await this.tasksService.createOne(createTask);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Task already exists');
      }
      throw error;
    }
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() updateTask: UpdateTaskDTO) {
    const task = await this.tasksService.updateOne(id, updateTask);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    const task = await this.tasksService.deleteOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }
}
