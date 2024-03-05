import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';
import { obtenerDatosSemana, obtenerDatosMenu } from '../consultasTablet';

const Caja = () => {
  const [datosSemana, setDatosSemana] = useState([]);
  const [datosMenu, setDatosMenu] = useState([]);
  const [papasFritas, setPapasFritas] = useState([]);
  const [botonesPresionados, setBotonesPresionados] = useState([]);

  const [textoOrden, setTextoOrden] = useState('Orden');
  const [cantidad, setCantidad] = useState(1);
  const [llaves, setLlaves] = useState('');
  const [comentario, setComentario] = useState('');
  const [precio, setPrecio] = useState(0);
  const [estado, setEstado] = useState(2);
  const [barra, setBarra] = useState(123456789);
  const [cliente, setCliente] = useState('CLIENTE');
  const [numOrden, setNumOrden] = useState(999);
  const [listaPedido, setListaPedido] = useState([]);
  const [arregloPedidos, setArregloPedidos] = useState([]);

  useEffect(() => {
    // Obtiene el día actual y ajusta para mostrar los datos del lunes si es domingo
    const diaActual = obtenerDiaActual();

    // Llama a la función para obtener los datos de la semana al cargar el componente
    obtenerDatosSemana()
      .then(data => {
        // Filtra los datos donde el atributo dia sea igual al día actual
        const datosFiltrados = data.filter(item => item.dia === diaActual);
        // Toma los primeros 7 datos
        const primerosDatos = datosFiltrados.slice(0, 11);
        setDatosSemana(primerosDatos);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la semana:', error);
      });

    // Obtener y filtrar los datos del menú
    obtenerDatosMenu()
      .then(menu => {
        // Filtra los elementos que contienen la palabra "ensalada" en el nombre
        const ensaladas = menu.filter(item => item.nombre.toLowerCase().includes('ensalada'));
        setDatosMenu(ensaladas);

        // Filtra los elementos que contienen la palabra "papasfritas" en el nombre
       
      })
      .catch(error => {
        console.error('Error al obtener los datos del menú:', error);
      });
  }, []);

  // Función para obtener el día actual
  const obtenerDiaActual = () => {
    const hoy = new Date();
    let dia = hoy.getDay(); // 0 (Domingo) a 6 (Sábado)
    // Ajusta para mostrar los datos del lunes si hoy es domingo
    if (dia === 0) {
      dia = 1; // Lunes
    }
    // Mapea el número del día a su nombre
    const nombresDias = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
    return nombresDias[dia];
  };

  const constructorOrden = () => {
    let frase = '';
    let hayElementoDuplicado = false;
  
    const tipos2 = listaPedido.filter(item => item.tipo === 2);
    if (tipos2.length > 1) {
      if (tipos2[0].nombre === tipos2[1].nombre) {
        hayElementoDuplicado = true;
      }
    }
  
    if (botonesPresionados.length > 0) {
      // Verificar si el primer elemento es tipo 1 o 10
      const primerElemento = botonesPresionados[0];
      if (primerElemento.tipo === 1 || primerElemento.tipo === 10) {
        frase = primerElemento.nombre;
        for (let i = 1; i < botonesPresionados.length; i++) {
          if (i === 1) {
            if (!hayElementoDuplicado) {
              frase += ' c/n ';
            } else {
              frase += ' c/n Grande ';
              i++;
            }
          } else {
            frase += ' + ';
          }
          frase += botonesPresionados[i].nombre;
        }
      } else {
        frase = botonesPresionados.map(item => item.nombre).join(' + ');
      }
    }
  
    setTextoOrden(frase); // Actualiza el estado del texto de la orden
  };
  

  // Función para manejar el evento de presionar un botón
  const manejarPresionBoton = (item) => {
    setBotonesPresionados([...botonesPresionados, item]); // Agregar el botón presionado
    constructorOrden(); // Actualizar el texto de la orden
  };

  // Función para reiniciar los botones presionados
  const reiniciarBotonesPresionados = () => {
    setBotonesPresionados([]); // Reiniciar los botones presionados
    setTextoOrden('Orden'); // Restablecer el texto de la orden
  };

  // Función para eliminar el último botón presionado
  const eliminarUltimoBotonPresionado = () => {
    const nuevoArreglo = [...botonesPresionados];
    nuevoArreglo.pop(); // Eliminar el último elemento del arreglo
    setBotonesPresionados(nuevoArreglo); // Actualizar los botones presionados
    constructorOrden(); // Actualizar el texto de la orden
  };
  useEffect(()=>{

    constructorOrden();

  },[botonesPresionados]);


  return (
    <View>
      <Text>Contenido de la pestaña Caja</Text>
      {/* Renderizar los datos de la semana */}
      <View>
        <Text>Primeros 7 datos donde el día es {obtenerDiaActual()}:</Text>
        <View style={styles.row}>
          {datosSemana.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => manejarPresionBoton(item)}
            >
              <Text>{item.nombre}</Text>
              <Text>Stock: {item.stockD}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Renderizar los datos del menú de ensaladas */}
      <View>
        <Text>Ensaladas disponibles:</Text>
        <View style={styles.row}>
          {datosMenu.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => manejarPresionBoton(item)}
            >
              <Text>{item.nombre}</Text>
              <Text>Precio: {item.precio}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Mostrar los botones presionados */}
      <View>
        <Text>Botones Presionados:</Text>
        <View style={styles.row}>
          {botonesPresionados.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text>{JSON.stringify(item)}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Botón para reiniciar los botones presionados */}
      <View style={styles.inputContainer}>
        <Button title="Reiniciar botones" onPress={reiniciarBotonesPresionados} />
      </View>

      {/* Botón para eliminar el último botón presionado */}
      <View style={styles.inputContainer}>
        <Button title="Eliminar último botón" onPress={eliminarUltimoBotonPresionado} />
      </View>

      {/* Input para la orden */}
      <View style={styles.inputContainer}>
        <Text>ORDEN:</Text>
        <TextInput
          style={styles.input}
          value={textoOrden}
          editable={false} // Hace que el input sea de solo lectura
        />
      </View>

      {/* Input para el comentario */}
      <View style={styles.inputContainer}>
        <Text>Comentario:</Text>
        <TextInput
          style={styles.input}
          value={comentario}
          onChangeText={setComentario}
        />
      </View>

      {/* Input para el cliente */}
      <View style={styles.inputContainer}>
        <Text>Cliente:</Text>
        <TextInput
          style={styles.input}
          value={cliente}
          onChangeText={setCliente}
        />
      </View>
    </View>
  );

};




const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: 150, // Ancho fijo para cada botón
    marginRight: 10, // Espacio entre los elementos
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    borderRadius: 5,
  },
});

export default Caja;
