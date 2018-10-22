import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const Item = withRouter(({ to, item, outside, history }) => {
    return(
        <Button 
            icon={outside === false ? "folder" : "file pdf"} 
            content={item == null ? ('Other') : item} 
            primary
            onClick={() => {
                if (outside === false) history.push(to)
                else window.open(to);
            }}
            style={{textAlign: 'left'}} 
        />
    );
});
 
export default Item;