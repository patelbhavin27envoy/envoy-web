import React from 'react'
import {Link} from 'react-router'

import styles from './styles.module.css';

/* This suppose to be used for Navbar but it's not used right now */
export class Header extends React.Component {

    render() {
        <div className='topbar'>
            <Link className='logo' to="/"> <h1> LOCDET </h1> </Link>
            <span>
                Location Detective
            </span>
        </div>
    }
}

export default Header
