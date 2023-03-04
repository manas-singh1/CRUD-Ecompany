import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();

    }, []);
    const getProducts = async () => {
        console.log(products);
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
    }
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            //alert("record deleted");
            getProducts();//isliye taki getproduct wali api fir call ho jaye orr table update ho jaye
        }
    }
    const searchHandle = async (e) => {

        let search = e.target.value;
        if (search) {
            let result = await fetch(`http://localhost:5000/product/${search}`);
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        }
        else {
            getProducts();
        }
    }

    return (
        <div className="product-list">
            <h2>Product List</h2>
            <input className="searchbox" type="text" placeholder="Search Product" onChange={searchHandle}></input>
            <ul>
                <li>SNo.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Update/Delete</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button><Link className="anchor" to={"update/" + item._id}>Update</Link></button>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                        </li>
                    </ul>
                )
                    :
                    <h1>No Record Found</h1>
            }
        </div>
    )
}
export default ProductList;