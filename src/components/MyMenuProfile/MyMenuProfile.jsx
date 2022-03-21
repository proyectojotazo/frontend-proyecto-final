import React from 'react';

import './MyMenuProfile.scss';

function MyMenuProfile({ options, changeOption }) {
    return (
        <div className="mymenu-profile">
            <ul className="mymenu-lista">
                {options.map((item) => {
                    return (
                        <li
                            key={item}
                            className="mymenu-item"
                            onClick={() => changeOption(item)}
                        >
                            {item}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default MyMenuProfile;
