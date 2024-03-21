import React from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import styles from "./Resources.module.css";

const Show = () => {
    axios.defaults.withCredentials = true;
    
    const { id } = useParams();
    const [resource, setResource] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            const resourceResp = await axios.get(`/api/resources/${id}`);
            
            setResource(resourceResp.data);
        };

        fetchData();
    }, [id]);

    return (
        <div className="container">
            <PageTitle title="Resource" />

            <h1>Resource</h1>

            <hr className="my-3" />

            <div className="d-flex flex-wrap justify-content-center">
                <div className={styles.card}>
                    <div className={styles.cardBody}>
                        <h5 className={styles.cardTitle}>{resource.content}</h5>
                        <p className={styles.cardText}>{resource.type}</p>
                        <p className={styles.cardText}>{resource.author?.nickname}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Show;