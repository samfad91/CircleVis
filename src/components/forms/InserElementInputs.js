import React from 'react'
import {
    Fab,
    DialogTitle,
    DialogActions,
    Button,
    Dialog,
    Paper,
    TextField,
    DialogContent,
    DialogContentText
} from '@material-ui/core';
import FormatColorFillRoundedIcon from '@material-ui/icons/FormatColorFillRounded';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    inputContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: ' center ',

    },
    inputColor: {
        position: 'relative',
        left: 78,
        visibility: 'hidden',
        top: 12,
        height: 0,
        width: 0
    } ,
   
}))

export default function InserElementInputs() {
    const [color, setColor] = React.useState('#eeeeee')
    const [label, setLabel] = React.useState('')
    const [value, setValue] = React.useState('')

    const handleColorChange = (event) => {
        setColor(event.target.value)
    }
    const classes = useStyles();
    return (
        <div className={classes.inputContainer}>
            <TextField
                onChange={(event) => {
                    setLabel(event.target.value)
                }}
                value={label}
                autoFocus
                margin="dense"
                id="label"
                label="label"
                type="text"
                required
            />

            <TextField
                onChange={(event) => {
                    setValue(event.target.value)
                }}
                value={value}
                autoFocus
                margin="dense"
                id="value"
                label="value "
                type="number"
            />
            <Fab aria-label="add" onClick={onColorIconClick} style={{ background: color }}>
                <FormatColorFillRoundedIcon />
            </Fab>

            <input
                ref={inputColor}
                className={classes.inputColor}
                type='color'
                value={color}
                onChange={handleColorChange}
            />

        </div>
    )
}
