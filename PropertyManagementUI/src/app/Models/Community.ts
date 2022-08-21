import { BaseModel } from "./BaseModel";

export interface Community extends BaseModel {
    Name: string | null;
    AddressLine1: string | null;
    AddressLine2: string | null;
    City: string | null;
    State: string | null;
    Country: string | null;
    Zipcode: string | null;
}