import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import DeletItemsModal from './DeletItemsModal';
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import SplitLogo from './assets/split.svg';
import MergeLogo from "./assets/merging.svg"
import OverlapLogo from "./assets/overlap.svg"
import { useZoomTypeContext } from '../utils/ZoomTypeContext'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CasinoOutlinedIcon from '@material-ui/icons/CasinoOutlined';
import { useFontSizeContext } from '../utils/fontSizeContext'
import ZoomInOutlinedIcon from '@material-ui/icons/ZoomInOutlined';
import Logo from './assets/logo.svg'
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import {
    ListItemIcon,
    ListItemText,
    ListItem,
    IconButton,
    Divider,
    Drawer,
    Checkbox,
    FormHelperText,
    FormControlLabel,
    FormGroup,
    FormControl,
    FormLabel,
    Typography,
    Toolbar,
    Button,
    Fab,
    RadioGroup,
    Radio,
    Modal,
    List,
    SvgIcon,
    Collapse,
    Icon,

    AppBar,
    CssBaseline
} from '@material-ui/core';
// import   WriteJsonFile   from 'write-json-file'
import { mergeData, spliteData, parseFileData} from '../utils/randomizeData'
import MenuIcon from '@material-ui/icons/Menu';

import PieContainer from './PieContainer';
import DataList from './DataList';
import MergeModal from './MergeModal'
import InsertElementModal from './InsertElementModal'
//import CircleChart from './CircleChart'
import CircleAlgo1 from './CircleAlgo1'
import CirlceAlgo2 from './CirlceAlgo2'
import CircleLabelList from './CircleLabelList'
import CircleEngleText from './CircleEngleText'
import CirclerAroundText from './CirclerAroundText'
import { useDataContext } from '../utils/dataContext'
import randomizeData from "../utils/randomizeData"
import SpliteModal from './SpliteModal';
import FontSizeSlider from './FontSizeSlider'
import exportFromJSON from 'export-from-json'
import { engleText } from '../utils/functions';
import { removeOverlaps } from '../utils/removeOverlaps'

