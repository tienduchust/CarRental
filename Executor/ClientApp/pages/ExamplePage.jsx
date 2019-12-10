import "@Styles/main.scss";
import * as React from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router";
import * as PersonStore from "@Store/PersonStore";
import { connect } from "react-redux";
import { PagingBar } from "@Components/shared/PagingBar";
import PersonEditor from "@Components/person/PersonEditor";
import Loader from "@Components/shared/Loader";
import bind from 'bind-decorator';
import { ModalComponent } from "@Components/shared/ModalComponent";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { _ } from "core-js";

class ExamplePage extends React.Component {

    debouncedPeekUpFn;

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: "",
            pageNum: 1,
            limitPerPage: 5,
            rowOffset: 0,
            modelForEdit: {}
        };

        this.debouncedPeekUpFn = AwesomeDebouncePromise(() => {
            props.peekUpRequest();
        }, 500);
    }

    @bind
    onPeekUp() {
        this.debouncedPeekUpFn();
    }

    render() {
        const { peekUpItem } = this.props;
        return <div>
            <Helmet>
                <title>Executor - CAR RENTAL</title>
            </Helmet>

            <Loader show={this.props.indicators.operationLoading} />

            <div className="panel panel-default">
                <div className="panel-body row">
                    <div className="col-sm-1">
                        <button className="btn btn-success" onClick={this.onPeekUp}>Add</button>
                    </div>

                </div>
            </div>
            <textarea value={JSON.stringify(peekUpItem,null,2)} style={{width:'100%'}} cols="30" rows="10"/>
        </div>;
    }
}

var component = connect(
    state => state.person, // Selects which state properties are merged into the component's props.
    PersonStore.actionCreators // Selects which action creators are merged into the component's props.
)(ExamplePage);

export default (withRouter(component));