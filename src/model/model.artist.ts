import { GENDER } from "../enum/gender";
import { ICrud } from "./model.crud";
import { IEntityFile } from "./model.entityFile";

export interface IArtist extends ICrud {
    profileImage?: IEntityFile;
    addressCity?: string;
    addressCountry?: string;
    addressPostalCode?: string;
    addressStreetAddress?: string;
    generalDocument?: IEntityFile;
    generalGender?: GENDER;
}

export type TArtistCreate = Omit<IArtist, keyof ICrud | 'profileImage' | 'generalDocument'>
    & { generalDocument?: { id: string; } }
    & { profileImage?: { id: string; } };

export type TArtistUpdate = TArtistCreate & Pick<ICrud, 'id'>;
