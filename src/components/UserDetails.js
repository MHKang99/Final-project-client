const UserDetails = (props) => {
    console.log(props)
    return (
        <div className="profile-container">
            <h1>Profile Page</h1>
            
            <img className="profile-pic" src={props.img} alt="ProfilePicture" />
            
            <h2 className="profile-name">
                {props.first_name} {props.last_name}
                <br />
            </h2>
        </div>
    )
}

export default UserDetails;