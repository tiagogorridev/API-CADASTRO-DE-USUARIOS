import { useEffect, useState, useRef } from "react"
import "./style.css"
import Trash from "../../assets/trash.svg"
import api from '../../services/api'



function Home() {
  const [users, setUsers] = useState([]) /* Estado do React */

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()


  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    try {
      await api.post('/usuarios', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value
      });
  
      // After successfully creating the user, update the list of users
      getUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error (e.g., show an alert to the user)
    }
  }
  
  async function deleteUsers(id) {
    try {
      await api.delete(`/usuarios/${id}`);
      // After successfully deleting the user, update the list of users
      getUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error (e.g., show an alert to the user)
    }
  }
  
  


  useEffect(() => {
    getUsers();
  }, []);
  


  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuarios</h1>
        <input placeholder="Nome..." type="text" name="nome" ref={inputName}/>
        <input placeholder="Idade..." type="number" name="idade" ref={inputAge}/>
        <input placeholder="E-mail..." type="email" name="email" ref={inputEmail}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome:  <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button className="trash" onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
