import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import axios from "axios";

const Update = () => {
    axios.defaults.withCredentials = true;

    const { id } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = React.useState("");
    const [type, setType] = React.useState("QUESTION");

    React.useEffect(() => {
        const fetchData = async () => {
            const resourceResp = await axios.get(`/api/resources/${id}`);

            setContent(resourceResp.data.content);
            setType(resourceResp.data.type);
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resource = {
            content,
            type,
        };

        await axios.put(`/api/resources/${id}`, resource);
        navigate("/resources");
    };

    return (
        <div className="container">
            <PageTitle title="Update Resource" />

            <h1>Update Resource</h1>

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
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Update;