import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: 0,
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function CustomDropDown(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        value: "0",
    });

    const handleChange = event => {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
        console.log(event.target.name, event.target.value);
        props.getDropDownValue(event.target.value);
    };

    const { label, menuList } = props;
    return (
        <>
            {label.length > 0 && <label className='inputField--label'>{label}</label>}
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                    value={values.value}
                    onChange={handleChange}
                    inputProps={{
                        name: 'value',
                        id: 'form',
                    }}>
                    {menuList.map(menu =>
                        <MenuItem value={menu.key} key={menu.key}>{menu.value}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </>
    );
}


CustomDropDown.propTypes = {
    label: PropTypes.string,
    menuList: PropTypes.array,
    getDropDownValue: PropTypes.func
}

CustomDropDown.defaultProps = {
    label: '',
    menuList: [],
    getDropDownValue: () => { }
}

export default CustomDropDown;