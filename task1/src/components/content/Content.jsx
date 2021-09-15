import React, { useState, useEffect } from 'react';

import './content.scss';

function Content(props) {
    const [text, setText] = useState('');
    const goalText = 'Content...';

    useEffect(() => {
        for (let i = 0; i < goalText.length; i++) {
            setTimeout(() => {
                setText((prevText) => prevText + goalText[i]);
            }, 2000 * i);
        }
    }, []);

    return (
        <div className="content">
            <span className="anim-typewriter">{ text }</span>
        </div>
    );
}

export default Content;
