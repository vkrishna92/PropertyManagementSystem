import { BaseModel } from "./BaseModel";

export interface Community extends BaseModel {
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
}