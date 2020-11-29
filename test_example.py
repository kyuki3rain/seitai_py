import numpy as np
import matplotlib.pyplot as plt
import statistics

import main
import enums

color = ["blue", "green", "red", "black", "yellow", "pink", "purple"]

def new_check(t, ys, data_length, bools=None):
    print("time is ", t)
    print("ys is ", ys)
    print("length is ", data_length)
    print(bools)

    return bools[::, -1], None # 二つ目の返り値はEELで描画するかどうか。Noneなら前回のfと違う場合のみ描画

main.app(
    check_function=new_check,
    data_mode=enums.DataMode.TEST,
    view_mode=enums.ViewMode.SIMPLE,
    import_file_name="tmp/arm2.txt",
    size=10,
    data_length=5,
    has_bool=True
)