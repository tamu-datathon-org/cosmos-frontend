import ReactCardFlip from 'react-card-flip';
import FrontLessonCard from './FrontLessonCard';
import BackLessonCard from './BackLessonCard';
import React, { Component } from 'react';

class LessonCard extends Component {
    constructor() {
        super();
        this.state = {
            isFlipped: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
    }

    render() {
        return (
            <ReactCardFlip
                isFlipped={this.state.isFlipped}
                flipDirection="horizontal"
            >
                <FrontLessonCard
                    lesson={this.props.lesson}
                    key="front"
                    handleClick={this.handleClick}
                />
                <BackLessonCard
                    lesson={this.props.lesson}
                    key="back"
                    handleClick={this.handleClick}
                />
            </ReactCardFlip>
        );
    }
}

export default LessonCard;
