import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Delete = () => {
    axios.defaults.withCredentials = true;

    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        await axios.delete(`/api/resources/${id}`);

        navigate("/resources");
    };

    return (
        <div className="container">
            <h1>Delete Resource</h1>

            <hr className="my-3" />

            <div className="d-flex flex-wrap justify-content-center">
                <button onClick={handleDelete} className="btn btn-danger">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Delete;