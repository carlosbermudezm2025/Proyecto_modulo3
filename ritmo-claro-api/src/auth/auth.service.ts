import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Rol } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async register(registerDto: RegisterDto) {
    const { nombre, email, password } = registerDto;
    const usuarioExistente = await this.prisma.usuario.findUnique({ where: { email } });
    if (usuarioExistente) throw new ConflictException('El correo electrónico ya está registrado');

    const passwordHash = await bcrypt.hash(password, 10);
    const nuevoUsuario = await this.prisma.usuario.create({
      data: { nombre, email, passwordHash, rol: Rol.USUARIO },
    });

    const { passwordHash: _, ...usuarioSinPassword } = nuevoUsuario;
    return usuarioSinPassword;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const usuario = await this.prisma.usuario.findUnique({ where: { email } });
    if (!usuario) throw new UnauthorizedException('Credenciales inválidas');

    const passwordValido = await bcrypt.compare(password, usuario.passwordHash);
    if (!passwordValido) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: usuario.id, email: usuario.email, rol: usuario.rol };
    return { access_token: this.jwtService.sign(payload) };
  }
}