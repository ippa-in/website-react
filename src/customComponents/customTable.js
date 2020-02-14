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
import _ from 'lodash';

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
                {headCells.map(headCell => (
                    <TableCell
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
                    </TableCell>
                ))}
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
        maxHeight: 'calc(100vh - 170px)',
        overflow: 'auto',
    },
    tableHead: {
        backgroundColor: '#f5f3fd',
    },
    tableCell: {
        borderRight: '1px solid #eae8f2',
        backgroundColor: '#f5f3fd',
        fontFamily: 'SF UI Text Regular',
        fontSize: 12,
        fontWeight: 600,
    },
    tableCellRows: {
        maxWidth: theme.spacing(10),
        textAlign: "center",
        overflow: 'hidden',
        wordBreak: 'break-word',
        fontFamily: 'SF UI Text Regular',
        fontWeight: 'normal',
        fontSize: 13,
    }
}));

export default function CustomTable(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    // const [selected, setSelected] = React.useState([]);
    // const lookupKeys = props.headers.map(data => data.lookup_key);

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
        return data;
    };

    // console.log(props.headers);
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
                            .map((row, index) => {
                                //   const isItemSelected = isSelected(row.name);
                                // const labelId = `enhanced-table-checkbox-${index}`;
                                // console.log("row", row)
                                return (
                                    <TableRow
                                        hover
                                        key={`${index}`}
                                    //   onClick={event => handleClick(event, row.name)}
                                    //   role="checkbox"
                                    //   aria-checked={isItemSelected}
                                    //   tabIndex={-1}
                                    //   selected={isItemSelected}
                                    >
                                        {/* <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.name}
                                            </TableCell> */}
                                        {props.headers.map(header =>
                                            <TableCell className={classes.tableCellRows} key={header.display_name}>
                                                {getRows(header, row)}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}