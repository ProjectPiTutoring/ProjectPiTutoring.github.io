import React, { Component } from 'react';

class About extends Component {
    constructor() {
        super();
        this.state = {
            whoweare: false,
            ourvision: false,
            ourmission: false,
            ourgoal: false,
            faqbegin: false,
            faqservice: false,
            faqfree: false
        }
    }
    toggleArea(id) {
        if (this.state[id] === false) this.setState({[id]: 'true'});
        else this.setState({[id]: false});
    };
    render() {
        return (
            <div className="container page">
                <h1>About Us</h1>
                <p>Project π combines Mathematics and the accessibility of social media to create a unique learning experience. We offer various media forms as well as a responsive messaging service in order to ensure quick, efficient assistance for those in need of it.</p>
                <a onClick={this.toggleArea.bind(this, 'whoweare')}><h3>Who we are:</h3></a>
                {this.state.whoweare && (<p>Project Pi is spearheaded by a handful of senior high school students who live and breathe Mathematics in their day-to-day lives. Our passion for the subject is something we strive to impart on others, and Project Pi is our means of achieving precisely that. </p>)}
                <a onClick={this.toggleArea.bind(this, 'ourvision')}><h3>Our Vision:</h3></a>
                {this.state.ourvision && (<p>A world where students are driven to learn Mathematics outside of the classroom without any external incentives. </p>)}
                <a onClick={this.toggleArea.bind(this, 'ourmission')}><h3>Our Mission:</h3></a>
                {this.state.ourmission && (<p>To educate students in need and provide completely free assistance in understanding various mathematical concepts and problems via social media.</p>)}
                <a onClick={this.toggleArea.bind(this, 'ourgoal')}><h3>Our Goal:</h3></a>
                {this.state.ourgoal && (<p>To expand our services such as consultations, reviewers, and worksheets to different schools, sectors, and communities across the Philippines, with a worldwide audience to hopefully follow suite. </p>)}
                <h1>FAQ</h1>
                <a onClick={this.toggleArea.bind(this, 'faqbegin')}><h3>How did Project Pi begin?</h3></a>
                {this.state.faqbegin && (<p>Project Pi began as an avenue to provide consultation services to members of the home school’s International Baccalaureate program that needed help in Math outside of class hours. It later offered reviewers and worksheets for those who requested for additional assistance.</p>)}
                <a onClick={this.toggleArea.bind(this, 'faqservice')}><h3>How can we trust on your reliability as a service?</h3></a>
                {this.state.faqservice && (<p>The Project Pi team is largely composed of students who have taken an advanced class in Mathematics. Several of its members are projected to be recipients of the IB Diploma Programme, a fraction of which pursue Mathematics HL and score decently well, and some have also competed in major mathematics contests internationally. Moreover, each reviewer is given a quality check by various members to ensure accuracy.</p>)}
                <a onClick={this.toggleArea.bind(this, 'faqfree')}><h3>How free is free?</h3></a>
                {this.state.faqfree && (<p>Project Pi is a completely volunteer and informally non-profit service. Worksheets and reviewers plus private discussions are free of charge to anyone. We will, however, accept donations in order to improve our services, advertise to a wider audience, and facilitate a better online learning environment.</p>)}
            </div>
        );
    }
}

export default About;