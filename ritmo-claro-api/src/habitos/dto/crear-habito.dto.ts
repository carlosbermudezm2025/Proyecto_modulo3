import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { EstadoHabito, FrecuenciaHabito } from '@prisma/client';

export class CrearHabitoDto {
  @ApiProperty({ example: 'Hacer pausa activa' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(120, { message: 'El nombre no debe superar los 120 caracteres' })
  nombre: string;

  @ApiPropertyOptional({ example: 'Realizar estiramientos cada 2 horas' })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'La descripción no debe superar los 500 caracteres' })
  descripcion?: string;

  @ApiPropertyOptional({ enum: EstadoHabito, default: EstadoHabito.ACTIVO })
  @IsOptional()
  @IsEnum(EstadoHabito, { message: 'Estado inválido' })
  estado?: EstadoHabito;

  @ApiPropertyOptional({ enum: FrecuenciaHabito, default: FrecuenciaHabito.DIARIA })
  @IsOptional()
  @IsEnum(FrecuenciaHabito, { message: 'Frecuencia inválida' })
  frecuencia?: FrecuenciaHabito;
}