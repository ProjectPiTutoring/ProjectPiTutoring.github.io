import React from 'react';

const Contact = () => {
    return (
        <div className="container">
            <h1>Contact Us</h1>
            <p>You may message us through our Facebook Page.</p>
            <div className="fb-page" data-href="https://www.facebook.com/ProjectPiTutoring" data-tabs="timeline" data-width="500" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
                <blockquote cite="https://www.facebook.com/ProjectPiTutoring" className="fb-xfbml-parse-ignore">
                    <a href="https://www.facebook.com/ProjectPiTutoring">Project Pi</a>
                </blockquote>
            </div>
        </div>
    );
}
 
export default Contact;