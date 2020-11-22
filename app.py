import eel
from enum import Enum, auto

import plot_func
import np_func
import eel_func
import serial_func
import import_data

class DataMode(Enum):
    SERIAL = auto()
    TEST = auto()

length = 50
eel_start_delay = 2
port = "COM3"
data_length = 6
data_mode = DataMode.TEST


if data_mode == DataMode.SERIAL:
    ser = serial_func.start(port)
elif data_mode == DataMode.TEST:
    k = import_data.set("test_data.txt")
    j = 0

eel.init("view")
eel.start("index.html", port=0, block=False, close_callback=eel_func.close)
eel.sleep(eel_start_delay)
plt = plot_func.init()

if data_mode == DataMode.SERIAL:
    data = serial_func.get_data(ser)
elif data_mode == DataMode.TEST:
    data = import_data.get(data_length - 1, j, k)

if not 'data_length' in locals():
    data_length = len(data)
result = np_func.init(data, length, data_length)

while True:
    try:
        for i in range(0, length):
            if data_mode == DataMode.SERIAL:
                data = serial_func.get_data(ser)
            elif data_mode == DataMode.TEST:
                j += 1
                data = import_data.get(data_length - 1, j, k)

            print(data)
            if len(data) != data_length:
                continue
            
            result = np_func.set_data(data, *result, data_length)
            plot_func.update(plt, *result, data_length)

        f = np_func.check(*result, data_length)
        eel.render_data(f, data_length)

    except KeyboardInterrupt:
        if data_mode == DataMode.SERIAL:
            ser.close()
        eel.close_page()
        
        break
