import serial
from serial.tools import list_ports
import enums

def start(port, view_mode):
    if port is None:
        port = select_port(view_mode)
        if port is None:
            return

    ser = serial.Serial()
    ser.baudrate = 9600
    ser.port = port
    ser.timeout = 1

    try:
        ser.open()
        return ser
    except: # pylint: disable=bare-except
        print("error when opening serial")
        return None

def get_data(ser):
    return ser.readline().strip().rsplit()

def select_port():
    ports = list_ports.comports()    # ポートデータを取得

    devices = [info.device for info in ports]

    if len(devices) == 0:
        # シリアル通信できるデバイスが見つからなかった場合
        print("error: device not found")
        port = None
    elif len(devices) == 1:
        print("only found %s" % devices[0])
        port = devices[0]

    return devices, port
