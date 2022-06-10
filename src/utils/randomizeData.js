import * as d3 from 'd3';


export default function randomizeData(size = 10) {
    let color = d3.scaleLinear()
        .domain([0, size])
        .range(["dodgerblue", "tomato"])
    //  .interpolate(d3.interpolateHcl);
    let result = []
    for (let i = 0; i < size; i++) {
        let text = randomText(getRandomInt(1, 10))
        result[i] = {
            id: i,
            label: text,
            value: Math.random(),
            fontSize : 0 ,
            color: color(i), // change this to see better colors ,
            children: null
        }
    }
    return normilizeData(result)
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        array[currentIndex].id = currentIndex
    }

    return array;
}

export const reinitData = (data)=> {
    data.forEach((e, i) => {
        e.id = i 
    })
}
export const parseFileData = (data)=> {
    let result  = [] 
    let color = d3.scaleLinear()
        .domain([0, data.length])
        .range(["dodgerblue", "tomato"])
    shuffle(result)
    data.forEach((e, i) => {
       result.push({
            id : i,
            label :  e.label ,
            value : e.value ,
            fontSize: (e.fontSize != null || e.fontSize != undefined) ? e.fontSize : 0,
            color: (e.color != null || e.color != undefined) ? e.color : color(i), 
            children: (e.children != null || e.children != undefined) ? e.children : null
       })
    })
    console.log(normilizeData(result))
    result.sort((a, b) => {
        return b.value - a.value
    }
    );
   // result = result.slice(0, 16)
    shuffle(result) 
    return normilizeData(result)
}
const randomText = (size) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < size; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

export const normilizeData = (data) => {
    let size = data.length
    let sum = 0
    for (let i = 0; i < size; i++) {
        sum += data[i].value
    }
    for (let i = 0; i < size; i++) {
        data[i].value /= sum
    }
    reinitData(data)
    return data
}

export function mergeData(data, mergedData) {
    if(mergedData.length < 2 ){
        return
    }
    let newData = []
    let sumIndex = {
        label: '',
        value: 0
    }
    for (let i = 0; i < mergedData.length; i++) {
        sumIndex.value += mergedData[i].value
        sumIndex.label += mergedData[i].label
    }
    let maxId = 0
    data.forEach(item => {
        let bool = false
        mergedData.forEach(merged => {
    
            if (item.id === merged.id) {
                bool = true;
            }
        })
        if (!bool) {
            newData.push(item)
        }
        if (item.id > maxId) {
            maxId = item.id;
        }
    })
    const mergedItem = {
        id: maxId + 1,
        label: sumIndex.label,
        value: sumIndex.value,
        fontSize: 0 ,
        color: mergedData[0].color,
        children: mergedData
    }
    newData.push(mergedItem)
    return newData
}

export function spliteData(data, splitedItems) {
    let newData = [...data]
    console.log(splitedItems)

    splitedItems.forEach(element => {
        console.log(newData.indexOf(element))
        newData.splice(newData.indexOf(element))
        element.children.forEach(e => {
            newData.push(e)
        })

    })
    reinitData(newData)
    return newData

}