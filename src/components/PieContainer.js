import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import exportFromJSON from 'export-from-json'
import * as d3 from 'd3';
import ZoomInOutlinedIcon from '@material-ui/icons/ZoomInOutlined';

const useStyles = makeStyles({
  root: {
    minWidth: 345,
  },
  media: {
    minHeight: 140,
  },
});

export default function PieContainer({ children, svg, title, name}) {
  const classes = useStyles();
 
  const downloadSvg = () => {
    console.log(svg)
   
  
    const fileName = 'try'
    const exportType = exportFromJSON.types.html
    
    
    /*  svgAsDataUri(svg.node(), {}, function (uri) {
        console.log('uri', uri);
      });*/
   
    // exportFromJSON({ svg, fileName, exportType })
      const element = document.createElement("a")
      svg.node().setAttribute("xmlns", "http://www.w3.org/2000/svg")
    svg.node().setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink")
      var preface = '<?xml version="1.0" standalone="no"?>\r\n'
      const file = new Blob([preface, svg.node().outerHTML],
        { type: "image/svg+xml;charset=utf-8" })
      element.href = URL.createObjectURL(file)
      element.download = "CircleVis-SVG.svg"
      document.body.appendChild(element)
      element.click()
  }
  return (
    <Card className={classes.root}>
      <CardHeader
        title={title}
        subheader={name}
      />
      <CardContent>
        <div style={{ minWidth: 600, minHeight: 600, margin: 20 }} >
          {children}
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={downloadSvg} >
          Download
        </Button>

      </CardActions>

    </Card>
  );
}