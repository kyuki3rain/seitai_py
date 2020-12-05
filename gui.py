import sys
from serial.tools import list_ports
import numpy as np
import eel
import eel_func
import main
import enums

start_args = {
    "mode" : "init",
    "port" : None,
    "result" : [],
    "data" : [],
    "data_length" : 2,
    "data_mode" : "serial",
    "threshold" : 0
}

def form(data):
    return float(data)

z = 0
def check_threshold(t, ys, data_length):
    global z
    print("check threshold", z)
    for i in range(0, data_length):
        p = np.mean(ys[i])
        if start_args["threshold"] < p:
            start_args.update({"threshold" : p})
    z += 1
    if z >= 100:
        return np.array([]), "break"
    else:
        return np.array([]), None

def check(t, ys, data_length):
    f = np.array([])
    for i in range(0, data_length):
        p = np.mean(ys[i])
        f = np.append(f, p + 5 > start_args["threshold"])
        print(start_args["threshold"], p)

    return f, None

@eel.expose
def get_mode():
    print("get_mode ok!")
    print(start_args)
    return start_args["mode"]

@eel.expose
def get_ports():
    ports = list_ports.comports()    # ポートデータを取得
    devices = [info.device for info in ports]
    return devices

@eel.expose
def set_args(args):
    print(args)
    start_args.update(args)

def set_result(result, _view_mode, _old_result):
    start_args.update({"result": result.tolist()})

def set_data(data):
    data =  list(map(form, data))
    data[0] = data[0] / 1000000
    print(data)
    start_args.update({"data": data})

@eel.expose
def start_app():
    print("start app!!")
    if start_args["data_mode"] == "test":
        data_mode = enums.DataMode.TEST
    else:
        data_mode = enums.DataMode.SERIAL
    if start_args["mode"] == "app":
        main.app(
            data_mode=data_mode,
            view_mode=enums.ViewMode.EEL,
            data_length=start_args["data_length"],
            port=start_args["port"],
            eel=eel,
            set_result=set_result,
            import_file_name="data/arm2.txt",
            set_data=set_data,
            check_function=check
        )
        return
    if start_args["mode"] == "cal":
        print("start cal!!!")
        main.app(
            data_mode=data_mode,
            view_mode=enums.ViewMode.SIMPLE,
            data_length=start_args["data_length"],
            port=start_args["port"],
            eel=eel,
            set_result=set_result,
            import_file_name="data/arm2_cal.txt",
            set_data=set_data,
            check_function=check_threshold
        )
        start_args.update({"mode": "init"})

@eel.expose
def get_result():
    return start_args["result"]

@eel.expose
def get_data():
    return start_args["data"]

# try:
eel.init("app/build")
eel.start("index.html", port=0, close_callback=eel_func.close)
