import utils from "./utils";

let nivel       = 1,
    operacion   = "+",
    setActivado = false,
    operadores  = ["/", "*", "-", "+"],
    ecuacion    ="",
    respuestaOpera=0,
    encadenaRespuesta ="";


let respuestaValor = () =>
{
    encadenaRespuesta = "";
    let operandos = {operador1:0, operador2:0};
if (nivel===1)
{
operandos.operador1 = Math.floor(Math.random()*(10)+1);
operandos.operador2 = Math.floor(Math.random()*(10)+1);
ecuacion = `${operandos.operador1} ${operacion} ${operandos.operador2}`;

}
else
{
    if (nivel===2)
    {
    operandos.operador1 = Math.floor(Math.random()*(20-10+1)+10);
    operandos.operador2 = Math.floor(Math.random()*(20-10+1)+10);
    ecuacion = `${operandos.operador1} ${operacion} ${operandos.operador2}`;
  }
    else
    {
       if (nivel===3)
        {
        operandos.operador1 = Math.floor(Math.random()*(30-20+1)+20);
        operandos.operador2 = Math.floor(Math.random()*(30-20+1)+20);
        ecuacion = `${operandos.operador1} ${operacion} ${operandos.operador2}`;
        }
        else
        {
            if (nivel===4)
            {
            operandos.operador1 = Math.floor(Math.random()*(40-30+1)+30);
            operandos.operador2 = Math.floor(Math.random()*(40-30+1)+30);
            ecuacion = `${operandos.operador1} ${operacion} ${operandos.operador2}`;
            }
            else
              {
                if (nivel===5)
                {
                  operandos.operador1 = Math.floor(Math.random()*(50-40+1)+40);
                  operandos.operador2 = Math.floor(Math.random()*(50-40+1)+40);
                  ecuacion = `${operandos.operador1} ${operacion} ${operandos.operador2}`;
                }
              }
            }
          }
        }
respuestaOpera = eval(ecuacion);
utils.accesoDOM("lcd").innerHTML= `${ecuacion} =`;
//console.log(ecuacion);

};


let presionaTecla = opc =>
{
    //Saber si se ha presionado la opción de SET...
    if(opc.toLowerCase() === "set" || setActivado)
    {
        //Saber si se ha presionado "go"...
        if(opc.toLowerCase() !== "go")
        {
            //Imprimir las opciones...
            if(utils.isNumber(opc))
            {
                //Saber si el número está en un nivel de 1 a 5...
                if(Number(opc) >= 1 && Number(opc) <= 5)
                {
                    nivel = Number(opc);
                }
                //console.log("Número");
            }
            else
            {
                for(let i = 0; i < operadores.length; i++)
                {
                    if(opc === operadores[i])
                    {
                        operacion = operadores[i];
                        break;
                    }
                }
            }
            utils.accesoDOM("lcd").innerHTML = `L${nivel}&nbsp;&nbsp;OP&nbsp;${operacion}`;
            setActivado = true;
        }
        else
        {
            setActivado = false;
            utils.accesoDOM("lcd").innerHTML = "";
            respuestaValor();
        }
    }
    else
    {
        if((utils.isNumber(opc) || opc === "-"))// && respuestaOpera < 0)
        {
          encadenaRespuesta = encadenaRespuesta.concat(opc);
          //utils.accesoDOM("lcd").innerHTML = `${ecuacion} = ${encadenaRespuesta}`;
          utils.accesoDOM("lcd").innerHTML += opc;
          if (encadenaRespuesta.length === String(respuestaOpera).length)
          {
            if (eval(encadenaRespuesta) === respuestaOpera)
            {
              alert("Correcto");
                utils.accesoDOM("lcd").innerHTML = `Correcto`;
                //utils.accesoDOM("lcd").innerHTML = `${respuestaOpera}`;
                respuestaValor();
            }
            else {
              alert("Incorrecto, vuelve a intentarlo");
              utils.accesoDOM("lcd").innerHTML =  `Incorrecto`;
              utils.accesoDOM("lcd").innerHTML= `${ecuacion} =`;
                encadenaRespuesta="";
            }
          }
          //console.log(encadenaRespuesta.length , String(respuestaOpera).length);
          //console.log(encadenaRespuesta, Number(respuestaOpera));
          //Se debe mostrar una ecuación de forma aleatoria en el LCD...
          //Se debe validar que la respuesta dada por el usuario sea válida...
          //Se debe validar que la operación que se haga es relacionada al valor que está guardada en ecuación...
          //console.log(`Número seleccionado: ${encadenaRespuesta}`);
          //utils.accesoDOM("lcd").innerHTML = `${respuestaOpera}`;

        }
    }
};


let crearBotones = () =>
{
    let posicion = {
                        left : 66,
                        bottom : 221
                   };

    let opciones     = ["set", "0", "go"],
        inciaNumero = 7;
    for(let i = 0; i < 4; i++)
    {
        for(let c = 0; c < 4; c++)
        {
            let data = c <= 2 ?
                       (inciaNumero > 0 ? (inciaNumero + c) : opciones[c])
                       : operadores[i];
            let style = `left: ${posicion.left + (c * 53)}px;
                         bottom: ${posicion.bottom - (i * 62)}px;`;
            let elementoDIV = `<div class = "tecla" style = "${style}" data = ${data} id = "${i}_${c}"></div>`;
            utils.accesoDOM("carcasa").insertAdjacentHTML('afterbegin', elementoDIV);
            utils.accesoDOM(`${i}_${c}`).addEventListener('click', event =>
            {
                let valor = utils.accesoDOM(event.target.id).getAttribute("data");
                presionaTecla(valor)
            });
        }
        inciaNumero -= 3;
    }
};
crearBotones();
