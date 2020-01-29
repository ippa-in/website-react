import React, { useEffect } from 'react';
import './admin.scss';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Header(props) {
    const { userInfo } = props;
    let wrapperRef = null;

    const [flyOutOpen, setflyOutOpen] = React.useState(false);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    })

    const setWrapperRef = node => {
        wrapperRef = node;
    };

    const handleClickOutside = evt => {
        if (
            wrapperRef &&
            !wrapperRef.contains(evt.target) &&
            flyOutOpen
        ) {
            setflyOutOpen(!flyOutOpen)
        }
    };

    const signOut = () => {
        localStorage.clear();
        sessionStorage.clear();
    }

    return (
        <div className="adHeader--container">
            <div></div>
            <div className="d-flex" ref={setWrapperRef}>
                <img className="mr-0-20 cur-pointer" src='/images/search-icon.svg' alt='search' />
                <img className="mr-0-20 cur-pointer" src='/images/notification-icon.svg' alt='notification' />
                <div style={{ position: 'relative' }}>
                    <div className='tabs d-flex align-center cur-pointer'
                        style={{ padding: "14px 20px" }}
                        onClick={() => setflyOutOpen(!flyOutOpen)}>
                        <img className='loggedInUser' src='/images/user_icon.png' alt='user_icon' />
                        {(userInfo.hasOwnProperty("name") && userInfo.name) || 'batman'} <ExpandMoreIcon />
                    </div>
                    <div className={flyOutOpen ? "flyout open" : "flyout"} onClick={signOut}>Sign Out</div>
                </div>
            </div>
        </div>
    );
}

Header.defaultProps = {
    userInfo: {},
}

export default Header;