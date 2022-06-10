import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import OutlinedInput from '@material-ui/core/OutlinedInput';


export default function MinusPlusInput({ onChangeValue, initValue}) {

    const [counter, setCounter] = React.useState(initValue)

   const handleIncrement = () => {
        setCounter(parseInt(counter) + 1)
        onChangeValue(counter)
    };

   const handleDecrement = () => {
       setCounter(parseInt(counter) - 1)
        onChangeValue(counter)
    };
   const handleChange = (event) => {
        setCounter(event.target.value)
        onChangeValue(counter)
    };
    /*
    <OutlinedInput
            id="outlined-adornment-weight"
            value={counter}
            onChange={handleChange}
            labelWidth={0}
            type ={'number'}
          />
    */

    return (
        <ButtonGroup size="small" aria-label="small outlined button group">
            <Button onClick={handleIncrement}>+</Button>
            <Button>{counter}</Button>
            <Button onClick={handleDecrement}>-</Button>
        </ButtonGroup>
    )
}