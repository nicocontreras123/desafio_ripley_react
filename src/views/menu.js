import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  title: {
    color: 'white',
  },
  titleBar: {
    background:
      'black',
  },
 
}));


const imgs={
    width:200,
    height:50
}

function Menu() {
  const history = useHistory();
  const classes = useStyles();

  const handleClickSaldo = () => {
    history.push('/consulta_saldo');
  }
  const handleClickTransferencia = () => {
    history.push('/transferencia_bancaria');
  }
  const handleClickIndicadores = () => {
    history.push('/indicadores_economicos');
  }

  return(
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile cols={2} style={{height:'auto'}}>
          <ListSubheader component="div">
              <img style={imgs} src={'https://upload.wikimedia.org/wikipedia/commons/2/27/Logo_Ripley_banco_2.png'} alt='logo'></img>
          </ListSubheader>
        </GridListTile>
        <GridListTile key='1'>
        <img onClick={handleClickSaldo} src={'https://cdn.iconscout.com/icon/premium/png-512-thumb/account-balance-1478013-1246683.png'} alt='titulo'  />
        <GridListTileBar
          title="Consulta Saldo"
          classes={{
            root: classes.titleBar,
            title: classes.title,
          }}
          >
          </GridListTileBar>

          </GridListTile>
        
        <GridListTile key='2'>
        <img onClick={handleClickTransferencia} src={'https://cdn0.iconfinder.com/data/icons/banking-essentials/100/Finance_Cash_Transfer-512.png'} alt='titulo'  />
        <GridListTileBar
          title="Transferencia Bancaria"
          classes={{
            root: classes.titleBar,
            title: classes.title,
          }}
          />

          </GridListTile>
          
        <GridListTile key='3'>
        <img onClick={handleClickIndicadores} src={'data:image/png;base64,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'} alt='titulo'  />
          <GridListTileBar
          title="Indicadores Economicos"
          classes={{
            root: classes.titleBar,
            title: classes.title,
          }}
          />
         </GridListTile>

      </GridList>
    </div>
  )
}

export default Menu;
