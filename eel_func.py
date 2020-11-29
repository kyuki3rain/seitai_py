import sys
import eel

def close(page, _sockets):
    print(page + " is finished!")
    while True:
        sys.exit()

def get_port(port_name_list):
    port_num = eel.select_port(port_name_list)() # pylint: disable=no-member
    return port_name_list[port_num]

def render(result, data_length):
    eel.render_data(result.tolist(), data_length) # pylint: disable=no-member
    print("draw")
