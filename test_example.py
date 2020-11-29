import sys
import statistics
import numpy as np
import matplotlib.pyplot as plt

import main
import enums

color = ["blue", "green", "red", "black", "yellow", "pink", "purple"]
zz = np.array([])

#  このファイルをコピーしてtest.pyという名前で改変しテストしてください。
#　そうすれば改変中でもgitに反映されず、気軽にpullできます。

def new_check(t, ys, data_length, bools=None):
    global zz
    f = np.array([])
    s = np.array([])
    for i in range(0, data_length):
        p = np.mean(ys[i])
        f = np.append(f, p > 6)
        s = np.append(s, np.mean(bools[i]) >= 0.5)

    z = np.mean(np.abs(f - s)) * 100
    zz = np.append(zz, z)

    if zz.size >= 100:
        print(np.mean(zz))
        sys.exit()

    return f, None
    # 一つ目の返り値は一次元のnparray、二つ目の返り値はEELで描画するかどうかの真偽値（Noneなら前回のfと違う場合のみ描画）

main.app(
    check_function=new_check,
    data_mode=enums.DataMode.TEST,
    view_mode=enums.ViewMode.TERMINAL,
    import_file_name="tmp/arm2.txt",
    size=10,
    data_length=5,
    has_bool=True
)
