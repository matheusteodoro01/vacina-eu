import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import './styles.css';
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api';



export default function Logon() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');



    async function handleLogin(e) {
        e.preventDefault();

        const data= {
            email,
            senha
        }
        await api.post('login',data)

        .then((response)=>{
            localStorage.setItem("Email",email)
            localStorage.setItem("Authorization",response.headers.authorization)
            history.push('/profile')

        })
        .catch(erro=>{
            console.log(erro)
        })


    }
    return (
        <>

            <div className="logon-container">
                <section className="form">
                    <img src={logoImg} alt="Be The Hero" />


                    <form onSubmit={handleLogin}>
                        Bem-vindo ao Vacina Eu
                        Este é o canal de atendimento para agendar sua vacina de forma simples facil!
                        <h1>Faça seu logon</h1>
                        <input placeholder="Email ou CPF"
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
