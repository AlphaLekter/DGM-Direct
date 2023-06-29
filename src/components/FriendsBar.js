import ChatItem from "./ChatsListItem";
import axios from "axios";

export default function FriendsBar({friends, setFriends, loggedUser, setFriendless}) {
    const onAddFriend = (event) => {
        event.preventDefault()
        let friend_input = event.target.firstElementChild
        let body = {
            username: loggedUser,
            newFriend: friend_input.value
        }
        axios.post(`http://localhost:3001/api/users/addFriend`, body)
            .then(res => {
                console.log(`Amico aggiunto: ${res.data}`)
                setFriends([...friends, res.data])
                friend_input.value = ""
                setFriendless(false)
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div id="friends-bar">
            <h3> Amici di {loggedUser} </h3>
            <form onSubmit={onAddFriend}>
                <input type="text"/>
                <input type="submit" value="+"/>
            </form>
            {friends.map((friend, idx) =>
                <ChatItem key={"friend" + idx} chatUser={friend}/>
            )}
        </div>
    )
}