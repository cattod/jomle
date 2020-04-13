import Axios, { AxiosInstance, AxiosRequestConfig, CancelTokenSource } from 'axios';
import { Setup } from '../config/setup';
import { IToken } from '../model/model.token';
import { Store2 } from '../redux/store';
import { action_set_token } from '../redux/action/token';
import { Utility } from '../asset/script/utility';
import { NETWORK_STATUS } from '../enum/NetworkStatus';
import { action_set_network_status } from '../redux/action/netwok-status';

export interface IAPI_ResponseList<T> {
    data: {
        data: { result: T[]; pagination: { size: number; page: number; total: number; } };
        error: any;
    };
}
export interface IAPI_Response<T> {
    data: { data: T; error: any; };
}

export abstract class BaseService {
    baseURL = Setup.endpoint;
    private static token: IToken | null | undefined;

    axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = Axios.create(this.axiosRequestConfig);
    }

    private _axiosRequestConfig: AxiosRequestConfig = {
        baseURL: this.baseURL,
        headers: { 'Content-Type': 'application/json' }
    };
    set axiosRequestConfig(config: AxiosRequestConfig) {
        if (config.headers) {
            config.headers = { ...this._axiosRequestConfig.headers, ...config.headers };
        }
        this._axiosRequestConfig = { ...this._axiosRequestConfig, ...config };
    }
    get axiosRequestConfig() {
        return this._axiosRequestConfig;
    }

    get axiosTokenInstance(): AxiosInstance {
        let newAX_instance: AxiosInstance;

        let token = BaseService.token;
        if (!BaseService.token || !BaseService.token.id_token) {
            token = Store2.getState().token;
            if (token) BaseService.setToken(token);
        }
        if (token && token.id_token) {
            this.axiosRequestConfig = { headers: { 'authorization': 'Bearer ' + token.id_token } };
            newAX_instance = Axios.create(this.axiosRequestConfig);
        } else {
            newAX_instance = this.axiosInstance;
        }
        this.set_401_interceptors(newAX_instance);
        return newAX_instance;
    }

    private static setToken(t: IToken) {
        BaseService.token = t;
    }

    static removeToken() {
        BaseService.token = undefined;
    }

    set_401_interceptors(ax_instance: AxiosInstance) {
        ax_instance.interceptors.response.use((response) => {
            return response;
        }, async (error) => {
            const persistedAuth = Store2.getState().authentication;
            if (
                !error.response
                || (error.response && error.response.status !== 401)
                || !persistedAuth
            ) {
                return Promise.reject(error);
            }

            const authObj = Utility.get_decode_auth(persistedAuth)
            const tokenRes: IAPI_Response<IToken> | undefined = await this.getTokenfromServer(authObj)
                .catch((error) => {
                    if (error.response.data.msg === "invalid_username") {
                        error.response.data['msg_ui'] = 'login_again';
                    }
                    return new Promise((resolve, reject) => {
                        reject(error);
                    });
                });

            if (tokenRes) {
                Store2.dispatch(action_set_token(tokenRes.data.data));
                BaseService.setToken(tokenRes.data.data);

                const config = error.config;
                config.headers['authorization'] = `Bearer ${tokenRes.data.data.id_token}`;

                return new Promise((resolve, reject) => {
                    Axios.request(config).then(response => {
                        resolve(response);
                    }).catch((error) => {
                        reject(error);
                    })
                });
            }
        });
    }

    getTokenfromServer(data: { username: string, password: string }): Promise<IAPI_Response<IToken>> {
        // let username_password_str = data.username + ":" + data.password; // + 'test';
        // let hash = btoa(unescape(encodeURIComponent(username_password_str)));
        // let basic = "Basic " + hash;

        const instance = Axios.create({
            baseURL: this.baseURL,
            // headers: { 'Content-Type': 'application/json', 'Authorization': basic }
        });

        return instance.post('/authenticate/v1/login', {
            password: data.password,
            rememberMe: true,
            username: data.username
        });
    }


    static msgRequestCanceled = 'request-canceled';
    static cancelTokenSource(): CancelTokenSource {
        return Axios.CancelToken.source();
    }

    static isAppOffline(): boolean {
        BaseService.check_network_status();
        return BaseService._isAppOffline();
    }

    private static _isAppOffline(): boolean {
        if (navigator && !navigator.onLine) {
            return true;
        }
        return false;
    }

    static check_network_status() {
        if (Store2.getState().network_status === NETWORK_STATUS.ONLINE) {
            if (BaseService._isAppOffline()) {
                Store2.dispatch(action_set_network_status(NETWORK_STATUS.OFFLINE));
            }

        } else if (Store2.getState().network_status === NETWORK_STATUS.OFFLINE) {
            if (!BaseService._isAppOffline()) {
                Store2.dispatch(action_set_network_status(NETWORK_STATUS.ONLINE));
            }
        }
    }

}
