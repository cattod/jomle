import { IArtist } from '../model/model.artist';
import { CrudService } from './service.crud';

export class ArtistService extends CrudService<IArtist> {
    crudBaseUrl = 'artist';
}
