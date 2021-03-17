import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  table: {
    width: '100%',
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 12
},
tableRow:{
    display: 'flex',
    flexDirection: 'row',
},
cell: {
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    flexWrap: 'wrap'
}
});

// Create Document Component
const Comprobante = (props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.table}>
          <View>
              <Text>Aviso de transferencia de fondos</Text>
          </View>
          <View>
              <Text>
                Estimado (a)
              </Text>
          </View>
          <View>
              <Text>
                Nuestro cliente  ha realizado una transferencia de fondos en línea a su cuenta nro.
              </Text>
          </View>
          <View>
              <Text>
                Te enviamos el detalle de esta operación:
              </Text>
          </View>
          <View>
              <Text>Monto Transferido: {props.datos.monto}</Text>
          </View>

      </View>
    </Page>
  </Document>
);

export default Comprobante