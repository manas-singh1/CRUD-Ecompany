import React from "react";

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState('');
    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true)
            return (
                alert("enter valid details")
            );
        }
        console.log(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        //console.log(userId._id);
        let result = await fetch('http://localhost:5000/addProduct', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.log(result);
    }
    return (
        <div className="su">
            <h2>Add Product</h2>
            <input className="inputBox" type="text" placeholder="Enter Product Name " value={name} onChange={(e) => { setName(e.target.value) }}></input>
            <input className="inputBox" type="text" placeholder="Enter Product Price" value={price} onChange={(e) => { setPrice(e.target.value) }}></input>
            <input className="inputBox" type="text" placeholder="Enter Product Category" value={category} onChange={(e) => { setCategory(e.target.value) }}></input>
            <input className="inputBox" type="text" placeholder="Enter Product Company" value={company} onChange={(e) => { setCompany(e.target.value) }}></input>
            <button onClick={addProduct} type="button" className="subutton">Add</button>
        </div>
    )
}
export default AddProduct;