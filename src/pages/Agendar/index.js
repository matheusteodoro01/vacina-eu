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
    const [finalizado, setFinalizado] = useState('');
    const [observações, setObservacoes] = useState('');
    const [unidadeAtendimento, setUnidadeAtendimento] = useState('');
    const history = useHistory();
    const token = localStorage.getItem('Authorization')
    if(!token){
        history.push('/')
    }
    useEffect(() => {

        
        api.get(`usuario`, {
            headers: {
                Authorization: token,
            }
        }).then(response => {


        })
    }, [token]);
    async function handleRegister(e) {
        e.preventDefault();
        const dados = {

            data,
            finalizado,
            usuario,
            observações,
            unidadeAtendimento,


        }

        await api.post('agendamentos',{
            header: {
                Authorization: token,
            }
        },dados)
            .then(response => {
                successNotification('Cadastrado com Sucesso!')
            })

            .catch(response => {
                console.log(response)
                errorNotification("Erro ao agendar vacina!",response)
            }
            )
        //   history.push('/')

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

    useEffect(() => {


    }, [token]);


    function _onFocus(e) {
        e.currentTarget.type = "date";
    }
    function _onBlur(e) {
        e.currentTarget.type = "text";
        e.currentTarget.placeholder = "Data de Nascimento";
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
                            {/* {vaccines.map((item, key) =>
                            <option key={key} value={item.displayValue} />


                        )} */}
                            <option value="Chrome" />
                        </datalist>
                        <input type="text"
                            value={unidadeAtendimento}
                            placeholder="Unidade de Atendimento"
                            list="data"
                            onChange={e => setUnidadeAtendimento(e.target.value)} />

                        <datalist id="data">
                            {/* {vaccines.map((item, key) =>
                            <option key={key} value={item.displayValue} />


                        )} */}
                            <option value="Chrome" />
                        </datalist>


                        <input type="text" placeholder="Data de Vacinação"
                            required
                            value={data}
                            onChange={e => setData(e.target.value)}
                            onFocus={_onFocus} onBlur={_onBlur} />






                        <button className="button" type="submit">Agendar</button>
                    </form>
                </div>
            </div>


        </>
    )

}