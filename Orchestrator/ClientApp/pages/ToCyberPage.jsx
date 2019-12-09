import "@Styles/main.scss";
import * as React from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router";
import * as ToCyberStore from "@Store/ToCyberStore";
import { connect } from "react-redux";
import { PagingBar } from "@Components/shared/PagingBar";
import Loader from "@Components/shared/Loader";
import Bind from "bind-decorator";
import JsZip from "jszip";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { Paper, Grid, withStyles, Button, Link } from "@material-ui/core";
import { Sync } from '@material-ui/icons';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        '& label, button': {
            fontSize: 14,
            fontFamily: 'Roboto'
        }
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    toCyberSearchBox: {
        width: 200
    }
});

class ToCyberPage extends React.Component {
    pagingBar;

    debouncedSearchFn;
    debouncedAddFn;

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: "",
            pageNum: 1,
            limitPerPage: 5,
            rowOffset: 0,
            modelForEdit: {},
            bookings: []
        };

        this.debouncedSearchFn = AwesomeDebouncePromise(term => {
            props.searchRequest(term);
        },500);
        this.debouncedAddFn = AwesomeDebouncePromise(model => {
            props.addRequest(model);
        },500);
    }

    @Bind
    onChangePage(pageNumber) {
        let rowOffset = Math.ceil((pageNumber - 1) * this.state.limitPerPage);
        this.setState({ pageNumber, rowOffset });
    }

    @Bind
    renderRow(toCyber) {
        return <tr key={toCyber.code}>
            <td>{toCyber.code}</td>
            <td>{toCyber.createdAt}</td>
            <td>
                <Link
                    title="Nhập Cyber"
                    component="button"
                    variant="body2"
                    onClick={e=>this.onAddToCyber(toCyber)}
                >
                    <Sync fontSize="large" />
                </Link>
            </td>
        </tr>;
    }

    @Bind
    renderRows(toCyberModels) {
        return toCyberModels
            .slice(this.state.rowOffset, this.state.rowOffset + this.state.limitPerPage)
            .map(x => this.renderRow(x));
    }

    @Bind
    onAddToCyber(model) {
        this.debouncedAddFn(model);
    }
    @Bind
    onChangeSearchInput(event) {
        let val = event.currentTarget.value;
        this.debouncedSearchFn(val);
        this.pagingBar.setFirstPage();
    }
    @Bind
    async onExtractZipFile(zip) {
        const _this = this;
        let promises = [];
        zip.forEach(function (relativePath, zipEntry) { // 2) print entries
            promises.push(new Promise((resolve, reject) => {
                let booking = zipEntry.async("string")
                    .then(function (data) {
                        let nameChar = zipEntry.name.split(".");
                        if (nameChar.length > 2) {
                            let createdAtStr = nameChar[nameChar.length - 2];
                            let code = zipEntry.name.replace(`.${createdAtStr}.json`, "");
                            return {
                                code: code,
                                createdAt: createdAtStr,
                                json: data
                            };
                        }
                        return null;
                    });
                resolve(booking);
            }));
        });

        Promise.all(promises).then(bookings => {
            _this.setState({
                bookings
            });
        }).catch(e => {
            console.log("onExtractZipFile", e);
        });
    }

    render() {
        const _this = this;
        const { classes } = this.props;
        const { bookings } = this.state;
        return (
            <div className={classes.root}>
                <Helmet>
                    <title>TO CYBER - CAR RENTAL</title>
                </Helmet>
                <Loader show={this.props.indicators.operationLoading} />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Grid container>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Upload File
                                        <input
                                            onChange={e => {
                                                let files = e.target.files;
                                                if (files && files.length > 0) {
                                                    JsZip.loadAsync(files[0])
                                                        .then(async function (zip) {
                                                            _this.onExtractZipFile(zip);
                                                        }, function (e) {
                                                            console.log("Upload File", e);
                                                        });
                                                }
                                            }}
                                            type="file"
                                            multiple={false}
                                            accept=".zip"
                                            style={{ display: "none" }}
                                        />
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Import all
                                        <input
                                            onChange={e => {
                                                let files = e.target.files;
                                                if (files && files.length > 0) {
                                                    JsZip.loadAsync(files[0])
                                                        .then(async function (zip) {
                                                            _this.onExtractZipFile(zip);
                                                        }, function (e) {
                                                            console.log("Upload File", e);
                                                        });
                                                }
                                            }}
                                            type="file"
                                            multiple={false}
                                            accept=".zip"
                                            style={{ display: "none" }}
                                        />
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Import selection
                                        <input
                                            onChange={e => {
                                                let files = e.target.files;
                                                if (files && files.length > 0) {
                                                    JsZip.loadAsync(files[0])
                                                        .then(async function (zip) {
                                                            _this.onExtractZipFile(zip);
                                                        }, function (e) {
                                                            console.log("Upload File", e);
                                                        });
                                                }
                                            }}
                                            type="file"
                                            multiple={false}
                                            accept=".zip"
                                            style={{ display: "none" }}
                                        />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>CODE BOOKING</th>
                                        <th>CREATED AT</th>
                                        <th>HÀNH ĐỘNG</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderRows(bookings)}
                                </tbody>
                            </table>
                            <PagingBar
                                ref={x => this.pagingBar = x}
                                totalResults={this.props.toCyber.length}
                                limitPerPage={this.state.limitPerPage}
                                currentPage={this.state.pageNum}
                                onChangePage={this.onChangePage} />
                        </Paper>
                    </Grid>
                </Grid>
            </div>);
    }
}

let component = connect(
    state => state.toCyber, // Selects which state properties are merged into the component's props.
    ToCyberStore.actionCreators // Selects which action creators are merged into the component's props.
)(withStyles(styles)(ToCyberPage));

export default (withRouter(component));