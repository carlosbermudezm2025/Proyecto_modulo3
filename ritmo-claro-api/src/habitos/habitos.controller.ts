import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HabitosService } from './habitos.service';
import { CrearHabitoDto } from './dto/crear-habito.dto';
import { ActualizarHabitoDto } from './dto/actualizar-habito.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UsuarioActual } from '../auth/decorators/usuario-actual.decorator';
import { Rol } from '@prisma/client';

@ApiTags('habitos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('habitos')
export class HabitosController {
  constructor(private readonly habitosService: HabitosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo hábito' })
  async crear(@UsuarioActual('id') usuarioId: string, @Body() crearHabitoDto: CrearHabitoDto) {
    return this.habitosService.crear(usuarioId, crearHabitoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener mis hábitos' })
  async obtenerTodosDelUsuario(@UsuarioActual('id') usuarioId: string) {
    return this.habitosService.obtenerTodosDelUsuario(usuarioId);
  }

  @Get('admin/todos')
  @Roles(Rol.ADMIN)
  @ApiOperation({ summary: 'Obtener todos los hábitos (ADMIN)' })
  async obtenerTodosAdmin() {
    return this.habitosService.obtenerTodosAdmin();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener hábito por ID' })
  async obtenerPorId(@Param('id') id: string, @UsuarioActual('id') usuarioId: string) {
    return this.habitosService.obtenerPorId(id, usuarioId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar hábito' })
  async actualizar(@Param('id') id: string, @UsuarioActual('id') usuarioId: string, @Body() actualizarHabitoDto: ActualizarHabitoDto) {
    return this.habitosService.actualizar(id, usuarioId, actualizarHabitoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar hábito' })
  async eliminar(@Param('id') id: string, @UsuarioActual('id') usuarioId: string) {
    return this.habitosService.eliminar(id, usuarioId);
  }
}