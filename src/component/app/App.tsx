import React from 'react';
import { TInternationalization } from '../../config/setup';
import { Localization } from '../../config/localization/localization';
import { BaseService } from '../../service/service.base';
import { MapDispatchToProps, connect } from 'react-redux';
import { Dispatch } from 'redux';
import { redux_state } from '../../redux/app_state';
import { BrowserRouter as Router, Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import { RouteLayoutValidUser } from '../layout/valid-user/ValidUser';
import { RouteLayoutAccount } from '../layout/account/Account';
import { Login } from '../page/login/Login';
import { Register } from '../page/register/Register';
import { AppInitService } from '../../service/service.app-init';

const appRoutes = (
  <HashRouter>
    <Switch>

      <Route exact path="/" component={() => <Redirect to="/home" />} />
      <RouteLayoutValidUser exact path="/home" />
      <RouteLayoutValidUser path="/profile" />
      <RouteLayoutValidUser path="/blank" />

      {/* <RouteLayoutValidUser path="/user/manage" /> */}
      {/* <RouteLayoutValidUser path="/user/create" /> */}
      
      {/* <RouteLayoutValidUser path="/contact/manage" /> */}
      {/* <RouteLayoutValidUser path="/contact/create" /> */}
      {/* <RouteLayoutValidUser path="/contact/update/:id" /> */}
      {/* <RouteLayoutValidUser path="/contact/copy/:id" /> */}

      <RouteLayoutValidUser path="/intro" />

      <RouteLayoutAccount path="/login" component={Login} />
      <RouteLayoutAccount path="/register" component={Register} />
      {/* <RouteLayoutAccount path="/forgot-password" component={ForgotPassword} /> */}

      <RouteLayoutValidUser />

    </Switch>
  </HashRouter>
);

interface IProps {
  internationalization: TInternationalization;
}
interface IState {
  showConfirmReloadModal: boolean;
}

class AppComponent extends React.Component<IProps, IState> {
  private _appInitService = new AppInitService();
  constructor(props: IProps) {
    super(props);

    Localization.setLanguage(props.internationalization.flag);
    document.title = Localization.app_title;

    if (props.internationalization.rtl) {
      document.body.classList.add('rtl');
    }

    BaseService.check_network_status();
  }

  render() {
    return (
      <>
        <Router>
          {appRoutes}
        </Router>
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
  }
}

export const App = connect(state2props, dispatch2props)(AppComponent);
