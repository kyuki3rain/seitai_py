import serial

def start(port):
    ser = serial.Serial()
    ser.baudrate = 9600
    ser.port = port
    ser.timeout = 1
    ser.open()

    return ser

def get_data(ser):
    return ser.readline().strip().rsplit()
