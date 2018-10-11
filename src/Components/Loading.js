import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
    return (
        <div className="loading">
            <center><ReactLoading type={'spin'} color={'#222f3e'} /></center>
        </div>
    );
}

export default Loading;