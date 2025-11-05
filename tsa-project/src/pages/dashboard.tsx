import image from '../assets/react.svg';

export default function Dashboard() {
    return (
        <>
            <div>
                {/*
                Put profile pic here
                Replace "image" with default profile pic if they haven't set one
                or get it from backend if they have set one previously
                */}
                <img src={image}/>
                <h1>Welcome user_name{/*Replace "user_name" with name here*/}</h1>
                {/*Connect to backend here*/}
                <h1>Today's events</h1>
                <div>
                    {/*
                    List today's events here:
                    You can put them in cards or a table
                    Maybe a calander too
                    */}
                </div>
                <h1>Upcoming Events</h1>
                <div>
                    {/*
                    List upcoming events here
                    Same as above:
                    You can put them in cards or a table
                    Maybe a calander too
                    */}
                </div>
            </div>    
        </>
    );
    }