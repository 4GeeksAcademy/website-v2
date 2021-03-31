import React, { useState } from 'react'
import { RoundImage, Colors } from '../../Styling'

const Circles = () => {
  {
    //Dibuja objetos (circulos y ractangulos) de colores alrededor de la imágen del banner
    //Cada elemento dibujado toma sus propiedades CSS de un array
    //Aplicando por cada objeto el CSS de Figma.
    //Se identifica cada objeto con el mismo ID de Figma
    //TODO Faltan objetos por añadir al array, pero contiene la logica a utilizar para dibujarlos

    return (
      <>
        {
          [
            {
              //Rectangle 173
              position: 'absolute',
              width: '96px',
              height: '13px',
              left: '1132px',
              top: '486px',
              background: '#000000',
              borderRadius: '10px',
              zIndex: '999',
            },
            {
              //Rectangle 174
              position: 'absolute',
              width: '150px',
              height: '13px',
              left: '1254px',
              top: '486px',
              background: '#000000',
              borderRadius: '10px',
              zIndex: '999',
            },
            {
              //Rectangle 284
              position: 'absolute',
              width: '82px',
              height: '11px',
              left: '628px',
              top: '219px',
              background: '#000000',
              borderRadius: '10px',
              zIndex: '999',
            },
            {
              //Elipse 7
              position: 'absolute',
              width: '229px',
              height: '230px',
              left: '1163px',
              top: '348px',
              background: 'rgba(255, 183, 24, 0.2)',
              borderRadius: '50%',
            },
            {
              //Elipse 22
              position: 'absolute',
              width: '21px',
              height: '21px',
              left: '1278px',
              top: '370px',
              background: '#CD0000',
              borderRadius: '50%',
            },
            {
              //Elipse 26
              position: 'absolute',
              width: '162px',
              height: '163px',
              left: '686px',
              top: '145px',
              background: '#0097CD',
              borderRadius: '50%',
              zIndex: '100',
            },
            {
              //Elipse 38
              position: 'absolute',
              width: '22px',
              height: '21px',
              left: '744px',
              top: '394px',
              background: '#000000',
              borderRadius: '50%',
              transform: 'rotate(90deg)',
            },
            {
              //Elipse 40
              position: 'absolute',
              width: '21px',
              height: '22px',
              left: '723px',
              top: '345px',
              background: '#F5F5F5',
              borderRadius: '50%',
            },
            {
              //Elipse 42
              position: 'absolute',
              width: '83px',
              height: '82px',
              left: '901px',
              top: '89px',
              background: 'rgba(255, 183, 24, 0.2)',
              borderRadius: '50%',
            }
          ].map((ostyle, i) => {
            return <div style={ostyle}></div>
          })
        }
      </>
    )
  }

}

export default Circles;