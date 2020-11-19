import plot_func
import np_func
import eel_func
import serial_func
 
length = 50
port = "COM3"

ser = serial_func.start(port)

plt = plot_func.init()

data = serial_func.get_data(ser)
result = np_func.init(data, length)

while True:
    try:
        for i in range(0, length):
            data = serial_func.get_data(ser)
            print(data, i)
            if len(data) != 2:
                continue
            
            result = np_func.set_data(data, *result)
            plot_func.update(plt, *result)

        a = np_func.check(*result)
        print(a)

    except KeyboardInterrupt:
        ser.close()
        break
