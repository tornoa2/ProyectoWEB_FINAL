/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `Videogame` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nombre` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Videogame" DROP CONSTRAINT "Videogame_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "nombre" TEXT NOT NULL;

-- DropTable
DROP TABLE "Videogame";

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "descuento" DOUBLE PRECISION DEFAULT 0,
    "esta_oferta" BOOLEAN DEFAULT false,
    "videoURL" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "detalleImagenes" TEXT[],
    "rating" DOUBLE PRECISION,
    "stock" INTEGER NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "estado" BOOLEAN DEFAULT true,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Platform" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformOnGame" (
    "gameId" INTEGER NOT NULL,
    "platformId" INTEGER NOT NULL,

    CONSTRAINT "PlatformOnGame_pkey" PRIMARY KEY ("gameId","platformId")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT,
    "cuerpo" TEXT NOT NULL,
    "imagenPrincipal" TEXT,
    "fecha_publicacion" TIMESTAMP(3),
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" INTEGER NOT NULL,
    "juego_id" INTEGER NOT NULL,
    "codigo" TEXT NOT NULL,
    "monto_pagado" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformOnGame" ADD CONSTRAINT "PlatformOnGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformOnGame" ADD CONSTRAINT "PlatformOnGame_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_juego_id_fkey" FOREIGN KEY ("juego_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
