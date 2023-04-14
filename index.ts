import { CustomIncludeOptionsArray, ModelsDictionary, } from './types/types';

let models: ModelsDictionary = {};

export function setModels(newModels: ModelsDictionary) {
  models = newModels;
}

export function includeModels(relations: string[]): CustomIncludeOptionsArray {
  const include: CustomIncludeOptionsArray = [];

  for (const relation of relations) {
    const relationParts = relation.split('.');
    let currentInclude = include;

    for (const [index, part] of relationParts.entries()) {
      const [modelPart, wherePart] = part.split(':');
      const model = models[modelPart];
      if (model) {
        let existingInclude = currentInclude.find((inc) => inc.model === model);
        if (!existingInclude) {
          existingInclude = { model, include: [], where: wherePart ? JSON.parse(wherePart) : undefined };
          currentInclude.push(existingInclude);
        }
        if (index < relationParts.length - 1) {
          currentInclude = existingInclude.include as CustomIncludeOptionsArray;
        }
      }
    }
  }

  return include;
} 