import eel

import plot_func
import np_func
import eel_func
import serial_func

range = range(1, 50)
eel_start_delay = 2
port = "COM4"

ser = serial_func.start(port)

eel.init("view")
eel.start("index.html", port=0, block=False, close_callback=eel_func.close)
eel.sleep(eel_start_delay)

plt = plot_func.init()

data = serial_func.get_data(ser)
result = np_func.init(data)

while True:
    try:
        for i in range:
            data = serial_func.get_data(ser)
            print(data, i)
            if len(data) != 2:
                continue
            
            result = np_func.set_data(data, *result)
            plot_func.update(plt, *result)

        eel.render_data(np_func.check(*result))

    except KeyboardInterrupt:
        ser.close()
        break
