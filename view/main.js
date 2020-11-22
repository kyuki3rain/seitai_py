window.onload = function(){
    document.getElementById("form").style.display = "none";
}

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

eel.expose(select_port)
async function select_port(arr){
    arr.foreach(function(name, index){
        option = document.createElement("option");
        option.setAttribute("value", index);
        option.innerHTML = name;
        document.getElementById("port_select").appendChild(option);
    })
    document.getElementById("form").style.display = "block";

    const button = document.getElementById("button")

    await awaitForClick(button)

    const num = document.getElementById("port_select").selectedIndex;

    const str = document.getElementById("port_select").options[num].value;
    
    return str;
}

function awaitForClick (target){
    return new Promise(resolve => { // 処理A
      const listener = resolve;     // 処理B
      target.addEventListener("click", listener, {once: true}); // 処理C
    });
  };