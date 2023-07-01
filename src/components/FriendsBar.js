import ChatListItem from "./ChatsListItem";
import axios from "axios";
import '../style/FriendsBar.css'

export default function FriendsBar({
                                       friends,
                                       setFriends,
                                       loggedUser,
                                       setInitialChat,
                                       setReceiver,
                                       updateMessages,
                                       chatList,
                                       handleSelectChat
                                   }) {
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
                setInitialChat(false)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getFriendsItems = () => {
        if (friends && friends.length > 0) {
            return friends.map((friend, idx) => {
                return <ChatListItem
                    key={friend.username}
                    loggedUser={loggedUser}
                    chatUser={friend}
                    setReceiver={setReceiver}
                    setInitialChat={setInitialChat}
                    updateMessages={updateMessages}
                    onSelect={() => handleSelectChat(friend.username)}
                    isSelected={chatList.selectedChat === friend.username}
                />
            })
        } else {
            return <div>Inserisci il tuo primo amico!</div>
        }
    }

    return (
        <div id="friends-bar">
            <form onSubmit={onAddFriend}>
                <input type="text"/>
                <input type="submit" value="+"/>
            </form>
            {getFriendsItems()}
        </div>
    )
}