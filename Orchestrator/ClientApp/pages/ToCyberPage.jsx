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
import { Paper, Grid, withStyles, Button, Link, Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";
import { Sync } from '@material-ui/icons';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        '& label, button,th,td': {
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

    debouncedBrowseFn;
    debouncedAddFn;

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: "",
            pageNum: 1,
            limitPerPage: 5,
            rowOffset: 0,
            modelForEdit: {}
        };

        this.debouncedBrowseFn = AwesomeDebouncePromise(() => {
            props.browseRequest();
        }, 500);
        this.debouncedAddFn = AwesomeDebouncePromise(model => {
            props.addRequest(model);
        }, 500);
    }

    @Bind
    onAddToCyber(model) {
        this.debouncedAddFn(model);
    }
    @Bind
    onBrowse() {
        this.debouncedBrowseFn();
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
            _this.onAddToCyber(bookings)
        }).catch(e => {
            console.log("onExtractZipFile", e);
        });
    }

    render() {
        const _this = this;
        const { classes, queue } = this.props;
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
                                <Grid item>
                                    <Button
                                        onClick={_this.onBrowse}
                                        variant="contained"
                                        component="label"
                                    >
                                        <Sync fontSize="large" />
                                        REFRESH
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">MÃ BOOKING</TableCell>
                                        <TableCell align="center">NGÀY TẠO</TableCell>
                                        <TableCell align="center">TRẠNG THÁI</TableCell>
                                        <TableCell align="center">DỮ LIỆU</TableCell>
                                        <TableCell align="center">THỰC HIỆN</TableCell>
                                        <TableCell align="center">HÀNH ĐỘNG</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {queue.map(row => {
                                        let code = null;
                                        let createdAt = null;
                                        let json = null;
                                        let executorName = null;
                                        if (row && row.data) {
                                            code = row.data.code;
                                            createdAt = row.data.createdAt;
                                            json = JSON.stringify(JSON.parse(row.data.json), null, 4);
                                        }
                                        if (row && row.executor) {
                                            executorName = row.executor.name;
                                        }
                                        return (
                                            <TableRow key={row.uuid}>
                                                <TableCell component="th" scope="row">
                                                    <code>{code}</code>
                                                </TableCell>
                                                <TableCell align="center">{createdAt}</TableCell>
                                                <TableCell align="center">{row.status}</TableCell>
                                                <TableCell align="center">
                                                    <textarea value={json} style={{ width: '100%' }} cols="30" rows="5" />
                                                </TableCell>
                                                <TableCell align="center">{executorName}</TableCell>
                                                <TableCell align="center">
                                                    <Link
                                                        title="Nhập Cyber"
                                                        component="button"
                                                        variant="body2"
                                                        onClick={e => this.onAddToCyber(row)}
                                                    >
                                                        <Sync fontSize="large" />
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
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