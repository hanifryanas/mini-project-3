import React, {useState, useEffect} from 'react'
import './UserContainer.css'
import axios from 'axios'
import AddUser from './AddUser'
import TableUser from './TableUser'

const UserContainer = () => {
    const [userList, setUserList] = useState([])

    useEffect(() => {
        updateUser()
    }, [])

    const updateUser = () => {
        axios.get('http://localhost:3100/users/').then(response => {
            if (response.data.length > 0) {
                setUserList(response.data)
            }
        }).catch((error) => {
            alert("Error:", error)
        })
    }

    const handleAddUser = (newUser) => {
        axios.post('http://localhost:3100/users/', newUser).then(() => {
            updateUser()
        }).catch((error) => {
            alert("Error:", error)
        })
    }

    const handleEditUser = (editedUser) => {
        axios.put(`http://localhost:3100/users/${editedUser.id}`, editedUser).then(() => {
            updateUser()
        }).catch((error) => {
            alert("Error:", error)
        })
    }

    const handleDeleteUser = (user) => {
        axios.delete(`http://localhost:3100/users/${user.id}`).then(() => {
            updateUser();
        }).catch((error) => {
            alert("Error:", error)
        })
    }

    return (
        <section className='table-container'>
            <AddUser handleAddUser={handleAddUser} />
            <TableUser userList={userList} handleEditUser={handleEditUser} handleDeleteUser={handleDeleteUser} />
        </section>
    )
}

export default UserContainer