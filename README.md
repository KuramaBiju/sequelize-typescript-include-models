# Include Models Helper for Sequelize 🚀

[![npm version](https://img.shields.io/npm/v/include-models-helper.svg?style=flat)](https://www.npmjs.com/package/include-models-helper)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**Include Models Helper** es un paquete que simplifica la creación de consultas de inclusión de modelos relacionados en Sequelize y TypeScript. Permite configurar fácilmente las relaciones entre tus modelos y generar automáticamente las cláusulas `include` en tus consultas, haciendo que tu código sea más limpio y fácil de mantener.

## 📦 Instalación

Usa npm o yarn para instalar Include Models Helper en tu proyecto:

```bash
npm install sequelize-typescript-include-models

# or
yarn add sequelize-typescript-include-models

```

## 📚 Uso

Primero, importa `setModels` e `includeModels` desde el paquete `sequelize-typescript-include-models`:

```typescript
import { setModels, includeModels } from 'sequelize-typescript-include-models';
```

Luego, configura tus modelos utilizando la función setModels. Asegúrate de hacer esto solo una vez en tu aplicación:

```typescript
import { Member } from "../app/backend/models/Member";
import { Company } from "../app/backend/models/Company";
import { Proyect } from "../app/backend/models/Proyect";
// ...

setModels({
  Member,
  Company,
  Proyect,
  // ...
});
```

Ahora puedes utilizar la función includeModels para generar cláusulas include en tus consultas de Sequelize:

```typescript
const relations = [
  'Company',
  'ProyectRequest.Team',
  'ProyectRequirements.ProyectRequirementsFiles',
  'ProjectStatus.Status'
];

const proyect: Proyect | null = await Proyect.findByPk(proyectId, {
  include: includeModels(relations),
});
```

## 📖 Ejemplo

Digamos que tienes los siguientes modelos en tu aplicación:

User
Post
Comment
Category
Supongamos que quieres recuperar un Post junto con su autor (User), los comentarios (Comment) y la categoría (Category) a la que pertenece. Para hacer esto, puedes utilizar includeModels de la siguiente manera:

```typescript
const relations = [
  'User', // Autor del Post
  'Comment', // Comentarios del Post
  'Category' // Categoría del Post
];

const post = await Post.findByPk(postId, {
  include: includeModels(relations),
});

```

## ⚙️ Configuración avanzada

Puedes pasar condiciones adicionales para filtrar modelos relacionados utilizando la sintaxis de dos puntos (:) seguida de una cadena JSON:

```typescript
const relations = [
  'Comment:{"status": "approved"}'
];

const post = await Post.findByPk(postId, {
  include: includeModels(relations),
});
```

Esto incluirá solo los comentarios que tengan un estado "aprobado" en el Post.

## 📄 Licencia

Este proyecto está licenciado bajo la licencia MIT - consulta el archivo LICENSE para obtener más detalles.

