import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import _ from 'lodash';

import CustomDialog from './CustomDialog';
import InputField from './InputField';
import CustomButton from './CustomButton';

import { getFormattedDate } from '../utils/common';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    const headCells = [
        ...props.headers.map(data => ({ id: data.display_name, label: data.display_name }))
    ];

    return (
        <TableHead className={classes.tableHead}>
            <TableRow>
                {headCells.map(headCell => {
                    if (headCell.id === '') {
                        return (<TableCell key={'table-action'} className={classes.tableCell} />);
                    }
                    return (<TableCell
                        className={classes.tableCell}
                        key={headCell.id}
                        align='center'
                        padding='default'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>)
                })}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
    paper: {
        width: '100%',
        overflowX: 'auto',
    },
    tableContainer: {
        height: 'calc(100vh - 170px)',
        overflow: 'auto',
    },
    tableHead: {
        backgroundColor: '#f5f3fd',
    },
    tableCell: {
        borderRight: '1px solid #eae8f2',
        backgroundColor: '#f5f3fd',
        fontFamily: 'SF UI Text Regular',
        zIndex: 12,
        fontSize: 12,
        fontWeight: 600,
    },
    tableCellRows: {
        maxWidth: theme.spacing(20),
        textAlign: "center",
        overflow: 'hidden',
        wordBreak: 'break-word',
        fontFamily: 'SF UI Text Regular',
        fontWeight: 'normal',
        fontSize: 13,
    },
    tableActionCell: {
        position: 'relative',
        textAlign: 'center',
        padding: '16px 8px',
        cursor: 'pointer',
    }
}));

export default function CustomTable(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [showMoreOptions, setShowMore] = React.useState({});
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [inputFields, setState] = React.useState({});

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const getRows = (header, row) => {
        let data = _.get(row, header.lookup_key, '--');
        if (data === null || data === '') {
            data = '--';
        } else if (typeof data === 'number' || typeof data === 'boolean') {
            data = `${data}`;
        }
        if (header.key_type === 'date') {
            return getFormattedDate(data);
        }
        if (header.key_type === 'list') {
            return <img src='/images/attachment-icon-unfilled.svg' style={{ cursor: 'pointer' }} alt='img' />
        }
        if (header.key_type === 'status') {
            return (<div className='tableStatus--wrapper'>
                <div className={`oval ${data.toLowerCase()}`} />
                <span className={`${data.toLowerCase()}`}>{data}</span>
            </div>);
        }
        return data;
    };

    const showMoreOption = (event, id) => {
        setShowMore({ ...showMoreOptions, [id]: !showMoreOptions[id] });
    }

    const declineAction = (type, contentID) => {
        const params = { type, contentID };
        sessionStorage.setItem('decParams', JSON.stringify(params));
        setDialogOpen(true);
    }

    const handleInputChange = (event) => {
        setState({ ...inputFields, [event.target.name]: event.target.value });
    }

    const dialogBody = () => {
        return (
            <div>
                <InputField
                    name='username'
                    label='User name'
                    hintText='Enter the title'
                    value={inputFields.username || ""}
                    onChange={handleInputChange}
                />
                <InputField
                    name='comments'
                    label='Reason to decline'
                    hintText='Enter the message'
                    value={inputFields.comments || ""}
                    onChange={handleInputChange}
                />
            </div>
        );
    }

    const dialogActions = () => {
        return (
            <>
                <CustomButton
                    style={{ padding: '12px 18px' }}
                    label='Cancel'
                    onClick={() => setDialogOpen(false)}
                />
                <CustomButton
                    style={{ padding: '12px 18px', marginLeft: 20 }}
                    label='Decline'
                    isPrimary={true}
                    onClick={() => {
                        const params = JSON.parse(sessionStorage.getItem('decParams'));
                        action(params.type, params.contentID);
                    }}
                />
            </>
        );
    };

    const action = (type, contentID) => {
        const params = {
            content_id: contentID,
            content_type: props.contentType,
            action: type,
        };
        if(inputFields.comments) {
            params['comments'] = inputFields.comments;
        }
        props.action(params);
    }

    return (
        <Paper className={classes.paper}>
            <TableContainer className={classes.tableContainer}>
                <Table
                    stickyHeader
                    aria-labelledby="customTable"
                    size='medium'
                    aria-label="custom table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        headers={props.headers}
                    />
                    <TableBody>
                        {stableSort(props.tableData, getComparator(order, orderBy))
                            .map((row, index) =>
                                <TableRow
                                    hover
                                    key={`${index}`}
                                >
                                    {props.headers.map(header => {
                                        if (header.key_type === 'action') {
                                            return (<TableCell
                                                key={header.key_type}
                                                className={classes.tableActionCell}
                                                onClick={(event) => showMoreOption(event, index)}
                                            >
                                                <MoreHorizIcon />
                                                <ul className={showMoreOptions[index] ? "tableShowMore open" : "tableShowMore"}>
                                                    <li onClick={() => action('APPROVED', _.get(row, header.lookup_key, '--'))}>Approve</li>
                                                    <li onClick={() => declineAction('DECLINED', _.get(row, header.lookup_key, '--'))}>Decline</li>
                                                </ul>
                                            </TableCell>)
                                        }
                                        return (<TableCell className={classes.tableCellRows} key={header.display_name}>
                                            {getRows(header, row)}
                                        </TableCell>)
                                    })}
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomDialog
                open={dialogOpen}
                handleClose={() => setDialogOpen(false)}
                title='Decline'
                dialogBody={dialogBody()}
                dialogStyle={{ minWidth: 460 }}
                actions={dialogActions()}
            />
        </Paper>
    );
}