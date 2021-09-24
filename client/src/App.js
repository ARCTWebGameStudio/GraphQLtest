
import './App.css';
import {useEffect, useState} from "react";
import {getDirectiveValues} from "graphql";
import {useQuery} from "@apollo/client";
import {GET_ALL_USERS} from "./query/user";

const App = () => {
const {data, loading, error} = useQuery(GET_ALL_USERS)
  const [users, setUsers] = useState([])
console.log(data)
    useEffect(() => {

    }, [data])

  return (
    <div className='main'>
      <form>
        <input type="text"/> <br/>
        <br/>
        <input type="number"/> <br/>

        <div>
          <button>Create user</button>
          <button>Get users</button>
        </div>
      </form>
      <div>
          {users.map(user =>
            <div>
                {user.id} {user.username} {user.age}
            </div>
          )}
      </div>
      
    </div>
  );
}

export default App;
