import React from 'react';
import { FacebookProvider, Page } from "react-facebook";

const Contact = () => {
    return (
        <div className="container page">
            <h1>Contact Us</h1>
            <p>You may message us through our Facebook Page or through our email address at projectpitutoring[at]gmail.com.</p>
            <FacebookProvider appId="1363704637070550">
                <Page href="https://www.facebook.com/ProjectPiTutoring" tabs="timeline" width="500" small-header="false" adapt-container-width="true" hide-cover="false" show-facepile="true" />
            </FacebookProvider>
        </div>
    );
}
 
export default Contact;