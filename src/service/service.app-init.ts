import { BaseService } from './service.base';

export class AppInitService extends BaseService {
    constructor() {
        super();
        this.init();
    }

    init() {
        // debugger;
        let newVersion = process.env.REACT_APP_VERSION || '';
        let oldVersion = localStorage.getItem('app-version') || '';
        this.onUpgrade(oldVersion, newVersion);
        localStorage.setItem('app-version', newVersion);
    }

    private onUpgrade(appOldVersion: string, appNewVersion: string) {
        if (appOldVersion && appNewVersion && (appOldVersion !== appNewVersion)) {
            // debugger;
            // console.log('update if you want, app version: ' + appNewVersion);
        }
    }
}
