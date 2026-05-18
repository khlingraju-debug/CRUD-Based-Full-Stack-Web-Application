import { useState, useEffect } from "react";
import axios from "axios";

function About() {

  const [products, setProducts] = useState([]);

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  const [editId, setEditId] = useState(null);

  const [showForm, setShowForm] = useState(false);

  /* FETCH PRODUCTS */

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  /* ADD PRODUCT */

  async function addProduct() {

    if (productName === "" || description === "") {
      alert("Enter all fields");
      return;
    }

    const newProduct = {
      productName,
      description
    };

    try {

      const response = await fetch(
        "http://localhost:5000/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newProduct)
        }
      );

      const data = await response.json();

      setProducts([...products, data]);

      setProductName("");
      setDescription("");

      setShowForm(false);

    } catch (error) {
      console.log(error);
    }
  }

  /* DELETE PRODUCT */

  const deleteProduct = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/products/${id}`
      );

      const updatedProducts =
        products.filter(
          (product) => product._id !== id
        );

      setProducts(updatedProducts);

    } catch (error) {
      console.log(error);
    }
  };

  /* EDIT PRODUCT */

  function editProduct(product) {

    setProductName(product.productName);

    setDescription(product.description);

    setEditId(product._id);

    setShowForm(true);
  }

  /* UPDATE PRODUCT */

  async function updateProduct() {

    const updatedProduct = {
      productName,
      description
    };

    try {

      const response = await fetch(
        `http://localhost:5000/products/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedProduct)
        }
      );

      const data = await response.json();

      const updatedProducts = products.map((product) =>
        product._id === editId ? data : product
      );

      setProducts(updatedProducts);

      setProductName("");
      setDescription("");

      setEditId(null);

      setShowForm(false);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f9",
        padding: "30px",
        fontFamily: "Arial"
      }}
    >

      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}
      >
        <h1
          style={{
            color: "#0d5ea8"
          }}
        >
          Product Details
        </h1>

        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: "12px 25px",
            backgroundColor: "#0d5ea8",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Add Product
        </button>
      </div>

     {/* FORM */}

{
  showForm && (

    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "30px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}
    >

      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) =>
          setProductName(e.target.value)
        }
        style={{
          width: "100%",
          padding: "15px",
          marginBottom: "15px",
          fontSize: "18px",
          color: "black",
          backgroundColor: "rgb(252, 249, 249)",
          border: "1px solid #555",
          borderRadius: "5px"
        }}
      />

      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        style={{
          width: "100%",
          padding: "15px",
          height: "120px",
          marginBottom: "15px",
          fontSize: "18px",
          color: "black",
          backgroundColor: "rgb(252, 249, 249)",
          border: "1px solid #555",
          borderRadius: "5px"
        }}
      />

      {
        editId ? (
          <button
            onClick={updateProduct}
            style={{
              padding: "12px 20px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Update Product
          </button>
        ) : (
          <button
            onClick={addProduct}
            style={{
              padding: "12px 20px",
              backgroundColor: "#0d5ea8",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Save Product
          </button>
        )
      }

    </div>
  )
}

      {/* TABLE */}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "white",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >

        <thead
          style={{
            backgroundColor: "#0d5ea8",
            color: "white"
          }}
        >
          <tr>

            <th style={{ padding: "15px" }}>
              Product Name
            </th>

            <th style={{ padding: "15px" }}>
              Description
            </th>

            <th style={{ padding: "15px" }}>
              Actions
            </th>

          </tr>
        </thead>

        <tbody>

          {
            products.map((product) => (

              <tr
                key={product._id}
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid #ddd"
                }}
              >

                <td style={{ padding: "15px" }}>
                  {product.productName}
                </td>

                <td style={{ padding: "15px" }}>
                  {product.description}
                </td>

                <td style={{ padding: "15px" }}>

                  <button
                    onClick={() => editProduct(product)}
                    style={{
                      padding: "8px 15px",
                      backgroundColor: "orange",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "10px"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteProduct(product._id)
                    }
                    style={{
                      padding: "8px 15px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>
  );
}

export default About;