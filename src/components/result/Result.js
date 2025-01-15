import React, { useEffect, useState } from "react";
import { ImageFit } from "@fluentui/react";
import { Icon } from '@fluentui/react/lib/Icon';
import { DocumentCard, DocumentCardPreview, DocumentCardTitle } from "@fluentui/react";

function ResultComponent({ result }) {

    const [previewProps, updatePreviewProps] = useState({
        previewImages: [
            {
                name: 'store name',
                linkProps: {
                    href: 'https://www.yelp.com',
                    target: '_blank'
                },
                previewImageSrc: '',
                iconSrc: '',
                imageFit: ImageFit.cover,
                width: 318,
                height: 196
            }
        ]
    });

    useEffect(() => {
        updatePreviewProps({
            previewImages: [
                {
                    name: result.name,
                    linkProps: {
                        href: result.url,
                        target: '_blank'
                    },
                    previewImageSrc: result.image_url,
                    iconSrc: '',
                    imageFit: ImageFit.cover,
                    width: 318,
                    height: 196
                }
            ]
        });
    }, []);

    const onActionClick = (e) => {
        console.log(`You clicked the ${e.target} action`);
        e.stopPropagation();
        e.preventDefault();
    };

    return (
        <div className="mr-auto ml-auto mt-3 mb-3">
            <DocumentCard
                aria-label={result.alias}
                onClickHref={result.url}
            >
                <DocumentCardPreview {...previewProps} />
                <DocumentCardTitle
                    title={result.name}
                    shouldTruncate
                />
                <DocumentCardTitle
                    title={
                        result.location.address1 + ' '
                        + result.location.address2 + ' '
                        + result.location.address3 + ', '
                        + result.location.city + ', '
                        + result.location.state + ' '
                        + result.location.zip_code}
                    shouldTruncate
                    showAsSecondaryTitle
                />
                <div className="w-full flex flex-auto p-3">
                    <div className="text-sm text-gray-500 m-auto">
                        <Icon iconName="Phone" /> {result.phone}
                    </div>
                    <div className="text-sm text-gray-500 m-auto">
                        <Icon iconName="FavoriteStar" /> {result.rating + '/' + 5}
                    </div>
                    <div className="text-sm text-gray-500 m-auto">
                        <a href="https://yelp.com" target="_blank" onClick={onActionClick}>
                            <Icon iconName="Comment" /> {result.review_count} Reviews
                        </a>
                    </div>
                </div>
            </DocumentCard>
        </div>
    );
}

export default ResultComponent;