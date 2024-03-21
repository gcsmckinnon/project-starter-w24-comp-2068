import React from "react";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
    axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const [content, setContent] = React.useState("");
    const [type, setType] = React.useState("QUESTION");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resource = {
            content,
            type,
        };

        await axios.post("/api/resources", resource);
        navigate("/resources");

        setContent("");
        setType("QUESTION");
    };

    return (
        <div className="container">
            <PageTitle title="Create Resource" />

            <h1>Create Resource</h1>

            <hr className="my-3" />

            <div className="d-flex flex-wrap justify-content-center">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            className="form-control"
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select
                            className="form-control"
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="QUESTION">Question</option>
                            <option value="ANSWER">Answer</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Create;