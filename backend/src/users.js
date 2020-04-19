const users = [];

const addUser = ({id, name, room}) => {
    const userExist = users.find((user) => user.room === room && user.name === name);
    if (userExist) {
        return {error: 'user is exist'};
    }

    const user = {id, name, room};
    users.push(user);
    return {user};

};

const getUser = (id) => {
    return users.find((user) => user.id === id);
};

module.exports = { addUser, getUser };