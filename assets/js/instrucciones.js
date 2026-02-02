var instrucciones_data = [{
    title:'Gestión de incapacidades',
    text:'Bienvenido, Analista <br> Revisa los expedientes y consulta el <span>Manual de Normativa</span> si tienes dudas.',
    icon:'2',
    value:'Iniciar turno',
    ref:null,
    orientation:null
},{
    title:'Expediente',
    text:'Aquí ves el <span>Tipo</span> y el <span>periodo</span> de incapacidad.<br><br>Analiza estos datos para determinar qué normativa aplicar.',
    icon:'2',
    value:'Ok',
    ref:'ref-hoja-detalles',
    orientation:'right'
},{
    title:'Soporte',
    text:'¿No estás seguro?<br>Consulta el <span>Manual de normativa</span> aquí.<br> Contiene todas las reglas de pago para que no tengas que adivinar',
    icon:'2',
    value:'Entendido',
    ref:'manual',
    orientation:'left'
},{
    title:'Responsable',
    text:'Usa los sellos azules para indicar <span>Quien paga</span> (EPS, ARL, Empleador, etc.)',
    icon:'2',
    value:'Entendido',
    ref:'sellos-azules',
    orientation:'top'
},{
    title:'Liquidación',
    text:'Usa los sellos rojos para definir <span>cuanto se paga</span><br>La ley varía el porcentaje según los días.',
    icon:'2',
    value:'Entendido',
    ref:'sellos-rojos',
    orientation:'top'
},{
    title:'Validación',
    text:'Esta es tu área de trabajo.<br> Haz clic sobre el papel para <span>estampar</span> el sello seleccionado',
    icon:'2',
    value:'Entendido',
    ref:'ref-hoja-validacion',
    orientation:'right'
},{
    title:'Procesar',
    text:'Una vez estampado, presiona este botón para <span>Archivar el expediente</span> y verificar si tu decisión fué correcta.',
    icon:'2',
    value:'Iniciar turno',
    ref:null,
    orientation:null
}]

var current_instruccion = 0


function setInstrucciones(){
    prepareInstruccion()
    
    //getE('contenedor').className = "contenedor-blur-on"
    getE('instruccion').className = "instruccion-on"
}

function prepareInstruccion(){
    getE('instruccion-title').innerHTML = instrucciones_data[current_instruccion].title
    getE('instruccion-text').innerHTML = instrucciones_data[current_instruccion].text
    getE('instruccion-btn').innerHTML = '<span>'+instrucciones_data[current_instruccion].value+'</span>'

    //ref
    var rect_box = getE('instruccion-box').getBoundingClientRect()
    var left_box = 0
    var top_box = 0

    if(instrucciones_data[current_instruccion].ref!=null){
        var rect_ref = getE(instrucciones_data[current_instruccion].ref).getBoundingClientRect()
        var wl = (rect_ref.left - 20)
        var wr = (window.innerWidth - ((rect_ref.width + 20) + rect_ref.left))
        var ht = (rect_ref.top - 20)
        var hb = (window.innerHeight - (rect_ref.top + rect_ref.height + 20))
        getE('instruccion-back-mask').style.borderLeftWidth = wl+'px'
        getE('instruccion-back-mask').style.borderRightWidth = wr+'px'
        getE('instruccion-back-mask').style.borderTopWidth = ht+'px'
        getE('instruccion-back-mask').style.borderBottomWidth = hb+'px'
        
        if(instrucciones_data[current_instruccion].orientation=='top'){
            left_box = (rect_ref.left + (rect_ref.width / 2)) - (rect_box.width / 2)
            top_box = (rect_ref.top - (rect_box.height + 10))
        }else if(instrucciones_data[current_instruccion].orientation=='right'){
            left_box = (rect_ref.left + rect_ref.width + 10)
            top_box = (rect_ref.top + (rect_ref.height / 2)) - (rect_box.height / 2)
        }else if(instrucciones_data[current_instruccion].orientation=='left'){
            left_box = (rect_ref.left - (rect_box.width + 10))
            top_box = (rect_ref.top + (rect_ref.height / 2)) - (rect_box.height / 2)
        }

    }else{
        var w2 = (rect_box.left + (rect_box.width / 2))
        var h2 = (rect_box.top + (rect_box.height / 2))
        getE('instruccion-back-mask').style.borderLeftWidth = w2+'px'
        getE('instruccion-back-mask').style.borderRightWidth = w2+'px'
        getE('instruccion-back-mask').style.borderTopWidth = h2+'px'
        getE('instruccion-back-mask').style.borderBottomWidth = h2+'px'

        left_box = (window.innerWidth / 2) - (rect_box.width / 2)
        top_box = (window.innerHeight / 2) - (rect_box.height / 2)
    }

    getE('instruccion-box').style.left = left_box+'px'
    getE('instruccion-box').style.top = top_box+'px'
}

function nextInstruccion(){
    if(current_instruccion==(instrucciones_data.length-1)){
        getE('instruccion').className = "instruccion-off"

        
    }else{
        current_instruccion++
        prepareInstruccion()
    }
}