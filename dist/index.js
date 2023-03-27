"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.includeModels = exports.setModels = void 0;
let models = {};
function setModels(newModels) {
    models = newModels;
}
exports.setModels = setModels;
function includeModels(relations) {
    const include = [];
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
exports.includeModels = includeModels;
