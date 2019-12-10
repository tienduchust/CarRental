import * as React from "react";
import { Helmet } from "react-helmet";

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Helmet>
                <title>Home page - CAR RENTAL</title>
            </Helmet>
            {/* <img style={{"margin": "0 auto", "display": "block", "width": "100%"}} src={logo} /> */}
            
            <p className="text-center" style={{"fontSize": "52px"}}>Happy coding!</p>
            </div>;
    }
}