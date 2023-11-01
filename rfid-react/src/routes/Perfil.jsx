import axios from "axios"
import { useCallback, useEffect, useState } from "react";
function Perfil() {
    const [uid, setUid] = useState("")
    const [usuario, setUsuario] = useState({})
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
        
        <section style={{height:"100vh", backgroundColor:"#0E4B4F", }}>
            <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
                <div className="d-flex flex-column align-items-center text-center mb-5" >
                    <img src={usuario.imagem} alt="" className="rounded-circle" style={{width:"200px"}} />
                    <h1 className="mt-3 text-white">{usuario.nome}</h1>
                    <h2 className="text-white">@{usuario.username}</h2>
                    <h3 className="text-white">Créditos: {usuario.creditos}</h3>
                </div>
            </div>
        </section>
    )
}
export default Perfil