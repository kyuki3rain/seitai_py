import numpy as np
import matplotlib.pyplot as plt
import statistics

import main
import enums

color = ["blue", "green", "red", "black", "yellow", "pink", "purple"]

def new_check(t, ys, data_length, bools=None):
    f = []
    s = []
    print(bools)
    for i in range(0, data_length):
        f.append(np.mean(np.abs(np.diff(ys[i], n=1))))
        plt.plot(t, ys[i], color=color[i], label=str(i))
        s.append(statistics.mean(bools[i]))
    print(f, s)
    plt.show()
    return f

main.app(
    check_function=new_check,
    data_mode=enums.DataMode.TEST,
    view_mode=enums.ViewMode.SIMPLE,
    import_file_name="tmp/arm2.txt",
    size=10,
    data_length=2,
    has_bool=True
)