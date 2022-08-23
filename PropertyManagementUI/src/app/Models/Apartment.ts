import { BaseModel } from "./BaseModel";
import { AppUserDto } from "./AppUser";
import { Building } from "./Building";

export interface Apartment extends BaseModel {
    ApartmentNum: string | null;
    Floor: string | null; 
    AreaSqft: number | null;
    AppUserId: string | null;
    Owner: AppUserDto | null;
    BuildingId: number | null;
    Building: Building | null;
}