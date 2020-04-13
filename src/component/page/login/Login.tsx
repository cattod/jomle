import React from 'react';
import { LoginService } from '../../../service/service.login';
import { Input } from '../../form/input/Input';
import { redux_state } from '../../../redux/app_state';
import { Dispatch } from 'redux';
import { IUser } from '../../../model/model.user';
import { action_user_logged_in } from '../../../redux/action/user';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Localization } from '../../../config/localization/localization';
import { BtnLoader } from '../../form/btn-loader/BtnLoader';
import { BaseComponent } from '../../_base/BaseComponent';
import { TInternationalization } from '../../../config/setup';
import { IToken } from '../../../model/model.token';
import { action_set_token } from '../../../redux/action/token';
import { History } from 'history';
import { action_set_authentication } from '../../../redux/action/authentication';
import { Utility } from '../../../asset/script/utility';

type inputType = 'username' | 'password';

interface IState {
    username: {
        value: string | undefined;
        isValid: boolean;
    };
    password: {
        value: string | undefined;
        isValid: boolean;
    };
    isFormValid: boolean;
    btnLoader: boolean;
}
interface IProps {
    onUserLoggedIn: (user: IUser) => void;
    history: History;
    internationalization: TInternationalization;
    onSetToken: (token: IToken) => void;
    onSetAuthentication: (auth: string) => void;
}

class LoginComponent extends BaseComponent<IProps, IState> {
    state: IState = {
        username: { value: undefined, isValid: false },
        password: { value: undefined, isValid: false },
        isFormValid: false,
        btnLoader: false
    };
    private _loginService = new LoginService();

    private async onLogin() {
        if (!this.state.isFormValid) { return; }
        this.setState({ ...this.state, btnLoader: true });
        // debugger;
        let authObj = {
            username: this.state.username.value!,
            password: this.state.password.value!
        }
        let res_token = await this._loginService.login(authObj).catch((error) => {
            this.handleError({ error: error.response, toastOptions: { toastId: 'login_error' } });
            this.setState({ ...this.state, btnLoader: false });
        });

        let res_user;

        if (res_token) {
            // debugger;
            this.props.onSetAuthentication(Utility.get_encode_auth(authObj));
            this.props.onSetToken(res_token.data.data);
            // this._loginService.setToken(res_token.data);

            res_user = await this._loginService.profile().catch((error) => {
                this.handleError({ error: error.response, toastOptions: { toastId: 'login_error' } });
            });
        }

        this.setState({ ...this.state, btnLoader: false });

        if (res_user) {
            this.props.onUserLoggedIn(res_user.data.data);
            this.props.history.push('/home');
        }
    }

    private handleInputChange(val: any, isValid: boolean, inputType: inputType) {
        let otherInputType: inputType = 'username';
        if (inputType === 'username') {
            otherInputType = 'password';
        }
        const isFormValid = this.state[otherInputType].isValid && isValid;
        this.setState({ ...this.state, [inputType]: { value: val, isValid }, isFormValid });
    }

    private handle_keyUp(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            if (!this.state.isFormValid || this.state.btnLoader) return;
            this.onLogin();
        }
    }

    render() {
        return (
            <>
                <div className="login-wrapper animated fadeInDown">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-4 offset-lg-4 col-md-8 offset-md-2">
                                <div className="row login-box">
                                    <div className="col-12 text-center">
                                        <div className="login-title">jomle</div>
                                    </div>
                                    <div className="col-12 text-center mb-3 mt-n2">
                                        <div className="text-uppercase text-muted">sign in to dashboard</div>
                                    </div>
                                    <div className="col-12">
                                        <Input
                                            defaultValue={this.state.username.value}
                                            onChange={(val, isValid) => { this.handleInputChange(val, isValid, 'username') }}
                                            required
                                            placeholder={'USERNAME'}
                                            onKeyUp={(e) => this.handle_keyUp(e)}
                                            className="input-lg"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <Input
                                            defaultValue={this.state.password.value}
                                            onChange={(val, isValid) => { this.handleInputChange(val, isValid, 'password') }}
                                            required
                                            type="password"
                                            placeholder={'PASSWORD'}
                                            onKeyUp={(e) => this.handle_keyUp(e)}
                                            className="input-lg"
                                        />
                                    </div>

                                    <div className="col-12 text-center mt-1">
                                        <BtnLoader
                                            btnClassName="login-btn btn btn-lg btn-primary text-uppercase min-w-150px"
                                            loading={this.state.btnLoader}
                                            onClick={() => this.onLogin()}
                                            disabled={!this.state.isFormValid}
                                        >
                                            {Localization.sign_in}
                                        </BtnLoader>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ToastContainer {...this.getNotifyContainerConfig()} />
            </>
        )
    }
}

//#region redux
const state2props = (state: redux_state) => {
    return {
        internationalization: state.internationalization,
    }
}

const dispatch2props = (dispatch: Dispatch) => {
    return {
        onUserLoggedIn: (user: IUser) => dispatch(action_user_logged_in(user)),
        onSetToken: (token: IToken) => dispatch(action_set_token(token)),
        onSetAuthentication: (auth: string) => dispatch(action_set_authentication(auth))
    }
}

export const Login = connect(state2props, dispatch2props)(LoginComponent);
//#endregion