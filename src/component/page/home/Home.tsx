import React from 'react';
import { redux_state } from '../../../redux/app_state';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { BaseComponent } from '../../_base/BaseComponent';
import { TInternationalization } from '../../../config/setup';
import { History } from 'history';
import { NavLink } from 'react-router-dom';

interface IState {
}

interface IProps {
    history: History;
    internationalization: TInternationalization;
}

class HomeComponent extends BaseComponent<IProps, IState> {
    state: IState = {
    };

    render() {
        return (
            <>
                <div className="h3">version: {process.env.REACT_APP_VERSION}</div>

                <div>
                    <NavLink to="login">login</NavLink>
                    <div></div>
                    <NavLink to="register">register</NavLink>
                    <div></div>
                    <NavLink to="forget-password">forget-password</NavLink>
                    <div></div>
                    <NavLink to="intro">intro</NavLink>
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
    }
}

export const Home = connect(state2props, dispatch2props)(HomeComponent);
//#endregion