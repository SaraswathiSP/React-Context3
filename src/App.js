import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ age: 20, name: 'John' });

  const updateUser = (newAge, newName) => {
    setUser((prevUser) => ({ ...user, name: newName, age: newAge }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

const UserConsumer = () => {
  const { user, updateUser } = useContext(UserContext);
  const [newName, updateName] = useState();
  const [newAge, updateAge] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(newAge, newName);
  };

  return (
    <>
      <div>
        name : {user.name}, age: {user.age}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newName}
          onChange={(e) => updateName(e.target.value)}
        />
        <input
          type="number"
          value={newAge}
          onChange={(e) => updateAge(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

const App = () => {
  return (
    <UserProvider>
      <UserConsumer />
    </UserProvider>
  );
};

export default App;
