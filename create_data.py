import sys

import main
import enums

def init(file_name):
    try:
        f = open(file_name, mode="w")
        return f
    except: # pylint: disable=bare-except
        print(file_name + " cannot open!")
        return

def format_to_num(d):
    return str(int(d))

def write(f, data):
    format_data = ' '.join(map(format_to_num, data)) + '\n'
    f.write(format_data)

if __name__ == "__main__":
    if len(sys.argv) == 2:
        main.app(
            data_mode=enums.DataMode.SERIAL,
            view_mode=enums.ViewMode.CREATE_DATA_WITH_TERMINAL,
            create_file_name=sys.argv[1],
            data_length=2
        )
    else:
        main.app(
            data_mode=enums.DataMode.SERIAL,
            view_mode=enums.ViewMode.CREATE_DATA_WITH_TERMINAL,
            data_length=2
        )
