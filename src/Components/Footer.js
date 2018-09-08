import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <img src="logo.png" alt="Project Pi Logo" className="logo" />
                            </div>
                            <div className="col-md-6">
                                <div className="fb-page" data-href="https://www.facebook.com/ProjectPiTutoring" data-tabs="timeline" data-width="500" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
                                    <blockquote cite="https://www.facebook.com/ProjectPiTutoring" className="fb-xfbml-parse-ignore">
                                        <a href="https://www.facebook.com/ProjectPiTutoring">Project Pi</a>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;