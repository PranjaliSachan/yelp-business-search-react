import React from 'react';
import SearchComponent from '../../functional-ui/search/Search';

function TopNavigationComponent({ isLoggedIn, updateParams, updateSearchResults }) {

    return (
        <div className='w-full flex flex-col'>
            <div className='w-full flex flex-row mt-2 mb-2'>
                <div className='w-4/12 flex flex-row'>
                    <div className='fui-text-display3 mr-auto ml-auto flex flex-row justify-start items-center'>
                        <img src='/logo.png' width='48' height='38' alt='yelp logo'/>
                        <div>Yelp Search</div>
                    </div>
                </div>
                <div className='w-4/12 flex flex-row justify-center items-center'>
                    <SearchComponent updateParams={updateParams} updateSearchResults={updateSearchResults} />
                </div>
                <div className='w-4/12 flex flex-row'>
                    <div className='ml-auto mr-3'>
                        {/* Account */}
                    </div>
                    <div className='ml-3 mr-auto'>
                        {/* Cart */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopNavigationComponent;