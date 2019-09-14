import ReactCardFlip from 'react-card-flip';
import FrontLessonCard from './FrontLessonCard';
import BackLessonCard from './BackLessonCard';
import React, { Component } from 'react';

class LessonCard extends Component {
    constructor() {
        super();
        this.state = {
            isFlipped: false,
            linearVariant: 'query'
        };
        this.handleClick = this.handleClick.bind(this);
        this.changeLinearStatus = this.changeLinearStatus.bind(this);
        // execute loaded status on card after ~1 second
        setTimeout(this.changeLinearStatus, 1500);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
    }

    changeLinearStatus() {
        this.setState({
            linearVariant: 'determinate'
        });
    }

    render() {
        return (
            <ReactCardFlip
                isFlipped={this.state.isFlipped}
                flipDirection="horizontal"
            >
                <FrontLessonCard
                    linearVariant={this.state.linearVariant}
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
