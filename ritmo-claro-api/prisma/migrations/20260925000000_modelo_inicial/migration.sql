CREATE TYPE "Rol" AS ENUM ('USUARIO', 'ADMIN');
CREATE TYPE "EstadoHabito" AS ENUM ('ACTIVO', 'PAUSADO', 'ARCHIVADO');
CREATE TYPE "FrecuenciaHabito" AS ENUM ('DIARIA', 'SEMANAL', 'MENSUAL');

CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'USUARIO',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Habito" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "estado" "EstadoHabito" NOT NULL DEFAULT 'ACTIVO',
    "frecuencia" "FrecuenciaHabito" NOT NULL DEFAULT 'DIARIA',
    "usuarioId" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Habito_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

ALTER TABLE "Habito" ADD CONSTRAINT "Habito_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;