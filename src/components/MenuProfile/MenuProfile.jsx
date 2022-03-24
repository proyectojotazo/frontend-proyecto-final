import React from 'react';

import './MenuProfile.scss';

function MenuProfile({ options, changeOption }) {
    return (
        <div className="menu-profile">
            <ul className="menu-lista">
                {options.map((item) => {
                    return (
                        <li
                            key={item}
                            className="menu-item"
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

export default MenuProfile;
