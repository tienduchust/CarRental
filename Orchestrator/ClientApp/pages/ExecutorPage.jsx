import "@Styles/main.scss";
import * as React from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router";
import * as ExecutorStore from "@Store/ExecutorStore";
import { connect } from "react-redux";
import { PagingBar } from "@Components/shared/PagingBar";
import Loader from "@Components/shared/Loader";
import Bind from 'bind-decorator';
import ClassNames from 'classnames';
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    executorSearchBox: {
        width: 200
    }
});

class ExecutorPage extends React.Component {
    pagingBar;
    debouncedSearchFn;
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: "",
            pageNum: 1,
            limitPerPage: 5,
            rowOffset: 0
        };

        this.debouncedSearchFn = AwesomeDebouncePromise(term => {
            props.searchRequest(term);
        }, 500)
    }

    @Bind
    onChangePage(pageNumber) {
        let rowOffset = Math.ceil((pageNumber - 1) * this.state.limitPerPage);
        this.setState({ pageNumber, rowOffset });
    }

    @Bind
    renderRow(executor) {
        return <tr key={executor.id}>
            <td>{executor.name}</td>
            <td>{executor.ip}</td>
        </tr>;
    }

    @Bind
    renderRows(executorModels) {
        return executorModels
            .slice(this.state.rowOffset, this.state.rowOffset + this.state.limitPerPage)
            .map(x => this.renderRow(x));
    }

    @Bind
    onChangeSearchInput(event) {
        let val = event.currentTarget.value;
        this.debouncedSearchFn(val);
        this.pagingBar.setFirstPage();
    }
    componentDidMount() {
        this.debouncedSearchFn();
    }

    render() {
        const { classes } = this.props;
        return <div className={classes.root}>
            <Helmet>
                <title>EXECUTOR - CAR RENTAL</title>
            </Helmet>

            <Loader show={this.props.indicators.operationLoading} />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <input
                            type="text"
                            style={{}}

                            className={ClassNames({
                                "form-control": true,
                                [classes.executorSearchBox]: true
                            })}
                            defaultValue=""
                            onChange={this.onChangeSearchInput}
                            placeholder={"Search for executor..."} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>NAME</th>
                                    <th>IP ADDRESS</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderRows(this.props.executor)}
                            </tbody>
                        </table>
                        <PagingBar
                            ref={x => this.pagingBar = x}
                            totalResults={this.props.executor.length}
                            limitPerPage={this.state.limitPerPage}
                            currentPage={this.state.pageNum}
                            onChangePage={this.onChangePage}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>;
    }
}

let component = connect(
    state => state.executor, // Selects which state properties are merged into the component's props.
    ExecutorStore.actionCreators // Selects which action creators are merged into the component's props.
)(withStyles(styles)(ExecutorPage));

export default (withRouter(component));