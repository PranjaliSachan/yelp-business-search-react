import React from "react";

function ProductComponent(props) {

    return (
        <div className="w-80 h-80 flex flex-col flex-nowrap m-2 p-2 border rounded">
            {/* <div className="text-base">{props.product.name}</div>
            <a className="text-sm" href={props.product.brand_url} target="_blank" rel="noreferrer">{props.product.brand}</a>
            <img src={props.product.image_url} alt="product" width="128px" height="128px" />
            <div className="text-sm">
                Originally: {props.product.raw_price} {props.product.currency},
                Price: {props.product.current_price} {props.product.currency}
            </div>
            <Button className="text-xl">Add to Cart</Button> */}
        </div>
    );   
}

export default ProductComponent;