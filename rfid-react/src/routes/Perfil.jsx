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
        <div>
            <img src={usuario.imagem} alt="" />
            <h1>{usuario.nome}</h1>
            <h2>@{usuario.username}</h2>
            <h3>Créditos: {usuario.creditos}</h3>
        </div>
    )
}
export default Perfil