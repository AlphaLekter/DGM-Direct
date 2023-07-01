import React, {useContext} from 'react'
import Cookie from 'universal-cookie'
import '../style/Navbar.css'

export default function Navbar({selectedTab}) {
    const cookie = new Cookie()

    return (
        <div className="navbar">
            {/*<img src={currentUser.photoURL} alt="" className="imgProfile"/>*/}
            {/*<h4 className="user">{cookie.get("Username")}</span>*/}
            <div className="user">
                {selectedTab === "C" && <>Le tue chat</>}
                {selectedTab === "F" && <>I tuoi amici</>}
                {selectedTab === "N" && <>Notifiche</>}
            </div>
        </div>
    )
}