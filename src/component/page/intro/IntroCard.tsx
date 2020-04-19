import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

interface IProps {
    card_img_url: string;
    card_img_alt: string;
    card_title: string;
    card_desc: string;
    card_cta_text: string;
    card_skip_link: string;
    card_skip_link_text: string;
    bulletsLength: number
    currentBullet: number
    handleNext: () => void
    handleClick: (i: number) => void
}
interface IState { }

class IntroCard extends React.Component<IProps, IState> {
    handleClick = (i: number) => {
        this.props.handleClick(i)
    }

    nextButton = () => {
        if (this.props.currentBullet === (this.props.bulletsLength - 1)) {
            return <NavLink
                to={this.props.card_skip_link}
                className="btn btn-main btn-block"
            >
                {this.props.card_cta_text}
            </NavLink>
        } else {
            return <button
                type="button"
                className="btn btn-main btn-block"
                onClick={this.props.handleNext}
            >
                {this.props.card_cta_text}
            </button>
        }
    }

    render() {
        const bullets: number[] = []
        for (let i = 0; i < this.props.bulletsLength; i++) {
            bullets.push(i)
        }

        return (
            <div className="intro-card">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg="4" md="8" xs="12">
                            <img src={this.props.card_img_url} alt={this.props.card_img_alt} />
                            <div className="bullet-band">
                                {
                                    bullets.map((x, i) => <button
                                        type="button"
                                        key={i}
                                        className={'bullet ' + (i === this.props.currentBullet ? ' is-active' : '')}
                                        onClick={() => this.handleClick(i)}
                                    />)
                                }
                            </div>
                            <h2>{this.props.card_title}</h2>
                            <p>{this.props.card_desc}</p>
                            {this.nextButton()}
                            <NavLink
                                to={this.props.card_skip_link}
                                className="skip-link"
                            >
                                {this.props.card_skip_link_text}
                            </NavLink>
                        </Col>
                    </Row >
                </Container>
            </div>
        )
    }
}

export default IntroCard