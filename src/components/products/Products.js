import React, { useState } from "react";
import SideNavigationComponent from "../navigation/side/SideNav";
import ProductComponent from "../product/Product";

function ProductsComponent(props) {
    // const [products, setProducts] = useState([]);

    // React.useEffect(() => {
    //     fetch('/api/v1/products')
    //         .then((response) => response.json())
    //         .then((data) => setProducts(data.slice(0,10)))
    //         .catch((error) => console.log(error));
    // }, []);

    // console.log(products.length);

    return (
        <div className="w-full flex flex-row flex-nowrap p-4">
            {/* <div className="w-1/6">
                <SideNavigationComponent />
            </div>
            <div className="w-5/6 flex flex-row flex-wrap">
                {products.length > 0 && (products.map(product => (
                    <ProductComponent product={product} />
                )))}
            </div> */}
        </div>
    );
}

export default ProductsComponent;