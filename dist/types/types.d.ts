import { Model, IncludeOptions } from 'sequelize';
export type SequelizeModel = typeof Model;
export type ModelStatic<M extends Model> = typeof Model & (new () => M);
export interface CustomIncludeOptions extends Omit<IncludeOptions, 'model'> {
    model: ModelStatic<Model>;
    include?: CustomIncludeOptionsArray;
}
export type CustomIncludeOptionsArray = (CustomIncludeOptions | IncludeOptions)[];
export interface ModelsDictionary {
    [key: string]: ModelStatic<Model>;
}
