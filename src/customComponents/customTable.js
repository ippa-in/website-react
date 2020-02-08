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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];

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

const headCells = [
    { id: 'name', label: 'Dessert (100g serving)' },
    { id: 'calories', label: 'Calories' },
    { id: 'fat', label: 'Fat (g)' },
    { id: 'carbs', label: 'Carbs (g)' },
    { id: 'protein', label: 'Protein (g)' },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

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
        maxHeight: 'calc(85vh)',
        overflow: 'auto',
    },
    table: {
        minWidth: 750,
    },
    tableHead: {
        backgroundColor: '#f5f3fd',
    },
    tableCell: {
        borderRight: '1px solid #eae8f2',
        backgroundColor: '#f5f3fd',
    },
    tableCellRows: {
        maxWidth: theme.spacing(10),
        textAlign: "center",
        overflow: 'hidden',
        wordBreak: 'break-word',
    }
}));

export default function CustomTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    // const [selected, setSelected] = React.useState([]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <Paper className={classes.paper}>
            <TableContainer className={classes.tableContainer}>
                <Table
                    className={classes.table}
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
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .map((row, index) => {
                                //   const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        key={row.name}
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
                                        <TableCell className={classes.tableCellRows}>{row.name}</TableCell>
                                        <TableCell className={classes.tableCellRows}>{row.calories}</TableCell>
                                        <TableCell className={classes.tableCellRows}>{row.fat}</TableCell>
                                        <TableCell className={classes.tableCellRows}>{row.carbs}</TableCell>
                                        <TableCell className={classes.tableCellRows}>{row.protein}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}