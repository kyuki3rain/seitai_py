import plot_func
import np_func
import eel_func
import serial_func
 
length = 50
port = "COM3"
data_length = 6

ser = serial_func.start(port)

plt = plot_func.init()

data = serial_func.get_data(ser)
if not 'data_length' in locals():
    data_length = len(data)
result = np_func.init(data, length, data_length)

while True:
    try:
        for i in range(0, length):
            data = serial_func.get_data(ser)
            print(data, i)
            if len(data) != data_length:
                continue
            
            result = np_func.set_data(data, *result, data_length)
            plot_func.update(plt, *result, data_length)

        f = np_func.check(*result, data_length)

    except KeyboardInterrupt:
        ser.close()
        break
