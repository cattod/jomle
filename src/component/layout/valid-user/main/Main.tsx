import React from 'react';
import { Route } from 'react-router-dom';
import { LayoutMainHeader } from './header/Header';
import { MapDispatchToProps, connect } from 'react-redux';
import { Dispatch } from 'redux';
import { redux_state } from '../../../../redux/app_state';
import { History } from "history";
// import { action_update_theme } from '../../../../redux/action/theme';
import { ITheme_schema } from '../../../../redux/action/theme/themeAction';
import { TInternationalization } from '../../../../config/setup';
import { BaseComponent } from '../../../_base/BaseComponent';
// import { LayoutMainSidebar } from './sidebar/Sidebar';

export const RouteLayoutMain = ({ component: Component, ...rest }: { [key: string]: any }) => {
    return (
        <Route {...rest} render={matchProps => (
            <LayoutMain {...matchProps}>
                <Component {...matchProps} />
            </LayoutMain>
        )} />
    )
};

interface IProps {
    history: History;
    match: any;
    internationalization: TInternationalization;
    theme: ITheme_schema;
    // update_theme?: (theme: ITheme_schema) => any;
}

interface IState {
}

class LayoutMainComponent extends BaseComponent<IProps, IState> {
    state = {
    }

    componentDidMount() {
    }
    componentWillUnmount() {
    }

    private themeClassName(): string {
        if (this.props.theme.isSidebarHide) return '';
        if (this.props.theme.sidebar === 'fixed') return 'sidebar-fixed';
        return '';
    }

    render() {
        return (
            <>
                <LayoutMainHeader {...this.props} />

                <div className={"container mt-5 position-relative " + this.themeClassName()}>
                    {this.props.children}
                </div>

                {/* <LayoutMainSidebar {...this.props} /> */}
            </>
        )
    }
}

const dispatch2props: MapDispatchToProps<{}, {}> = (dispatch: Dispatch) => {
    return {
        // update_theme: (theme: ITheme_schema) => dispatch(action_update_theme(theme)),
    }
}

const state2props = (state: redux_state) => {
    return {
        internationalization: state.internationalization,
        theme: state.theme,
    }
}

export const LayoutMain = connect(state2props, dispatch2props)(LayoutMainComponent);
