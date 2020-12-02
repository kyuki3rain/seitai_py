import sys
from serial.tools import list_ports
import eel
import eel_func
import main
import enums

start_args = {
    "mode" : "init",
    "port" : None,
    "result" : [],
    "data" : []
}

def form(data):
    return float(data)

@eel.expose
def get_mode():
    print("get_mode ok!")
    return start_args["mode"]

@eel.expose
def get_ports():
    ports = list_ports.comports()    # ポートデータを取得
    devices = [info.device for info in ports]
    return devices

@eel.expose
def set_args(args):
    start_args.update(args)

def set_result(result, _view_mode, _old_result):
    start_args.update({"result": result.tolist()})

def set_data(data):
    start_args.update({"data": list(map(form, data))})

@eel.expose
def start_app():
    main.app(
        data_mode=enums.DataMode.TEST,
        view_mode=enums.ViewMode.EEL,
        data_length=5,
        # port=start_args["port"],
        eel=eel,
        set_result=set_result,
        import_file_name="data/arm2.txt",
        set_data=set_data
    )

@eel.expose
def get_result():
    return start_args["result"]

@eel.expose
def get_data():
    return start_args["data"]

# try:
eel.init("app/build")
eel.start("index.html", port=0, close_callback=eel_func.close)
