import React from 'react';
import { MapDispatchToProps, connect } from 'react-redux';
import { Dispatch } from 'redux';
import { redux_state } from '../../../../../redux/app_state';
import { History } from "history";
// import { NETWORK_STATUS } from '../../../../../enum/NetworkStatus';
import { IUser } from '../../../../../model/model.user';
// import { CmpUtility } from '../../../../_base/CmpUtility';
// import { NavLink } from "react-router-dom";
// import { Localization } from '../../../../../config/localization/localization';
// import { Dropdown, Navbar, Nav } from 'react-bootstrap';
import { TInternationalization } from '../../../../../config/setup';
import { BaseComponent } from '../../../../_base/BaseComponent';
// import { CmpUtility } from '../../../../_base/CmpUtility';
import { ITheme_schema } from '../../../../../redux/action/theme/themeAction';
// import { action_update_theme } from '../../../../../redux/action/theme';

interface IProps {
    history: History;
    match: any;
    // network_status: NETWORK_STATUS;
    logged_in_user: IUser | null;
    internationalization: TInternationalization;
    theme: ITheme_schema;
    // update_theme?: (theme: ITheme_schema) => any;
}
interface IState {
}

class LayoutMainHeaderComponent extends BaseComponent<IProps, IState> {
    state = {
    }

    private logout() {
        this.onApplogout(this.props.history);
    }

    // private toggleCompactSidebar() {
    //     if (!this.props.update_theme) return;
    //     if (this.props.theme.sidebar === 'compact') {
    //         this.props.update_theme({ ...this.props.theme, sidebar: 'default', isSidebarHide: false });
    //     } else {
    //         this.props.update_theme({ ...this.props.theme, sidebar: 'compact', isSidebarHide: false });
    //     }
    // }

    private themeClassName(): string {
        if (this.props.theme.isSidebarHide) return '';
        if (this.props.theme.sidebar === 'fixed') return 'sidebar-fixed';
        return '';
    }

    render() {
        // const logged_in_user = this.props.logged_in_user;
        // const username = logged_in_user ? logged_in_user.username : '';
        // const fullname = logged_in_user ? CmpUtility.personFullName(logged_in_user.firstName, logged_in_user.lastName) : '';
        // const email = logged_in_user ? logged_in_user.email : '';

        return (
            <>
                header
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
        // network_status: state.network_status,
        logged_in_user: state.logged_in_user,
        theme: state.theme,
    }
}

export const LayoutMainHeader = connect(state2props, dispatch2props)(LayoutMainHeaderComponent);
