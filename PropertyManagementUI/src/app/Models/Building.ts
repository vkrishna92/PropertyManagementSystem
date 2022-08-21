import { BaseModel } from "./BaseModel";
import { Community } from "./Community";

export interface Building extends BaseModel {
    Name: string | null;
    CommunityId: number;
    Community: Community | null;
    UseCommunityAddress: boolean | null;
    AddressLine1: string | null;
    AddressLine2: string | null;
    City: string | null;
    State: string | null;
    Country: string | null;
    Zipcode: string | null;
}