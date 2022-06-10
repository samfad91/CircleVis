import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { useFontSizeContext } from '../utils/fontSizeContext'
const useStyles = makeStyles((theme) => ({
    root: {
   
        paddingTop : 20 ,
        height: 250,
 
    },
    margin: {
        height: theme.spacing(3),
    },
    text: {
        fontSize: 20,
        color: '#404040' , 
        marginBottom : 20
    }
}));

const marks = [
    {
        value: 10,
        label: '10',
    },
    {
        value: 100,
        label: '100',
    },
];

const PrettoSlider = withStyles({
    root: {
       //color : '#343434' 
    },
    thumb: {
        height: 20,
        width: 20,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        "&:focus, &:hover, &$active": {
            boxShadow: "inherit"
        } ,
    },
    active: {
        background: ' currentColor'
    },
    valueLabel: {
        left: "calc(-50% + 4px)"
    },
    track: {
        height: 8,
        width: "9px !important",
        borderRadius: 20
    },
    rail: {
        height: 80, 
        width: "8px !important",
        borderRadius: 0
    },
    markLabel:{
        fontSize: 15,
        marginLeft : 5
    }
  
})(Slider);


export default function FontSizeSlider() {
    const classes = useStyles();

    const { updateFontSize } = useFontSizeContext()
    const [fontSizeState, setFontSizeState] = React.useState(18)

    const handleFontSizeChange = (value) => {
        setFontSizeState(value)
        updateFontSize(value)
    }

    return (
        <div className={classes.root}>

            <Typography gutterBottom className={classes.text}>Font size</Typography>
            <PrettoSlider
                marks={marks}
                min = {10}
                defaultValue={fontSizeState}
                getAriaValueText={handleFontSizeChange}
                valueLabelDisplay="auto"
                orientation="vertical"
                step={1} />

        </div>
    );
}