const drawerWidth = 240;

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 30 + rand();
    const left = 50 + rand();
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(${-top}%, ${-left}%)`,
    };
}
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        zIndex: theme.zIndex.drawer + 100,
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'center',
    },
    logo: {
        height: 55,
        width: 80,
        //marginTop: 80 , 
        //marginBottom : 20
    },
    container: {
        display: "flex",
        justifyContent: 'center',
        flexWrap: 'nowrap',
        flexDirection: 'column',
        marginTop: 100,
        marginLeft: 40,
        alignItems: 'center'
    },

    pieContainer: {
        display: "flex",
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
       // marginTop: 100,
       // marginLeft: 40,
        alignItems: 'center'

    },
    dataList: {
        display: "block",

    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #eee',
        boxShadow: theme.shadows[5],
        ///padding: theme.spacing(2, 4, 3),
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

    updateDataSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        position: 'fixed',
        left: 300,
        top: 250
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PersistentDrawerLeft() {
    const classes = useStyles();
    const { addData, data } = useDataContext()
    const { zoomType, updateZoomType } = useZoomTypeContext()
    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [openModalSplite, setOpenModalSplite] = React.useState(false);
    const [openZoomType, setOpenZoomType] = React.useState(false)
    const [ZoomType, setZoomType] = React.useState("SEMENTIC")
    const { updateFontSize } = useFontSizeContext()
    const randData = () => {
        addData(randomizeData())
    }

    const resetEveryThings = () => {
        setZoomType("SEMENTIC")
        updateZoomType("SEMENTIC")

        updateFontSize(18)   // Problem with this 
        // Change the data 
        let updatedData = [...data]
        updatedData.forEach(e => {
            e.fontSize = 0
        })
        addData(updatedData)
    }
    const handleZoomTypeChange = (e) => {
        if (ZoomType == "SEMENTIC") {
            setZoomType("GEOMETRIC")
            updateZoomType("GEOMETRIC")
        } else {
            setZoomType("SEMENTIC")
            updateZoomType("SEMENTIC")
        }

       // console.log(zoomType)
    }

    const handleOpenZoomType = () => {
        setOpenZoomType(!openZoomType)
    }

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleModalOpen = () => {
        setOpenModal(true);
    };


    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleMergeSubmit = (data, selectedData) => {
        handleModalClose()
        addData(mergeData(data, selectedData))
    }

    const handleSpliteSubmit = (selectedData) => {
        handleModalSpliteClose()
        addData(spliteData(data, selectedData))
    }

    const handleModalSpliteClose = () => {
        setOpenModalSplite(false)
    }

    const handleModalSpliteOpen = () => {
        setOpenModalSplite(true)
    }
    const inputFile = React.useRef(null)
    const [selectedFile, setSelectedFile] = React.useState(null);
    //  inputFile.addEventListener("change", handleFiles, false);
    function handleFiles(e) {
       // console.log(e.target.files) /* now you can work with the file list */
        let importedFile = e.target.files[0];
        let reader = new FileReader();
        reader.onload = function () {
            var fileContent = JSON.parse(reader.result);
           // console.log(fileContent)

            addData(parseFileData(fileContent))
            //randerTheData(fileContent)
            // Do something with fileContent
            // document.getElementById('json-file').innerHTML = fileContent;  
        };
        reader.readAsText(importedFile);
        setSelectedFile(null)
    }
    const openFileBorwser = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };
    const saveDataToJsonFile = () => {
        // `current` points to the mounted file input element

        const fileName = 'data'
        const exportType = exportFromJSON.types.json

        exportFromJSON({ data, fileName, exportType })

    };


    const [engleTextSvg, setTextSvg] = React.useState()

    const [doRemoveOverLaps, setDoRemoveOverLaps] = React.useState(false);
    const removeOverLaps = () => {
        removeOverlaps(labelSvg)
    }
    const [labelSvg, setLabelSvg] = React.useState(null)

    const [algo1Svg, setAlgo1Svg] = React.useState(null)

    const [roundedSvg, setRoundedSvg] = React.useState(null)

    const [algo2Svg, setAlgo2Svg] = React.useState(null)


    return (

        <div className={classes.root}>
            <CssBaseline />
            <input type='file' id='file'
                accept=".json"
                value={selectedFile}
                ref={inputFile}
                style={{ display: 'none' }}
                onChange={handleFiles} />

            <AppBar  position="fixed" className={classes.appBar} open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="end"
                        sx={{ mr: 2, ...(open ) }}
                    >
                        <MenuIcon />
                    </IconButton>
                      <img src={Logo} className={classes.logo} />          
                    <Typography variant="h6" noWrap component="div">
                        CircleVis
                    </Typography>
                </Toolbar>

            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
              <div className={classes.drawerHeader}>
                  
                </div> 

                <Divider />
                <List>
                    <ListItem button={true} key={'Reset'} onClick={resetEveryThings}>
                        <ListItemIcon><RotateLeftIcon></RotateLeftIcon></ListItemIcon>
                        <ListItemText primary={'Reset'} />
                    </ListItem>

                    <ListItem button={true} key={'Zoom type'} onClick={handleOpenZoomType}>
                        <ListItemIcon><ZoomInOutlinedIcon /></ListItemIcon>
                        <ListItemText primary={'Zoom type'} />
                        {openZoomType ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openZoomType} timeout="auto" unmountOnExit>
                        <FormControl component="fieldset">
                            <RadioGroup
                                value={ZoomType}
                                name="radio-buttons-group"
                                onChange={handleZoomTypeChange}
                            >
                                <FormControlLabel value="SEMENTIC" control={<Radio />} label="Semantic" />
                                <FormControlLabel value="GEOMETRIC" control={<Radio />} label="Geometric" />

                            </RadioGroup>
                        </FormControl>
                    </Collapse>
                    <ListItem button={true} key={'Remove overlaps'} onClick={removeOverLaps}>
                        <ListItemIcon><Icon><img src={OverlapLogo}></img></Icon></ListItemIcon>
                        <ListItemText primary={'Remove overlaps'} />
                    </ListItem>
                    <ListItem button={true} key={'Randomize'} onClick={randData}>
                        <ListItemIcon><CasinoOutlinedIcon /></ListItemIcon>
                        <ListItemText primary={'Randomize'} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button={true} key={'Merge'} onClick={handleModalOpen} >
                        <ListItemIcon><Icon><img src={MergeLogo} /></Icon></ListItemIcon>
                        <ListItemText primary={'Merge'} />
                    </ListItem>
                    <ListItem button={true} key={'Splite'} onClick={handleModalSpliteOpen} >
                        <ListItemIcon><Icon><img src={SplitLogo} /></Icon></ListItemIcon>
                        <ListItemText primary={'Splite'} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <DeletItemsModal />
                    <InsertElementModal />
                </List>
                <Divider />
                <List>
                    <ListItem button={true} key={'Import Data'} onClick={openFileBorwser} >
                        <ListItemIcon><AttachFileOutlinedIcon /></ListItemIcon>
                        <ListItemText primary={'Import Data'} />
                    </ListItem>
                    <ListItem button={true} key={'Save Data'} onClick={saveDataToJsonFile} >
                        <ListItemIcon><SaveAltOutlinedIcon /></ListItemIcon>
                        <a href="try.json" download></a>
                        <ListItemText primary={'Save Data'} />
                    </ListItem>
                </List>
            </Drawer>
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <MergeModal data={data} callBack={handleMergeSubmit} />
            </Modal>

            <Modal
                open={openModalSplite}
                onClose={handleModalSpliteClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <SpliteModal data={data.filter(e => e.children != null)} callback={handleSpliteSubmit} />
            </Modal>

            <div className={classes.container} >
                <div>
                    <div className={classes.dataList}>
                        <DataList />
                    </div>
                </div>

                <div className={classes.updateDataSection}>
                    <FontSizeSlider />
                </div>

                <div className={classes.pieContainer}>
                    <div className={classes.content}>
                        <PieContainer className={classes.content} svg={engleTextSvg} title={"A1"} name={"Engular Arrangement"}  >
                            <CircleEngleText value={engleTextSvg} setValue={setTextSvg} />
                        </PieContainer>
                    </div>
                    <div className={classes.content}>
                        <PieContainer className={classes.content} svg={roundedSvg} title={"A2"} name={"Path Arrangement"}>
                            <CirclerAroundText setSvg={setRoundedSvg} />
                        </PieContainer>
                    </div>
                    <div className={classes.content}>
                        <PieContainer className={classes.content} svg={labelSvg} title={"A3_L"} name={"List Arrangement"} >
                            <CircleLabelList setSvg={setLabelSvg} />
                        </PieContainer>
                    </div>
                  
                    <div className={classes.content}>
                        <PieContainer className={classes.content} svg={algo1Svg} title={"A3_Ln"} name={"Linear Arrangement"}  >
                            <CircleAlgo1 setSvg={setAlgo1Svg} doRemoveOverlap={doRemoveOverLaps} set={setDoRemoveOverLaps} />
                        </PieContainer>
                    </div>
                    <div className={classes.content}>
                        <PieContainer className={classes.content} svg={algo2Svg} title={"A4"} name={"Minimum distance Arrangement"} >
                            <CirlceAlgo2 setSvg={setAlgo2Svg} />
                        </PieContainer>
                    </div>
                   
                </div>

            </div>
        </div>
    );
}