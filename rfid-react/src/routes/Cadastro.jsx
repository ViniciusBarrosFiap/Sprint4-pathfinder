import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from "../img/logo1.png"
import { useState, useEffect } from 'react';
import axios from "axios"
function Cadastro() {
    const [uid, setUid] = useState("")
    const [nome, setNome] = useState("")
    const [username, setUsername] = useState("")
    const [userGit, setUserGit] = useState("")
    const [mensagemSucesso, setMensagemSucesso] = useState(null);
    const [mensagemErro, setMensagemErro] = useState(null);
    const recuperaUid = async () => {
        const config = {
            headers: {
                'fiware-service': 'smart',
                'fiware-servicepath': '/',
                'accept': 'application/json'
            }
        }
        try {
            const response = await axios.get("http://46.17.108.113:1026/v2/entities/urn:ngsi-ld:Pathfinder/attrs/uid", config);
            setUid(response.data.value)
        } catch (erro) {
            console.log(erro)
        }
    }
    const infosCadastro = {
        "id": uid,
        "nome": nome,
        "username": username,
        "imagem": `http://github.com/${userGit}.png`
    }
    const cadastraTag = (informacoes)=>{
        axios.post("http://localhost:3000/tags", informacoes)
        .then(()=>{
            setMensagemSucesso("Cadastrado com sucesso!")
        })
        .catch(()=>{
            setMensagemErro("Falha ao cadastrar, tente outra tag")
        })
    }


    useEffect(() => {
        recuperaUid()
    }, [])
    return (
        <section style={{ height: "100vh", backgroundColor: "#0E4B4F" }}>
            <div className="d-flex justify-content-center" style={{}}>
                <img src={logo} alt="" />
            </div>
            <div className='container'>
                <div className='container'>
                    <Form.Label className='text-white' htmlFor="inputNome">Nome</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputNome"
                        aria-describedby="passwordHelpBlock"
                        onBlur={(e) => setNome(e.target.value)}
                    />
                    <Form.Text className='text-white' id="passwordHelpBlock" muted>
                        <p className='text-white'>Digite seu nome</p>
                    </Form.Text>
                </div>
                <div className='container'>
                    <Form.Label className='text-white' htmlFor="inputUsername">Username</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputUsername"
                        aria-describedby="passwordHelpBlock"
                        onBlur={(e) => setUsername(e.target.value)}
                    />
                    <Form.Text className='text-white' id="passwordHelpBlock" muted>
                        <p className='text-white'>Digite seu username</p>
                    </Form.Text>
                </div>
                <div className='container'>
                    <Form.Label className='text-white' htmlFor="inputUsernameGit">Username GitHub</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputUsernameGit"
                        aria-describedby="passwordHelpBlock"
                        onBlur={(e) => setUserGit(e.target.value)}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                        <p className='text-white'>Digite seu user do github</p>
                    </Form.Text>
                </div>
                <div className='container d-flex justify-content-center'>
                    <Button onClick={()=>cadastraTag(infosCadastro)} className="p-2 px-5 text-black" style={{ backgroundColor: "#F7DE09", border: "none" }} variant="primary">Cadastrar</Button>{' '}
                </div>
                <div className='container'>
                    <h1 className='d-flex justify-content-center mt-4 text-white'>{mensagemSucesso}</h1>
                    <h2 className='d-flex justify-content-center mt-4 text-white'>{mensagemErro}</h2>
                </div>
            </div>
        </section>
    );
}

export default Cadastro;