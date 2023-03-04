import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params = useParams();
    const Navigate = useNavigate();
    useEffect(() => {
        console.log(params);
        getProductDetails();

    }, []);

    const getProductDetails = async () => {
        console.log(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }
    const updateProduct = async () => {
        console.log(name, price, category, company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "Put",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': "application/json"
            }
        });
        result = await result.json();
        console.log(result);
        Navigate('/');
    }
    return (
        <div className="su">
            <h2>Update Product</h2>
            <input className="inputBox" type="text" placeholder=" Product Name " value={name} onChange={(e) => { setName(e.target.value) }}></input>
            <input className="inputBox" type="text" placeholder=" Product Price" value={price} onChange={(e) => { setPrice(e.target.value) }}></input>
            <input className="inputBox" type="text" placeholder=" Product Category" value={category} onChange={(e) => { setCategory(e.target.value) }}></input>
            <input className="inputBox" type="text" placeholder=" Product Company" value={company} onChange={(e) => { setCompany(e.target.value) }}></input>
            <button onClick={updateProduct} type="button" className="subutton">Update</button>
        </div>
    )
}
export default UpdateProduct;