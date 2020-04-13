import { BaseService, IAPI_Response } from "./service.base";

export class UploadService extends BaseService {

    upload(file: File): Promise<IAPI_Response<string>> { // IAPI_ResponseList
        this.axiosTokenInstance.defaults.headers['Content-Type'] = 'multipart/form-data';

        let bodyFormData = new FormData();
        bodyFormData.append('file', file);
        // files.forEach(f => {
        //     bodyFormData.append('file', f); // files
        // });

        return this.axiosTokenInstance.post('/general/v1/upload-file', bodyFormData);
    }
}
