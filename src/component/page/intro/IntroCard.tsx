import React from 'react'
import { Container, Row, Col, Carousel } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

interface IProps {
    card_img_url: string;
    card_img_alt: string;
    card_title: string;
    card_desc: string;
    card_cta_text: string;
    card_skip_link: string;
    card_skip_link_text: string;
    bulletsLength?: number
    currentBullet?: number
    handleNext: () => void
}
interface IState { }

class IntroCard extends React.Component<IProps, IState> {
    render() {
        const bullets: number[] = []

        if (this.props.bulletsLength) {
            for (let i = 0; i < this.props.bulletsLength; i++) {
                bullets.push(i)
            }
        }

        return (
            <div className="intro-card">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg="4" md="8" xs="12">
                            <img src={this.props.card_img_url} alt={this.props.card_img_alt} />
                            <div className="bullet-band">
                                {
                                    bullets.map((x, i) => <div key={i} className={'bullet ' + (i === this.props.currentBullet ? ' is-active' : '')}></div>)
                                }
                            </div>
                            <h2>{this.props.card_title}</h2>
                            <p>{this.props.card_desc}</p>
                            <button
                                type="button"
                                className="btn btn-main btn-block"
                                onClick={this.props.handleNext}
                            >
                                {this.props.card_cta_text}
                            </button>
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