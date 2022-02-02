import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { useHistory } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Register() {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [dataDeNascimento, setDataDeNasciemnto] = useState('');
    const [telefone, setTelefone] = useState('');
    const [sus, setSus] = useState('');
    const [logadouro, setLogadouro] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            cpf: cpf,
            senha: senha,
            dataDeNascimento: dataDeNascimento,
            telefone: telefone,
            endereco: {
                logadouro: logadouro,
                numero: numero,
                bairro: bairro,
                cep: cep,
                cidade: {
                    nome: cidade,
                },
            },

        }

        await api.post('usuarios', data)
            .then(response => {
                successNotification('Cadastrado com Sucesso!')
                history.push('/')
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


        //   history.push('/')


    }

    useEffect(() => {

        axios.get(`https://viacep.com.br/ws/${cep}/json/`)

            .then(response => {
                console.log(response)
                setLogadouro(response.data.logradouro)
                setCidade(response.data.localidade)
                setBairro(response.data.bairro)
                setUf(response.data.uf)
            })

            .catch((response) => {

            })
    }, [cep]);


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
                        <h1>Cadastro</h1>
                        <p>Faça seu cadastro, entre na plataforma e agende sua vacinação em uma unidade atendimento mais próxima.</p>

                    </section>

                    <form onSubmit={handleRegister}>

                        <input placeholder="Nome"
                            value={nome}
                            required
                            onChange={e => setNome(e.target.value)}
                        />
                        <input placeholder="Sobrenome"
                            value={sobrenome}
                            required
                            onChange={e => setSobrenome(e.target.value)}
                        />

                        <input type="email" placeholder="E-mail"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <input type="number" placeholder="CPF"
                            required
                            value={cpf}
                            onChange={e => setCpf(e.target.value)}
                        />
                        <input type="password" placeholder="Senha"
                            required
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                        />

                        <input type="text" placeholder="Data de Nascimento"
                            required
                            value={dataDeNascimento}
                            onChange={e => setDataDeNasciemnto(e.target.value)}


                            onFocus={_onFocus} onBlur={_onBlur} />

                        <input type="number" placeholder="Telefone"
                            required
                            value={telefone}
                            onChange={e => setTelefone(e.target.value)}
                        />
                        <input type="number" placeholder="N° Cartão SUS"
                            required
                            value={sus}
                            onChange={e => setSus(e.target.value)}
                        />
                        <div className="input-group">
                            <input placeholder="Rua"
                                required
                                value={logadouro}
                                onChange={e => setLogadouro(e.target.value)}
                            />
                            <input placeholder="Numero" style={{ width: 130 }}
                                required
                                value={numero}
                                onChange={e => setNumero(e.target.value)}
                            />

                        </div>


                        <div className="input-group">
                            <input placeholder="Bairro" style={{ width: 220 }}
                                required
                                value={bairro}
                                onChange={e => setBairro(e.target.value)}
                            />

                            <input placeholder="Cidade"
                                value={cidade}
                                onChange={e => setCidade(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <input placeholder="CEP"
                                required
                                value={cep}
                                onChange={e => setCep(e.target.value)}
                            />


                            <input placeholder="UF" style={{ width: 80 }}
                                required
                                value={uf}
                                onChange={e => setUf(e.target.value)}
                            />

                        </div>



                        <button className="button" type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>

        </>

    )

}