import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'codigo', headerName: 'Codigo', width: 70 },
    { field: 'nombre', headerName: 'Nombre', width: 300 },
    { field: 'unidad', headerName: 'Unidad', width: 130 },
    { field: 'fecha', headerName: 'Fecha', width: 200 },
    { field: 'valor', headerName: 'Valor', width: 130 },
  ];

function Indicadores() {
    const history = useHistory();

    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const handleMenu = () => {
        history.push('/');
      }


    useEffect(async () => {
        const result = await axios(
          'http://localhost:8080/cliente/consulta_indicadores_economicos',
        );
         try{
             console.log(result.data.datos)
            setData(result.data.datos);
            setTimeout(() => {
                setLoading(true)
            }, 1000)
         }catch{
            console.log('error')
         }
        
      }, []);

    return(
        <div>
            <p>Indicadores</p>
            <div>
            {loading === true ? (
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={data} columns={columns} pageSize={10} checkboxSelection></DataGrid>
                </div>
            ): (
                <p>Cargando...</p>
            )}
            <Button variant="contained" color="secondary" onClick={handleMenu}>
                Volver
            </Button>
            </div>
        </div>
    )
}

export default Indicadores;