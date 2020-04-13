import React from 'react';
import { MapDispatchToProps, connect } from 'react-redux';
import { Dispatch } from 'redux';
import { redux_state } from '../../../redux/app_state';
import { IUser } from '../../../model/model.user';
import { History } from "history";
import { BrowserRouter as Router, Route, Switch, Redirect, HashRouter } from 'react-router-dom';
// import { Dashboard } from '../../page/dashboard/Dashboard';
import { Profile } from '../../page/profile/Profile';
import { RouteLayoutMain } from './main/Main';
import { Blank } from '../../page/blank/Blank';
import { LayoutNoWrapNotFound } from './no-wrap/not-found/NotFound';
import { RouteLayoutNoWrap } from './no-wrap/NoWrap';
import { Home } from '../../page/home/Home';

const appValidUserRoutes = (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={() => <Redirect to="/home" />} />
            <RouteLayoutMain exact path="/home" component={Home} />
            <RouteLayoutMain path="/profile" component={Profile} />
            <RouteLayoutMain path="/blank" component={Blank} />

            {/* <RouteLayoutMain path="/user/manage" component={UserManage} /> */}
            {/* <RouteLayoutMain path="/user/create" component={UserSave} /> */}
            {/* <RouteLayoutMain path="/artist/manage" component={ArtistManage} />
            <RouteLayoutMain path="/artist/create" component={ArtistSave} />
            <RouteLayoutMain path="/artist/update/:id" component={ArtistSave} />
            <RouteLayoutMain path="/artist/copy/:id" component={ArtistSave} />
            <RouteLayoutMain path="/artwork/manage" component={ArtworkManage} />
            <RouteLayoutMain path="/artwork/create" component={ArtworkSave} />
            <RouteLayoutMain path="/artwork/update/:id" component={ArtworkSave} />
            <RouteLayoutMain path="/artwork/copy/:id" component={ArtworkSave} />
            <RouteLayoutMain path="/contact/manage" component={ContactManage} />
            <RouteLayoutMain path="/contact/create" component={ContactSave} />
            <RouteLayoutMain path="/contact/update/:id" component={ContactSave} />
            <RouteLayoutMain path="/contact/copy/:id" component={ContactSave} />
            <RouteLayoutMain path="/invoice/manage" component={InvoiceManage} /> */}

            {/* keep "cmp LayoutNoWrapNotFound" last */}
            <RouteLayoutNoWrap component={LayoutNoWrapNotFound} />
        </Switch>
    </HashRouter>
);

export const RouteLayoutValidUser = ({ ...rest }: { [key: string]: any }) => {
    return (
        <Route {...rest} render={matchProps => (
            <LayoutValidUser {...matchProps} />
        )} />
    )
};

interface IProps {
    logged_in_user: IUser | null;
    history: History;
    match: any;
}

class LayoutValidUserComponent extends React.Component<IProps> {

    componentDidMount() {
        if (!this.props.logged_in_user) {
            // this.props.history.push("/login");
        } else {
        }
    }

    componentWillUnmount() {
    }

    // shouldComponentUpdate() {
    //     // debugger;
    //     if (!this.props.logged_in_user) {
    //         this.props.history.push("/login");
    //         return false;
    //     }
    //     return true;
    // }

    render() {
        // if (!this.props.logged_in_user) {
        //     return (
        //         <div></div>
        //     );
        // }
        return (
            <>
                <Router>{appValidUserRoutes}</Router>
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
        logged_in_user: state.logged_in_user,
    }
}

export const LayoutValidUser = connect(state2props, dispatch2props)(LayoutValidUserComponent);
