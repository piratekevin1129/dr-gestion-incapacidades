function clickManual(){
    click_mp3.play()
    getE('manual-container').className = 'manual-container-on'
}

function cerrarManual(){
    over_mp3.play()
    getE('manual-container').className = 'manual-container-off'
}