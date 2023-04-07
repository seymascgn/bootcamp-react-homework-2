import React, { useState } from 'react'
import { products } from '../data/products'

function ProductTable() {

    const [productList, setproductList] = useState(products);
    const [isAsc, setIsAsc] = useState(true);
    const [name, setname] = useState('')

    const deleteProduct = (id) => {

        let filteredProducts = productList.filter(q => q.id != id);
        setproductList([...filteredProducts])
    }

    const sortByName = () => {

        if (isAsc) {
            let sortedProducts = productList.sort((a, b) => a.name.localeCompare(b.name));
            setproductList([...sortedProducts]);

        }
        else {
            let sortedProducts = productList.sort((a, b) => b.name.localeCompare(a.name));
            setproductList([...sortedProducts]);

        }
        setIsAsc(!isAsc);
    }

    const sortById = () => {

        if (isAsc) {
            let sortedProducts = productList.sort((a, b) => a.id - b.id);
            setproductList([...sortedProducts]);
        }
        else {
            let sortedProducts = productList.sort((a, b) => b.id - a.id);
            setproductList([...sortedProducts]);

        }
        setIsAsc(!isAsc);
    }

    const search = (value) => {

        let filteredProducts = products.filter(q => q.name.toLowerCase().includes(value.toLowerCase()));
        setproductList([...filteredProducts]);
    }
    return (<>
        <div>
            <label>Search by Name</label>
            <input type='text' onChange={(e) => search(e.target.value)}></input>
        </div>
        <h1>Prpducts Length: {productList.length}</h1>
        <table className='w3-table w3-striped w3-border'>
            <thead>
                <tr>
                    <th style={{ cursor: 'pointer' }} onClick={() => sortById()}>Id</th>
                    <th style={{ cursor: 'pointer' }} onClick={() => sortByName()}>Name</th>
                    <th>Stock</th>
                    <th>Unit Price</th>
                    <th>Quantity Per Unit</th>
                </tr>
            </thead>
            <tbody>
                {
                    productList.map(item => {
                        if (item.unitsInStock > 0) {
                            return <tr style={{ backgroundColor: item.unitPrice > 20 ? 'red' : null }} key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.unitsInStock}</td>
                                <td>{item.unitPrice}</td>
                                <td>{item.quantityPerUnit}</td>
                                <td><button onClick={() => deleteProduct(item.id)} className='w3-button w3-red'>Delete</button></td>
                            </tr>
                        }

                    })
                }
            </tbody>
        </table>
        <button onClick={() => setproductList([])}>Delete All</button>
    </>
    )
}

export default ProductTable