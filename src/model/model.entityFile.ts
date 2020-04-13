import { BaseModel } from "./model.base";

export interface IEntityFile extends BaseModel {
    contentType: string;
    name: string;
    size: number;
}
