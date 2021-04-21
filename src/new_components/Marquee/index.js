import React, { useEffect } from 'react';
import styles from './partners.marquee.module.css'
import cloneDeep from 'lodash';
import { window } from 'browser-monads'

let datos = {};

let screenWidthVw= 100;

const Marquee = ( props ) => {

      //DOM root element
      let root = window.document.documentElement;

      datos = {

        //----- FUNCIONES DE CONVERSION DE UNIDADES (px->vw) (px->vw) -----//
        pxTOvw: function (valuePx) {

          var result = (100 / window.innerWidth) * valuePx;

          return result;

        },

        pxTOvh: function (valuePx) {

          var result = (100 * valuePx) / window.innerHeight;

          return result;
        },


        //------ DATOS DE ENTRADA -----//

        //Arreglo de <Img> a mostrar
        images: props.config.images,

        //transition duration
        durationSec: props.config.marquee.durationSec.toString() + "s",

        //Sentido desplazamiento (1 izq-der) (-1 der-izq)
        ltr: props.config.marquee.ltr == 1 ? -1 : 1,

        //Margen de cada imagen en formato "t l b r"
        itemMargin: props.config.item.margin,

        //Margen derecho de cada imagen en PX
        rightMarginPx: props.config.item.rightMarginPx,
        rightMarginVw: () => datos.pxTOvw(props.config.item.rightMarginPx),

        itemWidthPx: props.config.item.widthPx,

        imagesCount: props.config.images.length,


        itemWidthVw: () => datos.pxTOvw(datos.itemWidthPx),

        //displayedImages: () => screenWidthVw / (datos.itemWidthVw() + datos.rightMarginVw() > 0 ? datos.itemWidthVw() + datos.rightMarginVw() : 1),


        allImagesWidthVw: () => datos.imagesCount * datos.itemWidthVw(),

        allImagesMarginVw: () => datos.pxTOvw(datos.imagesCount * datos.rightMarginPx),

        totalSlidingVw: () => datos.allImagesWidthVw() + datos.allImagesMarginVw(),


        vwLibres: () => (1 - ((datos.totalSlidingVw() / 100) - Math.floor(datos.totalSlidingVw() / 100))) * 100,

        additionalImages: () => Math.floor(datos.vwLibres() / datos.itemWidthVw()),

        totalImagesInMarquee: () => datos.imagesCount + datos.additionalImages(),

        translatex100: () => ((datos.totalSlidingVw() + datos.vwLibres()) * datos.ltr).toString() + "vw",

      };

      //----- ACTUALIZACION DEL CSS -----//
      const updateCss = () => {
        root.style.setProperty("--ltr", datos.ltr);
        root.style.setProperty("--item-widthVw", datos.itemWidthVw());
        root.style.setProperty("--item-margin", datos.itemMargin);
        root.style.setProperty("--marquee-elements", datos.totalImagesInMarquee());
        root.style.setProperty("--translatex100", datos.translatex100());
        root.style.setProperty("--animation-duration", datos.durationSec);
      };

      const display = () => {

        console.log("durationSec", datos.durationSec);
        console.log("ltr", datos.ltr);
        console.log("itemMargin", datos.itemMargin);

        console.log("rightMarginPx", datos.rightMarginPx);
        console.log("rightMarginVw", datos.rightMarginVw());

        console.log("itemWidthPx", datos.itemWidthPx);
        console.log("itemWidthVw calc", datos.itemWidthVw());

        console.log("imagesCount", datos.imagesCount);

        console.log("itemWidthVw", datos.itemWidthVw());
        //console.log("displayedImages", datos.displayedImages());

        console.log("allImagesWidthVw", datos.allImagesWidthVw());
        console.log("allImagesMarginVw", datos.allImagesMarginVw());

        console.log("totalSlidingVw", datos.totalSlidingVw());

        console.log("vwLibres", datos.vwLibres());

        console.log("additionalImages", datos.additionalImages());
        console.log("translatex100", datos.translatex100());

        console.log("totalImagesInMarquee", datos.totalImagesInMarquee());
      };

      updateCss();

  //Renderizado de la marquesina
  return (
    <>

      <div className={styles.marquee} style={{ margin: "0 0 40px 0" }}>

        <ul id="lista" className={styles.marqueeContent}>
          {
            //add images to display to ul.
            datos.images.map((image, i) => {
              return (
                <li >
                  {image}
                </li>
              )
            })
          }
        </ul>

      </div>

    </>
  );


};


export default Marquee;