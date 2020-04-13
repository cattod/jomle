import React from 'react';
import { redux_state } from '../../../redux/app_state';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { BaseComponent } from '../../_base/BaseComponent';
import { TInternationalization } from '../../../config/setup';
import { History } from 'history';
import { NavLink } from 'react-router-dom';
import { CmpUtility } from '../../_base/CmpUtility';
import { Localization } from '../../../config/localization/localization';

interface IState {
}

interface IProps {
    history: History;
    internationalization: TInternationalization;
}

class IntroComponent extends BaseComponent<IProps, IState> {
    state: IState = {
    };
    componentDidMount() {
        CmpUtility.gotoTop();
        document.title = Localization.intro;
    }
    componentWillUnmount() {
        document.title = Localization.app_title;
    }

    render() {
        return (
            <>
                <div className="intro-wrapper">
                    <div className="h1">intro</div>
                    <NavLink to="home">back to home</NavLink>
                </div>
            </>
        )
    }
}

const state2props = (state: redux_state) => {
    return {
        internationalization: state.internationalization,
    }
}
const dispatch2props = (dispatch: Dispatch) => { return {} };
export const Intro = connect(state2props, dispatch2props)(IntroComponent);
