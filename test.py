import numpy as np
import matplotlib.pyplot as plt
import statistics
import sys

import main
import enums

color = ["blue", "green", "red", "black", "yellow", "pink", "purple"]

zz = np.array([])

def new_check(t, ys, data_length, bools=None):
    global zz
    f = np.array([])
    s = np.array([])
    k = []
    pp = []
    for i in range(0, data_length):
        p = np.mean(ys[i])
        f = np.append(f, p > 6)
        pp.append(p)
        s = np.append(s, np.mean(bools[i]) >= 0.5)
        k.append(np.mean(bools[i]))

    z = np.mean(np.abs(f - s)) * 100
    zz = np.append(zz, z)

    if zz.size >= 100:
        print(np.mean(zz))
        sys.exit()

    return f

main.app(
    check_function=new_check,
    data_mode=enums.DataMode.TEST,
    view_mode=enums.ViewMode.SIMPLE,
    import_file_name="tmp/arm4.txt",
    size=10,
    data_length=5,
    has_bool=True
)