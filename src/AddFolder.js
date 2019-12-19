import React from 'react'
import { Link } from 'react-router-dom'
import config from './config'
import NotefulContext from './NotefulContext'
import ValidationError from './ValidationError'
import './AddFolder.css'

class AddFolder extends React.Component {
    static contextType = NotefulContext;

    state = {
        folder_name: {
            value: '',
            touched: false
        },
        error: null,
    }

    validateName() {
        const name = this.state.folder_name.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        } else if (name.length < 3) {
          return 'Name must be at least 3 characters long';
        }
    }

    updateFolderName(name) {
        this.setState({
            folder_name: {
                value: name,
                touched: true,
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const folder = {
            folder_name: this.state.folder_name.value,
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
                    folder_name: {
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
                    <label htmlFor='folder_name'>Folder Name:</label>
                    {' '}
                    <input 
                        type='text'
                        name='folder_name'
                        id='folder_name'
                        placeholder='My Folder'
                        onChange={e => this.updateFolderName(e.target.value)}
                    />
                    </div>

                    {this.state.folder_name.touched && (
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