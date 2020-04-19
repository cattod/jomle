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
import IntroCard from './IntroCard';
import AliceCarousel from 'react-alice-carousel'

interface IState {
    currentIndex: number
}

interface IProps {
    history: History;
    internationalization: TInternationalization;
}

class IntroComponent extends BaseComponent<IProps, IState> {
    state: IState = {
        currentIndex: 0
    }

    slideTo = (i: number) => this.setState({ currentIndex: i })

    onSlideChanged = (e: { item: number }) => this.setState({ currentIndex: e.item })

    slideNext = () => this.setState({ currentIndex: this.state.currentIndex + 1 })

    componentDidMount() {
        CmpUtility.gotoTop();
        document.title = Localization.intro;
    }

    componentWillUnmount() {
        document.title = Localization.app_title;
    }

    render() {
        const settings = {
            buttonsDisabled: true,
            dotsDisabled: true,
            slideToIndex: this.state.currentIndex,
            onSlideChanged: this.onSlideChanged,
            infinite: false,
            touchTrackingEnabled: true,
            mouseTrackingEnabled: true
        }
        return (
            <>
                {/* <div className="h1">intro</div>
                <NavLink to="home">back to home</NavLink> */}
                <div className="intro-wrapper">
                    <AliceCarousel {...settings}>
                        {Localization.intro_cards.map((card, index) => <IntroCard
                            {...card}
                            bulletsLength={Localization.intro_cards.length}
                            currentBullet={index}
                            key={index}
                            handleNext={this.slideNext}
                            handleClick={this.slideTo}
                        />
                        )}
                    </AliceCarousel>
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
