import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default () => {
    const [id, setId] = useState('')
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()
        api.post('sessions', { id })
            .then(response => {
                console.log(`ONG confirmada, ${response.data.ong.name}`)
                localStorage.setItem('ongId', id)
                localStorage.setItem('ongName', response.data.ong.name)
                history.push('/profile')
            })
            .catch(err => alert(`Falha no Login: ${err}`))
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="logo" />
                <form onSubmit={handleLogin}>
                    <h1>Faça o seu logon</h1>
                    <input
                        type="text"
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="heroes" />
        </div>
    )
}