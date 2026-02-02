var i = 0;
var j = 0;

var sellos_data = ['Empleador','Fondo de pensiones','EPS','ARL','100%','66.67%','50%']
var estampas_data = [0,0]

function loadTrack(data){
    var url = data.src

    var audio_fx = null
    audio_fx = document.createElement('audio')
    audio_fx.setAttribute('src',url)
    audio_fx.load()
    audio_fx.addEventListener('loadeddata',function(){
        //alert("cargo")
        data.callBack(audio_fx)
    })
    audio_fx.addEventListener('error',function(){
        console.log("error cargando")
        data.callBack(null)
    })
}

function loadImg(data){
    var img = new Image()
    if(data.extra!=null&&data.extra!=undefined){
        img.setAttribute('f',data.extra.f)
    }
    img.onload = function(){
        img.onload = null
        img.onerror = null
        data.callBack(img)
    }
    img.onerror = function(){
        img.onload = null
        img.onerror = null
        data.callBack(null)
        console.log("error loading img: "+img.src)        
    }
    img.src = data.src
}

var current_caso = 0;

function prepareHoja(){
    getE('colaborador-principal').innerHTML = casos_data[current_caso].colaborador
    getE('cargo-principal').innerHTML = casos_data[current_caso].cargo
    getE('origen-principal').innerHTML = casos_data[current_caso].origen
    getE('periodo-principal').innerHTML = casos_data[current_caso].periodo
    getE('estado-principal').innerHTML = casos_data[current_caso].estado
    getE('foto-principal').src = './assets/images/fotos/'+casos_data[current_caso].foto+'.png'
    getE('personaje-foto').style.backgroundImage = 'url(./assets/images/fotos/'+casos_data[current_caso].foto+'.png)'
}

var tipo_sello_activo = '';
var sello_activo = 0;

function clickSello(s,tipo){
    getE('sello-estampa-1').className = 'hoja-estampa-1'
    getE('sello-estampa-2').className = 'hoja-estampa-2'

    if(sello_activo!=0){
        getE('sello-'+sello_activo).className = 'sello sello-normal'
    }

    getE('sello-'+s).className = 'sello sello-active'
    if(tipo=='azul'){
        getE('sello-estampa-1').className = 'hoja-estampa-1 hoja-estampa-1-active'
    }else{
        getE('sello-estampa-2').className = 'hoja-estampa-2 hoja-estampa-2-active'
    }

    sello_activo = s
    tipo_sello_activo = tipo
}

var animating_estampa = false
var animation_estampa = null

function clickEstampa(event,estampa){
    if(!animating_estampa&&sello_activo!=0){
        animating_estampa = true

        //poner imagen y texto
        var img_estampa = getE('hoja-sello-'+estampa).getElementsByTagName('img')[0]
        var txt_estampa = getE('hoja-sello-'+estampa).getElementsByTagName('p')[0]
        if(sello_activo!=2){
            img_estampa.src = './assets/images/sello-'+tipo_sello_activo+'-borde.svg'
        }else{
            img_estampa.src = './assets/images/sello-'+tipo_sello_activo+'2-borde.svg'
        }
        txt_estampa.innerHTML = sellos_data[sello_activo-1]

        var left = parseInt(event.pageX - getE('sello-estampa-'+estampa).getBoundingClientRect().left)
        var top = parseInt(event.pageY - getE('sello-estampa-'+estampa).getBoundingClientRect().top)

        //console.log(left,top)
        getE('hoja-sello-'+estampa).style.left = left+'px'
        getE('hoja-sello-'+estampa).style.top = top+'px'
        getE('hoja-sello-'+estampa).className = 'hoja-sello-'+estampa+'-on'
        estampas_data[estampa-1] = sello_activo

        getE('hoja-container').className = 'hoja-estampada'

        //esperar animacion para volverla a hacer en otro click
        animation_estampa = setTimeout(function(){
            clearTimeout(animation_estampa)
            animation_estampa = null

            animating_estampa = false
            getE('hoja-container').removeAttribute('class')
            getE('hoja-sello-'+estampa).className = 'hoja-sello-'+estampa+'-onn'

            //quitar activos
            getE('sello-estampa-1').className = 'hoja-estampa-1'
            getE('sello-estampa-2').className = 'hoja-estampa-2'
            getE('sello-'+sello_activo).className = 'sello sello-normal'
            tipo_sello_activo = '';
            sello_activo = 0;

            //comprobar si ya hay 2 sellos para habilitar el boton de comprobar
            if(estampas_data[0]!=0&&estampas_data[1]!=0){
                getE('comprobar-btn').className = 'comprobar-btn-enabled'
                getE('comprobar-btn').disabled = false
            }
        },300)
    }
}

function comprobarExpediente(){
    var acierto_1 = false
    var acierto_2 = false
    if(estampas_data[0]==casos_data[current_caso].correctos[0]){
        acierto_1 = true
    }
    if(estampas_data[1]==casos_data[current_caso].correctos[1]){
        acierto_2 = true
    }
    
    if(acierto_1==true&&acierto_2==false){
        getE('tiquete-titulo').innerHTML = 'Atención al detalles'
        getE('tiquete-texto').innerHTML = 'Has respondido bien el <span class="tiquete-texto-span-1">responsable</span> pero no el <span class="tiquete-texto-span-2">reconocimiento nominal</span>.'
    }else if(acierto_1==false&&acierto_2==true){
        getE('tiquete-titulo').innerHTML = 'Atención al detalles'
        getE('tiquete-texto').innerHTML = 'Has respondido bien el <span class="tiquete-texto-span-2">reconocimiento nominal</span> pero no el <span class="tiquete-texto-span-2">responsable</span>.'
    }else if(acierto_1==false&&acierto_2==false){
        getE('tiquete-titulo').innerHTML = 'Rechazado'
        getE('tiquete-texto').innerHTML = 'Recuerda consultar el <span>Manual de Normativa</span> antes de responder.'
    }else if(acierto_1==true&&acierto_2==true){
        getE('tiquete-titulo').innerHTML = 'Aprobado'
        getE('tiquete-texto').innerHTML = 'Has respondido correctamente'
    }
}