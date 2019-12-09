import * as React from "react";
import { Helmet } from "react-helmet";
import logo from "@Images/logo.png";

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Helmet>
                <title>CAR RENTAL</title>
            </Helmet>
            <p className="text-center" style={{ "fontSize": "52px" }}>YOU CAN BE RIGHT!</p>
            <p className="text-center" style={{ "fontSize": "40px" }}>OR</p>
            <p className="text-center" style={{"fontSize": "52px"}}>YOU CAN BE HAPPY!</p>
            </div>;
    }
}