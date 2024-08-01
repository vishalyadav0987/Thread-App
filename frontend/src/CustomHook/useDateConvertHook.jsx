const useDateConvertHook = () => {
    const functionToConvertDate = (databaseDate) => {
        const dateAndTime = new Date(databaseDate);
        const time = dateAndTime.toLocaleTimeString().split(":")
        const AmPm = dateAndTime.toLocaleTimeString().split(" ")
        const hr = time[0];
        const min = time[1];
        const merdian = AmPm[1];
        return `${hr}:${min} ${merdian}`
    }

    return { functionToConvertDate }
}

export default useDateConvertHook;
