import React from 'react';
import {
    Fab,
    DialogTitle,
    DialogActions,
    Button,
    Dialog,
    ListItemIcon,
    ListItemText,
    ListItem,
    Paper,
    FormControlLabel,
    TextField,
    Checkbox,
    DialogContent,
    DialogContentText
} from '@material-ui/core'; 
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Draggable from 'react-draggable'; 
import { makeStyles } from '@material-ui/core/styles';
import { useDataContext } from '../utils/dataContext' 
import { normilizeData } from '../utils/randomizeData';
import { reinitData } from '../utils/randomizeData';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
const useStyles = makeStyles((theme) => ({
    inputContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: ' flex-start ',

    },
    inputColor: {
        position: 'relative',
        left: 78,
        visibility: 'hidden',
        top: 12,
        height: 0,
        width: 0
    }
}))

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}
export default function DeletItemsModal() {

    const { data, addData } = useDataContext()

    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const handleClickOpen = () => {
        setOpen(true);
    };

    React.useEffect(()=> {
        let deleteArrayState = new Array(data.length);
        for (let i = 0; i < deleteArrayState.length; i++) {
            deleteArrayState[i] = false
        }
        setDeleteState(deleteArrayState)
    } , [data])

    let deleteArrayState = new Array(data.length);
    for (let i = 0; i < deleteArrayState.length; i++) {
        deleteArrayState[i] = false
    }
    const [deleteState, setDeleteState] = React.useState(deleteArrayState)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        let selectedData = []
        deleteState.forEach((val, index) => {
            if (!val) {
                selectedData.push(data[index])
            }
        })
        console.log("Deleted  .")
        console.log(selectedData)
        reinitData(selectedData)
        addData(normilizeData(selectedData))
        handleClose()
    }

    return (
        <div>

            <ListItem button={true} key={'Delete Items'} onClick={handleClickOpen} >
                <ListItemIcon><DeleteOutlineIcon/></ListItemIcon>
                <a href="try.json" download></a>
                <ListItemText primary={'Delete Items'} />
            </ListItem>
            <Dialog open={open} onClose={handleClose}
                fullScreen={fullScreen}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title" >

                <DialogTitle id="form-dialog-title">Delete Items</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Choose the items you want to delete from the pies
          </DialogContentText>
                    <div className={classes.inputContainer}>
                        {data.map((element, index) => {

                            return < FormControlLabel key={element.id}
                                control={< Checkbox checked={deleteState[index]} name={element.label} onChange={() => {
                                    let intermidiate = [...deleteState]
                                    intermidiate[index] = !deleteState[index]
                                    setDeleteState(intermidiate)
                                }}
                                />}
                                label={element.label}
                            />
                        })}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleDelete} color="primary">
                        Delete
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


// insert data 
// save data 
// change size for every size 
// delete node 
// matrice arengement 