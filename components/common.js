export const blurhash =
'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const getRoomId = (firstUserId, secondUserId) => {
    const sortedIds = [firstUserId, secondUserId].sort();
    const roomId = sortedIds.join('-');
    return roomId;
}

export const formDate = date => {
    var day = date.getDate();
    var monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var month = monthNames[date.getMonth()];
    var formattedDate = day +' ' + month;
    return formattedDate;
}