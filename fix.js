const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'ritmo-claro-api');

// 1. Modificar schema.prisma para eliminar la ruta personalizada
const schemaPath = path.join(baseDir, 'prisma/schema.prisma');
if (fs.existsSync(schemaPath)) {
  let schema = fs.readFileSync(schemaPath, 'utf8');
  schema = schema.replace(/output\s*=\s*"[^"]*"\n?/g, '');
  fs.writeFileSync(schemaPath, schema, 'utf8');
  console.log('✔ schema.prisma actualizado.');
}

// 2. Reemplazar todas las importaciones hacia @prisma/client
const archivos = [
  'src/prisma/prisma.service.ts',
  'src/auth/auth.service.ts',
  'src/auth/decorators/roles.decorator.ts',
  'src/habitos/dto/crear-habito.dto.ts',
  'src/habitos/habitos.service.ts',
  'src/habitos/habitos.controller.ts'
];

archivos.forEach((rel) => {
  const fullPath = path.join(baseDir, rel);
  if (fs.existsSync(fullPath)) {
    let contenido = fs.readFileSync(fullPath, 'utf8');
    contenido = contenido.replaceAll('../generated/prisma', '@prisma/client');
    contenido = contenido.replaceAll('../../generated/prisma', '@prisma/client');
    fs.writeFileSync(fullPath, contenido, 'utf8');
    console.log(`✔ Importación corregida en: ${rel}`);
  }
});

console.log('\n✅ Corrección finalizada.');