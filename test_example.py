import numpy as np
import matplotlib.pyplot as plt

import main
import enums

color = ["blue", "green", "red", "black", "yellow", "pink", "purple"]

def new_check(t, ys, data_length, _bools=None):
    f = []
    for i in range(0, data_length):
        f.append(np.mean(np.abs(np.diff(ys[i], n=1))))
        plt.plot(t, ys[i], color=color[i], label=str(i))
    print(f)
    plt.show()
    return f

main.app(
    check_function=new_check,
    data_mode=enums.DataMode.TEST,
    view_mode=enums.ViewMode.SIMPLE,
    data_length=2
)
