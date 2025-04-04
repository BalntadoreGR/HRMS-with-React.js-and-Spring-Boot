import React, { Fragment, useState } from 'react';
import { MenuItems } from './MenuItems';
import './Dropdown.css';
import { Link } from 'react-router-dom';

const Dropdown = () => {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <Fragment>
            <ul
                onClick={handleClick}
                className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
            >
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link
                                className={item.cName}
                                to={item.path}
                                onClick={() => setClick(false)}
                            >
                                {item.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </Fragment>
    );
}

export default Dropdown;