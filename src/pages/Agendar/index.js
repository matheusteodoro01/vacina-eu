import React, { useState, useEffect } from 'react';
import './styles.css';
import { useHistory } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function Agendar() {
    const [data, setData] = useState('');
    const [usuario, setUsuario] = useState('');
    const [observações, setObservacoes] = useState('');
    const [unidadeAtendimento, setUnidadeAtendimento] = useState('');
    const [unidadesAtendimento, setUnidadesAtendimento] = useState([]);
    const history = useHistory();
    const token = localStorage.getItem('Authorization')
    const email = localStorage.getItem('Email')


    if (!token) {
        history.push('/')
    }
    useEffect(() => {


        api.get(`usuarios/findByEmail?email=${email}`, {
        }).then(response => {
            setUsuario(response.data.id)

        })
        api.get(`unidade_atendimento`, {
        }).then(response => {
            setUnidadesAtendimento(response.data)

        })
    }, [token]);
    async function handleRegister(e) {
        e.preventDefault();

        const dados = {

            data,
            usuario,
            observações,
            unidadeAtendimento: 1,


        }
       
        await api.post('agendamentos', dados)
            .then(response => {
                successNotification('Agendamento realizado com sucesso!')
                history.push('/profile')

            })

            .catch(err => {
                errorNotification(err.response.data.message)
      

            }
            )




        function successNotification(message) {
            toast.success(message, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        function errorNotification(message) {
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

            <div className="register-container">
                <div className="content">

                    <section>
                        <img src={logoImg} alt="Be The Hero" />
                        <h1>Agendar</h1>
                        <p>Faça seu cadastro, entre na plataforma e agende sua vacinação em uma unidade atendimento mais próxima.</p>

                    </section>

                    <form onSubmit={handleRegister}>

                        <input type="text"
                            value={observações}
                            placeholder="Tipo de Vacina"
                            list="data"
                            onChange={e => setObservacoes(e.target.value)} />

                        <datalist id="data">
        
                            <option value="Febre amarela" />
                            <option value="Gripe" />
                            <option value="Hepatites A e B" />
                            <option value="HPV" />
                            <option value="Tríplice bacteriana" />
                            <option value="Covid-19" />
                        </datalist>
                       


                        <select
                        value={unidadeAtendimento}
                        
                        
                         >
                            {unidadesAtendimento.map(unidade =>
                            
                                <option key={unidade.id} value={unidade.id} >{unidade.nome}</option>
                            )}
                           
                        </select>


                        <input type="date" placeholder="Data de Vacinação"
                            required
                            value={data}
                            onChange={e => setData(e.target.value)}
                        />






                        <button className="button" type="submit">Agendar</button>
                    </form>
                </div>
            </div>


        </>
    )

}