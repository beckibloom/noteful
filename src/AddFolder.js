import React from 'react'
import { Link } from 'react-router-dom'
import config from './config'
import NotefulContext from './NotefulContext'
import ValidationError from './ValidationError'
import './AddFolder.css'

class AddFolder extends React.Component {
    static contextType = NotefulContext;

    state = {
        folderName: {
            value: '',
            touched: false
        },
        error: null,
    }

    createId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    validateName() {
        const name = this.state.folderName.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        } else if (name.length < 3) {
          return 'Name must be at least 3 characters long';
        }
    }

    updateFolderName(name) {
        this.setState({
            folderName: {
                value: name,
                touched: true,
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const newFolderId = this.createId()
        const folder = {
            id: newFolderId,
            name: this.state.folderName.value,
        }

        fetch(config.folders_endpoint, {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error
                    })
                }
                return res.json()
            })
            .then(data => {
                this.setState = {
                    folderName: {
                        value: '',
                        touched: false
                    },
                    error: null
                }
                this.props.history.push('/')
                this.context.onAddFolder(data)
            })
            .catch(error => {
                this.setState = { error }
            })
    }

    render() {
        const { error } = this.state
        return (
            <div className="addfolder">
                <h3>New Folder</h3>

                <form
                    className='AddFolder__form'
                    onSubmit={this.handleSubmit}>

                    <div className='AddFolder__error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>

                    <div>
                    <label htmlFor='foldername'>Folder Name:</label>
                    {' '}
                    <input 
                        type='text'
                        name='foldername'
                        id='foldername'
                        placeholder='My Folder'
                        onBlur={e => this.updateFolderName(e.target.value)}
                    />
                    </div>

                    {this.state.folderName.touched && (
                        <ValidationError message={this.validateName()} />
                    )}

                    <div className='AddFolder__buttons'>
                    <Link to='/'>
                        <button type='button'>
                        Cancel
                        </button>
                    </Link>
                    {' '}
                    <button 
                        type='submit'
                        disabled={this.validateName()}>
                    Save
                    </button>
                    </div>

                </form>
            </div>
        )
    }
}

export default AddFolder