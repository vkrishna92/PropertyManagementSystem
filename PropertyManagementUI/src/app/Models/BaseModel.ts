export interface BaseModel {
    Id: number;
    CreatedDateTime: Date;
    ModifiedDateTime: Date;
    CreatedBy: string | null;
    ModifiedBy: string | null;
}