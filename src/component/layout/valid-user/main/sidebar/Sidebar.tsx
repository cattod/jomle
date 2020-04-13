import React from "react";
import { redux_state } from "../../../../../redux/app_state";
import { MapDispatchToProps, connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TInternationalization } from "../../../../../config/setup";
import { BaseComponent } from "../../../../_base/BaseComponent";
import { History } from "history";
import { ITheme_schema } from "../../../../../redux/action/theme/themeAction";

export interface IProps {
    internationalization: TInternationalization;
    history: History;
    theme: ITheme_schema;
}

class LayoutMainSidebarComponent extends BaseComponent<IProps, any>{

    render() {
        return (
            <>
                <div className="layout-main-sidebar-wrapper">
                    sidebar
                </div>
            </>
        )
    }
}

const dispatch2props: MapDispatchToProps<{}, {}> = (dispatch: Dispatch) => {
    return {
    }
}

const state2props = (state: redux_state) => {
    return {
        internationalization: state.internationalization,
        theme: state.theme,
    }
}

export const LayoutMainSidebar = connect(state2props, dispatch2props)(LayoutMainSidebarComponent);
