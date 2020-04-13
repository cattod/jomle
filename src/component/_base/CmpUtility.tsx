// import { IPerson } from "../../model/model.person";
import { Store2 } from "../../redux/store";
import { action_change_app_flag } from "../../redux/action/internationalization";
import { SAVE_PAGE_MODE } from "../../enum/other";
import { Setup } from "../../config/setup";

export type TSavePageActionBtn = 'remove' | 'create' | 'update';
export type ISavePageActionBtnMode = {
    [key in TSavePageActionBtn]: {
        visible: boolean;
        disable: boolean;
        loading: boolean;
    };
};

export abstract class CmpUtility {
    static file_pre_url = Setup.endpoint + '/general/v1/file';
    static image_pre_url = CmpUtility.file_pre_url;
    static defaultAvatarImagePath = "/static/media/img/icon/avatar.png";
    static avatarSizeImagePath = "/static/media/img/icon/avatar.png";
    static brokenAvatarImagePath = "/static/media/img/icon/broken-avatar.png";

    static getFileUrl(imageId: string): string {
        return CmpUtility.image_pre_url + '/' + imageId;
    }

    static getImageUrl(imageId: string): string {
        return CmpUtility.image_pre_url + '/' + imageId;
    }

    static imageOnError(e: any, defaultImagePath: string) {
        if (e.target.src !== window.location.origin + defaultImagePath) {
            e.target.src = defaultImagePath;
        }
    }

    static personImageOnError(e: any) {
        return CmpUtility.imageOnError(e, CmpUtility.brokenAvatarImagePath);
    }

    // static getPersonFullName(person: IPerson): string {
    //     let name = person.name || '';
    //     let last_name = person.last_name || '';
    //     name = name ? name + ' ' : '';
    //     return (name + last_name).trim();
    // }

    static personFullName(firstName: string | undefined, lastName: string | undefined): string {
        let fName = firstName || '';
        let lName = lastName || '';
        fName = fName ? fName + ' ' : '';
        return (fName + lName).trim();
    }

    static personAvatar(imageId: string | undefined): string {
        const img_path =
            (imageId && CmpUtility.getImageUrl(imageId))
            // imageId // TO_DO: mock only
            ||
            CmpUtility.defaultAvatarImagePath;
        // console.log('img_path', img_path);
        return img_path;
    }

    static gotoTop() {
        window.scrollTo(0, 0);
    }

    /**
     * render all cmp with dispatch action_change_app_flag.
     */
    static refreshView() {
        const int = { ...Store2.getState().internationalization };
        Store2.dispatch(action_change_app_flag(int));
    }

    static savePageActionBtnMode(obj: {
        saveMode: SAVE_PAGE_MODE,
        isFormValid: boolean,
        loading?: TSavePageActionBtn,
        invisible?: true
    }): ISavePageActionBtnMode {
        if (obj.saveMode === SAVE_PAGE_MODE.CREATE) {
            const cv = obj.invisible === true ? false : true;
            return {
                remove: { visible: false, disable: true, loading: false },
                create: { visible: cv, disable: !obj.isFormValid, loading: obj.loading === 'create' },
                update: { visible: false, disable: true, loading: false },
            }
        } else if (obj.saveMode === SAVE_PAGE_MODE.UPDATE) {
            const uv = obj.invisible === true ? false : true;
            return {
                remove: { visible: uv, disable: false, loading: obj.loading === 'remove' },
                create: { visible: false, disable: true, loading: false },
                update: { visible: uv, disable: !obj.isFormValid, loading: obj.loading === 'update' },
            }
        }

        return {
            remove: { visible: false, disable: true, loading: false },
            create: { visible: false, disable: true, loading: false },
            update: { visible: false, disable: true, loading: false },
        }
    }

}
