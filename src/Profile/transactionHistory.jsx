import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { getFormattedDate } from '../utils/common';

const columns = [
    { id: 'date', label: 'DATE', minWidth: 160, align: 'center' },
    { id: 'username', label: 'USER NAME', minWidth: 160, align: 'center', },
    {
        id: 'description',
        label: 'DESCRIPTION',
        minWidth: 160,
        align: 'center',
    },
    {
        id: 'network',
        label: 'NETWORK',
        minWidth: 160,
        align: 'center',
    },
    {
        id: 'amount',
        label: 'AMOUNT',
        minWidth: 160,
        align: 'center',
        format: value => value.toFixed(2),
    },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    tableWrapper: {
        maxHeight: 440,
        overflow: 'auto',
    },
});

export default function TransactionHistory(props) {
    const classes = useStyles();

    useEffect(() => {
        // props.getAllTransaction({ status: 'Pending' });
        props.getAllTransaction();
    }, []);

    const rows = (props.allTransactions.length && props.allTransactions.map(data =>
        ({
            date: getFormattedDate(data.txn_date) || '--',
            username: data.user.user_name || '--',
            description: data.description || '--',
            network: '' || '--',
            amount: data.amount || '--',
            transactionID: data.txn_id,
        })
    )) || [];

    function desc(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function stableSort(array, cmp) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    function getSorting(order, orderBy) {
        return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
    }

    return (
        <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, textAlign: 'center' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.transactionID}>
                                    {columns.map(column => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </Paper>
    );
}