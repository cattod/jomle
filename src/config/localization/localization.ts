
import LocalizedStrings, { LocalizedStringsMethods } from 'react-localization';
import { Setup } from '../setup';
import { fa } from './fa';
import { en } from './en';

// interface ILocalization_tr {
//     [key: string]: string | ILocalization_tr;
// }

interface ILocalization extends LocalizedStringsMethods {
    [key: string]: any; // todo
    login: string;
    register: string;
    sign_in: string;
    Sign_out: string;
    app_title: string;
    app_title_: string;
    app_logo: string;
    brand_name: string;
    dashboard: string;
    user_manage: string;
    user: string;
    user_create: string;

    forgot_password: string;
    msg: {
        ui: {
            [key: string]: any; // todo
            msg1: string;
            msg2: string;
            msg3: string;
            msg4: string;

            no_network_connection: string;
            new_vesion_available_update: string;
            item_will_be_removed_continue: string;

            img_not_uploaded_max_size_n: string;
            one_img_upload_allowed_remove_existing_one: string;
            login_again: string;
            sync_error: string;

            change_password_successful: string;
        },
        back: {
            [key: string]: any; // todo
            signup_token_not_exists: string;
            invalid_signup_token: string;
            token_invalid: string;
            token_expired: string;
            delete_failed: string;
            get_failed: string;
            commit_failed: string;
            no_auth: string;
            invalid_username: string;
            invalid_enum: string;
            not_found: string;
            access_denied: string;
            missing_requiered_field: string;
            already_exists: string;
            invalid_password: string;
        }
    };
    validation: {
        minLength: string;
        mobileFormat: string;
        smsCodeFormat: string;
        confirmPassword: string;
        emailFormat: string;
        phoneFormat: string;
    },
    username: string;
    password: string;
    name: string;
    lastname: string;
    phone: string;
    address: string;
    mobile: string;
    email: string;
    confirm_password: string;
    old_password: string;
    new_password: string;
    confirm_new_password: string;
    invalid_value: string;
    required_field: string;
    Show_password: string;

    submit: string;
    in: string;
    second: string;
    search: string;
    home: string;
    more: string;

    loading_with_dots: string;
    retry: string;
    title: string;
    return: string;
    reset_password: string;
    log_out: string;
    sync: string;
    settings: string;
    info: string;
    Length: string;
    pages: string;
    description: string;
    language: string;
    follow: string;
    unfollow: string;
    see_more: string;
    see_less: string;
    format: string;

    all: string;
    of: string;
    from: string;
    to: string;
    agent: string;
    previous: string;
    next: string;
    no_item_found: string;

    load_more: string;

    remove: string;
    minute: string;
    hour: string;
    close: string;
    app_info: string;
    version: string;
    version_mode: string;
    trial_mode: string;
    trial: string;
    dont_want_now: string;
    update: string;
    shopping_cart: string;

    buy: string;
    price: string;
    total_price: string;
    recalculate: string;
    view_detail: string;
    cancel: string;
    ok: string;
    create: string;
    rename: string;
    download: string;
    downloading: string;
    add: string;
    selected: string;
    select_all: string;
    deselect_all: string;
    profile: string;
    profile_image: string;
    preview: string;
    drag_and_drop: string;
    choose_image: string;
    goto: string;
    go: string;
    page_not_found: string;
    detail: string;
    count: string;
    unit_price: string;
    type: string;
    text_size: string;
    theme: string;
    font: string;

    change_password: string;
    storage: string;
    state: string;
    confirm: string;
    clear: string;
    unknown: string;
    operating_system: string;
    browser: string;
    device: string;
    this_device: string;
    zoom: string;
    reload_app: string;


    intro: string;
}

export const Localization: ILocalization = new LocalizedStrings({
    fa: fa,
    en: en,
});

Localization.setLanguage(Setup.internationalization.flag);
