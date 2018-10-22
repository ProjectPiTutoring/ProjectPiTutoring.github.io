import React from 'react';
import { Message } from 'semantic-ui-react';

const NotFound = () => {
    return (
        <Message 
            icon="warning sign"
            color="brown"
            header="This feature is in beta."
            content="Please take precaution while using this feature as this fearture is still in beta. Thus, bugs may occur. If you have any difficulties with using this feature, please do not hesitate to contact us over at our Facebook Page. Thank you!"
        />
    );
}

export default NotFound;