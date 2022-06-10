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


export default function SpliteModal({data , callback}) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    let spliteArrayState = [];
    let checkboxStateArray = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].children != null) {
            spliteArrayState.push(
                { ischecked: false, item: data[i] }
            )
            checkboxStateArray.push(false)
        }
    }
    const [spliteState, setSpliteState] = React.useState(spliteArrayState)
    const [checkboxState, setCheckboxState] = React.useState(checkboxStateArray)

    React.useEffect(() => {
        let spliteArrayState = [];
        let checkboxStateArray = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].children != null) {
                spliteArrayState.push(
                    { ischecked: false, item: data[i] }
                )
                checkboxStateArray.push(false)
            }
        }
        setCheckboxState(checkboxStateArray)
        setSpliteState(spliteArrayState)
    }, [data])


    const handleSpliteSubmit = () => {
        let selectedData = []
      
        spliteState.forEach((val, index) => {
            if (val) {
                selectedData.push(data[index])
            }
        })
     
        callback( selectedData)
     
    }
    return (
        <div style={modalStyle} className={classes.paper}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Choose the items that you want to splite</FormLabel>
                <FormGroup>
                    {data.map((element, index) => {
                        if (element.children != null) {
                            return < FormControlLabel key={element.id}
                                control={< Checkbox checked={checkboxState[index]} name={element.label} onChange={() => {
                                    let intermidiate = [...spliteState]
                                    let boxState = [...checkboxState]
                                    
                                    intermidiate[0].ischecked = !spliteState[index].ischecked
                                    boxState[0] = !checkboxState[index]
                                    
                                    setSpliteState(intermidiate)
                                    setCheckboxState(boxState)
                                }
                                }
                                />}
                                label={element.label}
                            />
                        }
                    })
                    }
                </FormGroup>
                <FormHelperText>Be careful</FormHelperText>
                <Button type="submit" onClick={handleSpliteSubmit} variant="outlined" color="primary" className={classes.button}>
                    Splite
                    </Button>
            </FormControl>
        </div>
    )
}
