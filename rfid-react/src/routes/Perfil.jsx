import axios from "axios"
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import logo from "../img/logo1.png"
function Perfil() {
    const [uid, setUid] = useState("")
    const [usuario, setUsuario] = useState({})
    const[hora, setHora] = useState("")
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
            const dataOriginal = response.data.metadata.TimeInstant.value
            const dataFormatada = format(new Date(dataOriginal), 'dd/MM/yyyy - HH:mm:ss')
            setHora(dataFormatada)
        } catch (erro) {
            console.log(erro)
        }
    }
    const recuperaCadastro = useCallback(() => {
        axios.get(`http://localhost:3000/tags/${uid}`)
            .then((resposta) => {
                setUsuario(resposta.data);
            })
            .catch((erro) => {
                console.log(erro);
            });
    }, [uid]);

    useEffect(() => {
        recuperaUid()
    }, [])

    // Use outro useEffect para chamar recuperaCadastro quando o uid é alterado
    useEffect(() => {
        if (uid) {
            recuperaCadastro();
        }
    }, [uid, recuperaCadastro]);
    return (

        <section style={{ height: "100vh", backgroundColor: "#0E4B4F", }}>
            <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div>
                    <img src={logo} alt="" style={{width:"260px", marginBottom:"1em"}}/>
                </div>
                <div className="d-flex flex-column align-items-center text-center mb-5" >
                    <img src={usuario.imagem} alt="" className="rounded-circle" style={{ width: "200px" }} />
                    <h1 className="mt-3 text-white">{usuario.nome}</h1>
                    <h2 className="text-white text-center">@{usuario.username}</h2>
                    <h4 className="text-white text-center">Acessado em:</h4>
                    <p className="text-white text-center" style={{fontWeight:"bold"}}>FIAP - {hora}</p>
                </div>
            </div>
        </section>
    )
}
export default Perfil