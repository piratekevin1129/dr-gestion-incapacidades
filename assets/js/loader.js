//8 images + 8 audios
var total_audios = 8
var total_images = 8 
var total_files = (total_audios + total_images)

var files_loaded = 0
function updateLoader(){
    files_loaded++
    var loader_width = Math.round((files_loaded*100)/total_files)

    getE('loader-bar2').style.width = loader_width+'%'
}

var audios_loaded = 0
function checkAudios(l){
    if(l){updateLoader()}
    
    audios_loaded++
    if(audios_loaded==total_audios){
        comenzarJuego()
    }
}

function unsetLoader(){
    getE('loader').className = 'loader-off'
}