import { Action } from "redux";
import { EACTIONS } from "../../ActionEnum";

export interface ITheme_schema {
    sidebar: 'fixed' | 'overlay';
    isSidebarHide: boolean;
}

export interface IThemeAction extends Action<EACTIONS> {
    payload: ITheme_schema | null;
}