import React, { useState, useEffect } from "react";
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { TextField } from '@fluentui/react/lib/TextField';
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Depths } from '@fluentui/theme';
import './Search.css';

const tagsDropdownStyles = {
    dropdown: { width: 200 },
};

const sortDropdownStyles = {
    dropdown: { width: 130 },
};

const radiusDropdownStyles = {
    dropdown: { width: 130 },
};

const searchRadiusOptions = [
    { key: 8000, text: 5 },
    { key: 16000, text: 10 },
    { key: 24000, text: 15 },
    { key: 32000, text: 20 },
    { key: 40000, text: 25 },
];
const attributeOptions = [
    { key: 'hot_and_new', text: 'New and Popular' },
    { key: 'wheelchair_accessible', text: 'Wheelchair Accessible' },
];

const sortOptions = [
    { key: 'best_match', text: 'Best Match' },
    { key: 'distance', text: 'Distance' }
]

const pageLimitOptions = [
    { key: 10, text: '10' },
    { key: 20, text: '20' },
    { key: 30, text: '30' },
    { key: 40, text: '40' },
    { key: 50, text: '50' }
]

const geolocationOptions = {
    timeout: 5000,
    enableHighAccuracy: true,
    maximumAGe: 0
};

function SearchComponent({ updateParams, updateSearchResults }) {

    const [showAdvFilters, setShowAdvFilters] = useState(false);
    const [params, setParams] = useState({
        location: '',
        latitude: 0.0,
        longitude: 0.0,
        term: 'Search by keyword',
        radius: searchRadiusOptions[0].key,
        categories: '',
        locale: 'en_US',
        open_now: true,
        attributes: '',
        sort_by: sortOptions[0].key,
        limit: pageLimitOptions[0].key,
        offset: 0
    });

    useEffect(() => {
        function geolocationSuccess(pos) {
            const coords = pos.coords;

            setParams({ latitude: coords.latitude, longitude: coords.longitude });
            updateParams({ latitude: coords.latitude, longitude: coords.longitude });

            // get location using reverse geocoding
            fetch(`/api/v1/integrations/locationiq/reverse?lat=${coords.latitude}&lon=${coords.longitude}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setParams({ location: data['display_name'] });
                })
                .catch(error => console.warn(`ERROR(${error.code}): ${error.message}`));
        }

        function geolocationError(error) {
            console.warn(`ERROR(${error.code}): ${error.message}`);
        }

        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, geolocationOptions);

        // c
    }, []);

    const showAdvancedFilters = (event) => setShowAdvFilters(!showAdvFilters);

    const getSelectedSearchRadius = (event, option, index) => setParams({ ...params, radius: searchRadiusOptions[index].key });

    const handleOpenNowToggle = (event) => setParams({ ...params, open_now: !params.open_now });

    const getSelectedAttributes = (event, option, index) => {
        const selectedOption = attributeOptions[index].key;

        setParams({
            ...params,
            attributes: params.attributes ?
                (params.attributes.split(',').indexOf(selectedOption) >= 0 ? ''
                    : params.attributes.split(',').concat([selectedOption]).toString()
                ) : selectedOption
        });
    }

    const getSelectedSortBy = (event, option, index) => setParams({ ...params, sort_by: sortOptions[index].key });

    const getSelectedPageSize = (event, option, index) => setParams({ ...params, limit: pageLimitOptions[index].key });

    const getSearchString = (event, newValue) => setParams({ ...params, term: newValue });

    const handleSearchButtonClick = (event) => {
        setShowAdvFilters(!showAdvFilters);

        const queryParams = [];
        for (var param in params) {
            queryParams.push(encodeURIComponent(param) + '=' + encodeURIComponent(params[param]));
        }
        const query = queryParams.join('&');

        console.log('/api/v1/integrations/yelp/businesses?' + query);

        fetch('/api/v1/integrations/yelp/businesses?' + query)
            .then(res => res.json())
            .then(data => updateSearchResults(data))
            .catch(error => console.error('ECOMMERCE API ERROR: ', error));

    }

    return (
        <div className="fui-search">
            <TextField placeholder={params.term} onClick={showAdvancedFilters} onChange={getSearchString} />
            {showAdvFilters ? (
                <div
                    style={{ boxShadow: Depths.depth8 }}
                    className={showAdvFilters ? 'fui-show fui-dropdown-filters' : 'fui-hide fui-dropdown-filters'}
                >
                    <div className="w-full flex flex-row flex-wrap pl-2 pr-2">
                        <Dropdown
                            placeholder="Select"
                            label="Radius (miles)"
                            defaultSelectedKey={searchRadiusOptions[0].key}
                            // multiSelect
                            options={searchRadiusOptions}
                            styles={radiusDropdownStyles}
                            className="mr-2"
                            onChange={getSelectedSearchRadius}
                        />
                        <Dropdown
                            placeholder="Select"
                            label="Tags"
                            multiSelect
                            options={attributeOptions}
                            styles={tagsDropdownStyles}
                            className="mr-2"
                            onChange={getSelectedAttributes}
                        />
                        <Dropdown
                            placeholder="Select"
                            label="Sort"
                            defaultSelectedKey={sortOptions[0].key}
                            options={sortOptions}
                            styles={sortDropdownStyles}
                            className="mr-2"
                            onChange={getSelectedSortBy}
                        />
                        <Dropdown
                            placeholder="Select"
                            label="Page Size"
                            defaultSelectedKey={pageLimitOptions[0].key}
                            options={pageLimitOptions}
                            styles={radiusDropdownStyles}
                            className="mr-2"
                            onChange={getSelectedPageSize}
                        />
                        <DefaultButton
                            toggle
                            checked={params.open_now}
                            text='Open Now'
                            className={params.open_now ? 'fluent-ui__toggle_active mr-auto mt-auto' : 'mr-auto mt-auto'}
                            onClick={handleOpenNowToggle}
                        />
                    </div>
                    <div className="w-full flex flex-row pl-2 pr-2">
                        <DefaultButton
                            text="Search"
                            className="ml-auto mt-3"
                            onClick={handleSearchButtonClick}
                        />
                    </div>
                </div>
            ) : ''}
        </div>
    );
}

export default SearchComponent;