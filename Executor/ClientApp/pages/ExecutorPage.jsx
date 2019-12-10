import "@Styles/main.scss";
import * as React from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router";
import * as PersonStore from "@Store/PersonStore";
import { connect } from "react-redux";
import Loader from "@Components/shared/Loader";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { _ } from "core-js";

class ExecutorPage extends React.Component {

    debouncedPeekUpFn;
    debouncedFinishUpFn;

    constructor(props) {
        super(props);
        this.debouncedPeekUpFn = AwesomeDebouncePromise(() => {
                props.peekUpRequest();
        }, 500);
        this.debouncedFinishUpFn = AwesomeDebouncePromise(() => {
                props.finishUpRequest();
        },500);
    }

    onPeekUp = () => {
        this.debouncedPeekUpFn();
    }
    onFinishUp = () => {
        this.debouncedFinishUpFn();
    }

    render() {
        const { peekUpItem } = this.props;
        return <div>
                   <Helmet>
                       <title>Executor - CAR RENTAL</title>
                   </Helmet>

                   <Loader show={this.props.indicators.operationLoading}/>

                   <div className="panel panel-default">
                       <div className="panel-body row">
                           <div className="col-sm-1">
                               <button className="btn btn-success" onClick={this.onPeekUp}>Peek up</button>
                            </div>
                            <div className="col-sm-1">
                               <button className="btn btn-success" onClick={this.onFinishUp}>Finish up</button>
                            </div>

                       </div>
                   </div>
                   <textarea value={JSON.stringify(peekUpItem, null, 2)} style={{ width: "100%" }} cols="30" rows="10"/>
               </div>;
    }
}

let component = connect(
    state => state.executor, // Selects which state properties are merged into the component's props.
    ExecutorStore.actionCreators // Selects which action creators are merged into the component's props.
)(ExecutorPage);

export default (withRouter(component));