import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';


const divStyle = {
    display:'flex',
    width:'auto',
    heigh:'auto',
    alignItems:'center',
    margin:'10px 10px 10 10',
    padding:'10px'
    
}

function currencyFormat(num) {
    return '$' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

function Saldo() {
    const [rut, setRut] = useState('')
    const [datos, setDatos] = useState({
        nombre:'',
        apellidos:'',
        cuentas: [],
        saldo_total: 0
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const history = useHistory();
  
    const handleMenu = () => {
      history.push('/');
    }

    const handleChangeText = (e) => {
        setRut(e.target.value)
    }

    

    const handleConsultar = () => {
        const url = `http://localhost:8080/cliente/consulta_saldo?rut=${rut}`
        fetch(url)
        .then(response => response.json())
        .then(response => {
            if(!response.error){
                setLoading(!loading)
                setDatos(response.datos)
            }else{
                setError(response.error)
            }
        })
        
    }
    return(
        <div >
            <p>Revisa tu Saldo</p>
            <div style={divStyle}>
                <p>Ingresa tu rut:</p>
                <TextField id="outlined-basic" variant="outlined" onChange={val => handleChangeText(val)} />
               <br></br>
            </div>
            {loading===true ? (
                <div>
                    <p>Nombres: {datos.nombres}</p>
                    <p>Apellidos: {datos.apellidos}</p>
                    <p>Saldo Total: {currencyFormat(datos.saldo_total)}</p>
                    <p>Cuentas Bancarias: </p>
                    <div>
                    {datos.cuentas.map((cuenta) => (
                        <div key={cuenta.numero}>
                            <p>      - Numero: {cuenta.numero} ||  Saldo: {currencyFormat(cuenta.saldo)}</p>
                        </div>
                    ))}
                    </div>
                </div>
            ): (
                <div>
                    <p>{error}</p>
                </div>
            )}
            <Button variant="contained" color="primary" onClick={handleConsultar} >
                    Consultar
            </Button>
            <Button variant="contained" color="secondary" onClick={handleMenu}>
                Volver
            </Button>
        </div>
    )
}

export default Saldo;