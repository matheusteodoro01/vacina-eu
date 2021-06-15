import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import './styles.css';
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export default function Logon() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const token = localStorage.getItem('Authorization');

    async function handleLogin(e) {
        e.preventDefault();
       
        const data = {
            email,
            senha
        } 
        
        function  errorNotification(message) {
            toast.error(message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        await api.post('login', data)

            .then((response) => {
                localStorage.setItem("Email", email)
                localStorage.setItem("Authorization", response.headers.authorization)
                api.defaults.headers['Authorization'] = `${response.headers.authorization}`
                history.push('/profile')  
            })
            .catch(erro => { 
                errorNotification("Usuario ou senha inválidos!")
            })      

    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {/* Same as */}
            <ToastContainer />

            <div className="logon-container">
                <section className="form">
                    <img src={logoImg} alt="Be The Hero" />


                    <form onSubmit={handleLogin}>
                        Bem-vindo ao Vacina Eu
                        Este é o canal de atendimento para agendar sua vacina de forma simples facil!
                        <h1>Faça seu logon</h1>
                        <input placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <input placeholder="Senha"
                            type="password"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                        />
                        <button className="button" type="submit">Entrar</button>
                        <Link to="/register" className="back-link">
                            <FiLogIn size={16} color="#e02041" />
                            Não tenho Cadastro
                        </Link>
                    </form>

                </section>



                <img src={heroesImg} alt="heroes" />
            </div>

        </>

    )
}
