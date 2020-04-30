import React, { useState, useEffect } from 'react';
import './App.css';
import { ApiService } from './services/ApiService';

function App() {

  const [users, setUsers] = useState<any[]>([]);

  const service = new ApiService();

  useEffect((): void => {
    service.get('users').then((data: any) => {
      if (!data || !data.users || !data.users.length)
        return;     

      setUsers(data.users);
    });
  }, []);

  function handleClick(id: string): any  {
    service.get(`/users/${id}/contact_methods`).then((data: any) => {
      
      const usersCopy: any[] = users.map((u: any) => {
        return {...u};
      });

      const idx = usersCopy.findIndex((u: any) => u.id === id);     
      usersCopy[idx].contactMethods = data.contact_methods;
      
      setUsers(usersCopy);

      console.log(`contact method for ${id}`, data);
      console.log("users", users);
    });
  }

  return (
    <div className="App">
      <div>
        <p>Results</p>
        {users.map((item: any) => {
           return (
             <div key={item.id}>
              <p><button onClick={() => handleClick(item.id)}>{item.name}</button></p>
              <ul>{item.contactMethods ? item.contactMethods.map((cm:any) => {
                return (
                  
                    <li key={cm.id}>{`${cm.type}: ${cm.address}`}</li>
                  
                );
              }) : null}</ul>
             </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
