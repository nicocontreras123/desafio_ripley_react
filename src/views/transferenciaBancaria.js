import React, { useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { PDFDownloadLink} from '@react-pdf/renderer'
import NumberFormat from 'react-number-format';

import Comprobante from '../components/comprobante'

const comprobante = {
    padding:10
}

const errorStyle = {
    color: 'red'
}


const correctStyle = {
    color: 'green'
}


const MAX_VAL = 100000000;

const withValueLimit = (inputObj) => {
    const { value } = inputObj;
    if (value < MAX_VAL) return inputObj;
  };

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              name: props.name,
              value: values.value
            }
          });
        }}
        prefix={'$'}
        thousandSeparator
        isAllowed={withValueLimit} 
      />
    );
  }

function Transferencia() {
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [datos, setDatos] = useState({
        nro_origen: '',
        nro_destino: '',
        monto: '',
        email: ''
    })
    const [detalle, setDetalle] = useState('')
    const [datosT, setDatosT] = useState({
        nro_origen: '',
        nro_destino: '',
        monto: '',
        email: ''
    })
    const [errorValidacion, setErrorValidacion] = useState(false)
    const divStyle = {
        display:'flex',
        width:'auto',
        heigh:'auto',
        alignItems:'center',
        margin:'10px 10px 10 10',
        padding:'10px'
        
    }

    const handleMenu = () => {
        history.push('/');
      }

    const handleChangeNumber = (name, e) => {
        let reg = /^\d+$/;
        if(reg.test(e.target.value) || e.target.value=== ''){
            setErrorValidacion(false)
            setDatos({...datos, [name]:e.target.value})
        }else{
            setErrorValidacion(true)
        }
    }

    const handleChangeText = (name, e) => {
        setDatos({...datos, [name]:e.target.value})
    }

    const validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            return false;
        }
        else {
            return true;
        }
    }


    const handleTransferencia = () => {

        if(!validateEmail(datos.email)){
            setError('Ingrese un correo electronico correcto')
            return
        }
        console.log('datos.email ', datos.email)
        let body= { 
            origen: datos.nro_origen,
            destinatario: datos.nro_destino,
            monto: datos.monto,
            correo_electronico: datos.email
        }
        console.log('datos.body ', body)

        var requestOptions = {
            method: 'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          };
        let url = 'http://localhost:8080/cliente/realizar_transferencia_bancarias/'

        fetch(url, requestOptions)
        .then(response => response.json())
        .then(response => {
            if(!response.error){
                setDetalle(response.detalle)
                setDatosT(datos)
                setLoading(true)
            }else{
                setLoading(false)
                setError(response.error)
            }
        })

    }
    

    return(
        <div>
            <p>Transferencia Bancaria</p>
            <div style={divStyle}>
                <p>Numero de Cuenta de Origen: </p>
                <TextField 
                id="outlined-basic" 
                variant="outlined" 
                onChange={(val) => handleChangeNumber('nro_origen', val)} 
                
                />
            </div>
            <div style={divStyle}>
                <p>Numero de Cuenta de Destino: </p>
                <TextField id="outlined-basic" variant="outlined" onChange={(val) => handleChangeNumber('nro_destino', val)} />
                
            </div>
            <div style={divStyle}>
                <p>Monto a transferir: </p>
                <TextField id="outlined-basic" 
                variant="outlined" 
                onChange={(val) => handleChangeNumber('monto', val)} 
                InputProps={{
                    inputComponent: NumberFormatCustom
                  }}
                />
            </div>

            <div style={divStyle}>
                <p>Correo electronico (Comprobante): </p>
                <TextField id="outlined-basic" 
                variant="outlined" 
                onChange={(val) => handleChangeText('email', val)} 
                />
            </div>


            {errorValidacion === true ? (
                    <p style={errorStyle}>Solo debe contener numeros </p>
                ) : (
                    ''
                )}

            {loading === true ? (
                <div>
                    <p style={correctStyle}>{detalle}</p>
                    <PDFDownloadLink document={<Comprobante datos={datosT} />} fileName="Comprobante de Transferencia.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Cargando documento...' : (
                            <div style={comprobante}>
                                <Button variant="contained" color="primary"  onClick={handleTransferencia} >
                                        Descargar Comprobante
                                </Button>
                            </div>
                        ))}
                    </PDFDownloadLink>
                </div>
            ) : (
            <p style={errorStyle}>{error}</p>
            )

            }

            <Button variant="contained" color="primary"  onClick={handleTransferencia} >
                    Transferir
            </Button>
            <Button variant="contained" color="secondary" onClick={handleMenu}>
                Volver
            </Button>
        </div>
    )
}

export default Transferencia;