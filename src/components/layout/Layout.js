import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import TopNavigationComponent from '../navigation/top/Nav';

function LayoutComponent({ updateParams, updateSearchResults }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            <TopNavigationComponent isLoggedIn={isLoggedIn} updateParams={updateParams} updateSearchResults={updateSearchResults} />
            {/* <Link to="/product">Product</Link> */}
            <Outlet />
        </div>
    );
}

export default LayoutComponent;