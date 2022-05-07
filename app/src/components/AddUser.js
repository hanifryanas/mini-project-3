import React, {useState} from 'react'
import './AddUser.css'

const AddUser = ({handleAddUser}) => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const handleName = (e) => {
        const val = e.target.value;
        setUser({...user, username: val});
    }
    const handleEmail = (e) => {
        const val = e.target.value;
        setUser({...user, email: val});
    }
    const handlePassword = (e) => {
        const val = e.target.value;
        setUser({...user, password: val});
    }
    const handleConfirmPassword = (e) => {
        const val = e.target.value;
        setUser({...user, confirmPassword: val});
    }
    const handleValidation = () => {
        if ((user.username === '' || user.email === '' || user.password === '' || user.confirmPassword === '') && user.password !== user.confirmPassword) {
            return false;
        } else {
            return true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const newUser = {
                username: user.username,
                email: user.email,
                password: user.password,
            }
            handleAddUser(newUser);
            setUser({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
        } else {
            alert('Please fill all the fields');
        }
    }

  return (
    <div className="add-user-container">
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter name" value={user.username} onChange={handleName} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" placeholder="Enter email" value={user.email} onChange={handleEmail} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={user.password} onChange={handlePassword} />
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" value={user.confirmPassword} onChange={handleConfirmPassword} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default AddUser