import React,{ useContext }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import {DataContext} from '../App'
import DataItem from './DataItem';
import { useDataContext } from '../utils/dataContext'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'wrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    justifyContent:  'center' ,
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function DataList() {
  const classes = useStyles();
  const { data } = useDataContext()

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {data.map((data , indx) => (           
          <DataItem item={data} index={indx} key={data.id}/>
        ))}
      </GridList>
    </div>
  );
}