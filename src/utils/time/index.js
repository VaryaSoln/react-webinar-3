function formatTime(time) {
    const dateObj = new Date(time);

    const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ];
    const formatedTime = `${dateObj.getDate()} ${months[dateObj.getMonth() - 1]} ${dateObj.getFullYear()} в ${dateObj.getHours()}:${dateObj.getMinutes() < 10 ? "0" + dateObj.getMinutes() : dateObj.getMinutes()}`;
    return formatedTime;
}

export default formatTime;