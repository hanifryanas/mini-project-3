import React, {useState, useEffect} from 'react';
import './TableUser.css';

const TableUser = ({userList, handleEditUser, handleDeleteuser}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');

    useEffect(() => {
        setUserName(userList.username)
        setUserEmail(userList.email)
        setUserPassword(userList.password)
    }, [userList])

    const handleName = (e) => {
        const val = e.target.value;
        setUserName(val)
    }

    const handleEmail = (e) => {
        const val = e.target.value;
        setUserEmail(val)
    }

    const handlePassword = (e) => {
        const val = e.target.value;
        setUserPassword(val)
    }

    const handleConfirmPassword = (e) => {
        const val = e.target.value;
        setUserConfirmPassword(val)
    }

    const handleValidation = () => {
        if ((userName === '' || userEmail === '' || userPassword === '' || userConfirmPassword === '') && userPassword !== userConfirmPassword) {
            return false;
        } else {
            return true;
        }
    }

    const handleEdit= (id) => {
        setIsEdit(true)
        const user = userList.find(user => user.id === id)
        setUserId(user.id);
        setUserName(user.username);
        setUserEmail(user.email);
        setUserPassword(user.password);
    }

    const handleDelete = (id) => {
        handleDeleteuser(userList.find(user => user.id === id));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(handleValidation()) {
            const editedUser = {
                id: userId,
                username: userName,
                email: userEmail,
                password: userPassword
            }
            handleEditUser(editedUser);
            setIsEdit(false);
        } else {
            alert('Please fill all the fields')
        }
    }

    return (
        <div className="table-user-container">
            {isEdit ? 
            <form onSubmit={handleSubmit}>
                <h2>Edit User</h2>
                <div className="form-container">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={userName} onChange={handleName} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={userEmail} onChange={handleEmail} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={userPassword} onChange={handlePassword} />
                </div>
                <div className="form-group"> 
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" value={userConfirmPassword} onChange={handleConfirmPassword} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            :
            <div className="table-user-container">
                <h2>User List</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map(user => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleEdit(user.id)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            }
        </div>
    );
}

export default TableUser