import { BaseService, IAPI_ResponseList, IAPI_Response } from './service.base';
import { ISearch } from '../model/model.search';
import { ICrud } from '../model/model.crud';

export abstract class CrudService<
    EntityModel,
    EntityCreateModel = Omit<EntityModel, keyof ICrud>,
    EntityUpdateModel = EntityCreateModel & Pick<ICrud, 'id'>
    >
    extends BaseService {

    abstract crudBaseUrl: string;

    search(search: ISearch): Promise<IAPI_ResponseList<EntityModel>> {
        return this.axiosTokenInstance.post(`/${this.crudBaseUrl}/v1/search`, search);
    }

    getById(id: string): Promise<IAPI_Response<EntityModel>> {
        return this.axiosTokenInstance.get(`/${this.crudBaseUrl}/v1/load/${id}`);
    }

    remove(id: string): Promise<IAPI_Response<void>> {
        return this.axiosTokenInstance.get(`/${this.crudBaseUrl}/v1/delete/${id}`);
    }

    create(data: EntityCreateModel): Promise<IAPI_Response<EntityModel>> {
        return this.axiosTokenInstance.post(`/${this.crudBaseUrl}/v1/create`, data);
    }

    update(data: EntityUpdateModel): Promise<IAPI_Response<EntityModel>> {
        return this.axiosTokenInstance.post(`/${this.crudBaseUrl}/v1/update`, data);
    }

}
