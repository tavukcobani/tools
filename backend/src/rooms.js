const rooms = [];

const join = (userId, name, roomId, role) => {
    const existingRoom = getRoom(roomId);
    if (existingRoom) {
        return addUserToExistingRoom(existingRoom, userId, name, role);
    } else {
        return createNewRoomForUser(userId, name, roomId, role);
    }
};

const remove = (userId) => {
    const room = rooms.find((room) => { return room.users.some(user => { return user.id == userId }); })
    if (room) {
        room.users = room.users.filter((usr) => { return usr.id !== userId });
    }
    return room;
};

const addUserToExistingRoom = (room, userId, name, role) => {
    const user = room.users.find((user) => user.name == name);

    if (user) {
        return { error: `there is already a user called ${user.name} in this room` };
    }

    room.users.push({ id: userId, name: name , role: role});
    return { room };
}

const createNewRoomForUser = (userId, name, roomId, role) => {
    const room = { id: roomId, users: [{ id: userId, name: name, role: role }] };

    rooms.push(room);
    return { room };
}

const getRoom = (roomId) => {
    if (rooms) {
        return rooms.find((room) => room.id == roomId);
    }
    else {
        return { users: [] }
    }
};

module.exports = { join, remove };