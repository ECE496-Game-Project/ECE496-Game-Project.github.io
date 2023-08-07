function cameraButtons(){
    // Add event listeners to the buttons
    document.getElementById('btnX').addEventListener('click', function() {
        console.log('Click Button X');
        gameInstance?.SendMessage('Main Camera', 'RotateToAxisX');
    });
    document.getElementById('btnY').addEventListener('click', function() {
        console.log('Click Button Y');
        gameInstance?.SendMessage('Main Camera', 'RotateToAxisY');
    });
    document.getElementById('btnZ').addEventListener('click', function() {
        console.log('Click Button Z');
        gameInstance?.SendMessage('Main Camera', 'RotateToAxisZ');
    });
}


