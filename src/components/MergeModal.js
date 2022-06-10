import React from 'react'
import {
    Checkbox,
    FormHelperText,
    FormControlLabel,
    FormGroup,
    FormControl,
    FormLabel,
    Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 30 //+ rand();
    const left = 50 // + rand();
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(${-top}%, ${-left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
  
  
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #eee',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    content: {
        alignSelf: 'center',
        marginTop: 20,
        margin: 20,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },

}));

export default function MergeModal({ data, callBack}) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    let mergeArrayState = new Array(data.length);
    for (let i = 0; i < mergeArrayState.length; i++) {
        mergeArrayState[i] = false
    }
    const [mergeState, setMergeState] = React.useState(mergeArrayState)

    React.useEffect(() => {
        let mergeArrayState = new Array(data.length);
        for (let i = 0; i < mergeArrayState.length; i++) {
            mergeArrayState[i] = false
        }
        setMergeState(mergeArrayState)
    }, [data])

    const handleMergeSubmit = () => {
        let selectedData = []
        let indexes = []
        mergeState.forEach((val, index) => {
            if (val) {
                selectedData.push(data[index])
                indexes.push(index)
            }
        })
       
        console.log(callBack)
        callBack(data, selectedData)
    }


    return (
           
        < div style={modalStyle} className={classes.paper} >
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Choose the items that you want to merge</FormLabel>
                <FormGroup>
                    {data.map((element, index) => {

                        return < FormControlLabel key={element.id}
                            control={< Checkbox checked={mergeState[index]} name={element.label} onChange={() => {
                                let intermidiate = [...mergeState]
                                intermidiate[index] = !mergeState[index]
                                setMergeState(intermidiate)
                            }
                            }
                            />}
                            label={element.label}
                        />
                    })}
                </FormGroup>
                <FormHelperText>Be careful</FormHelperText>
                <Button type="submit" onClick={handleMergeSubmit} variant="outlined" color="primary" className={classes.button}>
                    Merge
                    </Button>
            </FormControl>
        </div >
    )
}
