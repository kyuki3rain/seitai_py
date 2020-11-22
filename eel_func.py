import sys
import eel

def close(page, _sockets):
    print(page + " is finished!")
    while True:
        sys.exit()

def get_port(port_name_list):
    port_num = eel.select_port(port_name_list)()
    return port_name_list[port_num]