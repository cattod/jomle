import React from 'react';
import { Localization } from '../../../../../config/localization/localization';
import { CmpUtility } from '../../../../_base/CmpUtility';
import { NavLink } from "react-router-dom";

export class LayoutNoWrapNotFound extends React.PureComponent { // React.Component
    componentDidMount() {
        CmpUtility.gotoTop();
        document.title = Localization.page_not_found;
        document.body.classList.add('body-404');
    }
    componentWillUnmount() {
        document.title = Localization.app_title;
        document.body.classList.remove('body-404');
    }

    render() {
        return (
            <>
                <div>
                    <div className="error-header"></div>
                    <div className="container">
                        <section className="error-container text-center">
                            <h1>404</h1>
                            <div className="error-divider">
                                <h2>{Localization.page_not_found}</h2>
                                <p className="description">We Couldn’t Find This Page</p>
                            </div>
                            <NavLink to="/" className="return-btn text-capitalize" activeClassName="active">
                                <i className="fa fa-home"></i>{Localization.home}
                            </NavLink>
                        </section>
                    </div>
                </div>
            </>
        )
    }
}
