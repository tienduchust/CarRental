import * as React from "react";

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <footer className="footer text-center">
            <p>View on <a href="https://havai.vn">HAI VAN</a></p>
            <p>Copyright (c) 2019 CAR RENTAL</p>
            <p><a href="https://en.wikipedia.org/wiki/MIT_License">MIT License</a></p>
        </footer>;
    }
}