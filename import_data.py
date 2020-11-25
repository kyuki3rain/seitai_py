import sys
import math

import main
import enums

def init(file_name):
    f = open(file_name, "r")

    data = []
    while True:
        line = f.readline()
        if not line:
            break

        data.append(line.split())

    return data

def get(row, i, data, has_bool):
    length = len(data)
    t = i % length
    r = math.floor(i / length)

    step = math.floor(length/row)
    res = [str(data[-1][0] * r + data[t][0]).encode()]

    for j in range(0, row):
        a = (t + step * j) % length
        res.append(str(data[a][1]).encode())

    if has_bool:
        for j in range(0, row):
            res.append(str(data[a][2]).encode())

    return res

if __name__ == "__main__":
    if len(sys.argv) == 2:
        main.app(
            data_mode=enums.DataMode.TEST,
            view_mode=enums.ViewMode.ALL,
            import_file_name=sys.argv[1],
            data_length=2
        )
    else:
        main.app(
            data_mode=enums.DataMode.TEST,
            view_mode=enums.ViewMode.ALL,
            data_length=2
        )
