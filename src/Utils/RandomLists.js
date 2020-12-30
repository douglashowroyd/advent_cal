
export default RandomList;

function RandomList(){

    const today = Date.now()


    const toEnable = range(25, 1).map( day => {
        return daysDiff(today, new Date(2020, 11, day)) <= 0;
    })

    const randomList = range(24, 1).sort(() => Math.random() - 0.5)

    return {
        toEnable: toEnable,
        randomList: randomList
    }
}

function daysDiff(start, end) {
    return  Math.round((end-start)/(1000*60*60*24))
}

function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}
