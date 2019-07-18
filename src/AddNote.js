import React from 'react'
import { Link } from 'react-router-dom'
import config from './config'
import NotefulContext from './NotefulContext'
import ValidationError from './ValidationError'
import './AddNote.css'

class AddNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            noteName: {
                value: '',
                touched: false,
            },
            folderId: {
                value: '',
                touched: false,
            },
            noteContent: {
                value: '',
                touched: false,
            },
            error: null,
        }
    }

    static contextType = NotefulContext;

    createId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    updateNoteName(name) {
        this.setState({
            noteName: {
                value: name,
                touched: true,
            }
        })
    }

    validateName() {
        const name = this.state.noteName.value.trim();
        if (name.length === 0) {
            return 'Note name is required';
        } else if (name.length < 3) {
            return 'Note name must be at least 3 characters long';
        }
    }

    updateContent(content) {
        this.setState({
            noteContent: {
                value: content,
                touched: true,
            }
        })
    }

    validateContent() {
        const content = this.state.noteContent.value.trim();
        if (content.length === 0) {
            return 'Note content may not be left blank'
        }
    }

    updateFolderSelect(folderId) {
        this.setState({
            folderId: {
                value: folderId,
                touched: true,
            }
        })
    }

    validateFolder() {
        const folder = this.state.folderId.value;
        if (folder === 'none') {
            return 'Please select a folder for your new note'
        }
    }
    
    getCurrentFolders = () => {
        const folderOptions = this.context.folders.map(folder => (
            <option value={folder.id} key={folder.id}>
                {folder.name}
            </option>
        ))
        return folderOptions
    }

    handleSubmit = e => {
        e.preventDefault()
        const newNoteId = this.createId()
        // const modifiedDate = new Date()
        const modifiedDate = new Date()
        // Hard-coded folder ID to be replaced by folder selection. Hard-coded ID links to "Important" folder
        const newNote = {
            id: newNoteId,
            name: this.state.noteName.value,
            modified: modifiedDate,
            folderId: this.state.folderId.value,
            content: this.state.noteContent.value,
        }

        fetch(config.notes_endpoint, {
            method: 'POST',
            body: JSON.stringify(newNote),
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
                    noteName: {
                        value: '',
                        touched: false,
                    },
                    folderId: {
                        value: '',
                        touched: false,
                    },
                    noteContent: {
                        value: '',
                        touched: false,
                    },
                    error: null,
                }
                this.props.history.push('/')
                this.context.onAddNote(data)
            })
            .catch(error => {
                this.setState = { error }
            })
    }

    render() {
        const { error } = this.state
        return (
            <div className="addnote">
                <h3>New Note</h3>

                <form
                    className='AddNote__form'
                    id='add-note-form'
                    onSubmit={this.handleSubmit}>

                    <div className='AddFolder__error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>

                    <div>
                    <label htmlFor='notename'>Note Name:</label>
                    {' '}
                    <input 
                        type='text'
                        name='notename'
                        id='notename'
                        placeholder='My Note'
                        onChange={e => this.updateNoteName(e.target.value)}
                        required
                    />
                    
                    {this.state.noteName.touched && (
                        <ValidationError message={this.validateName()} />
                    )}

                    <br />

                    <label htmlFor='folderselect'>
                        Add note to folder:
                    </label>
                    {' '}
                    <select 
                        name='folderselect' id='folderselect'
                        onChange={e => this.updateFolderSelect(e.target.value)}>
                        <option value='none'>Select one</option>
                        {this.getCurrentFolders()}
                    </select>

                    {this.state.folderId.touched && (
                        <ValidationError message={this.validateFolder()} />
                    )}

                    <br />

                    <label htmlFor='notecontent'>Note Content:</label>
                    <br/>
                    <textarea 
                        name='notecontent'
                        id='notecontent'
                        form='add-note-form'
                        rows='10'
                        cols='45'
                        onChange={e => this.updateContent(e.target.value)}
                        required
                    />
                    </div>

                    {this.state.noteContent.touched && (
                        <ValidationError message={this.validateContent()} />
                    )}

                    <div className='AddNote__buttons'>
                        <Link to='/'>
                            <button type='button'>
                            Cancel
                            </button>
                        </Link>
                        {' '}
                        <button 
                            type='submit'
                            disabled={
                                this.validateName() ||
                                this.validateContent() ||
                                this.validateFolder()
                            }>
                        Save
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddNote