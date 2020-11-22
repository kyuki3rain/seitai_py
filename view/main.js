eel.expose(render_data);
function render_data(data, data_length){
    console.log(data);
    document.getElementById("text").innerHTML = "";
    for(let i = 0; i < data_length - 1; i++){
        document.getElementById("text").innerHTML += data[i];
        document.getElementById("text").innerHTML += "\n";
    }
}

eel.expose(close_page)
function close_page(){
    window.close();
}