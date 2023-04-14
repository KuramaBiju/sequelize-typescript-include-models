let models: { [key: string]: any } = {};

export function setModels(newModels: { [key: string]: any }) {
  models = newModels;
}


export function includeModels(relations: string[]): any[] {
  const include: any[] = [];

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
          currentInclude = existingInclude.include;
        }
      }
    }
  }

  return include;
}