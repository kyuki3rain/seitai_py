import eel

import plot_func
import np_func
import eel_func
import serial_func
import import_data
import enums

# 各種定数
length = 50 # 描画に反映するまでに処理するデータの数
eel_start_delay = 2 # 描画処理の起動待機時間
port = None # シリアル通信するportの名前(Noneにすると勝手に選ぶ、候補複数ならVIEWで選択)
data_length = 2 # 時間を含めたデータの長さ（入力が[time, data1, data2]なら3）
data_mode = enums.DataMode.SERIAL # データにシリアル通信を用いるかテストデータを用いるか
view_mode = enums.ViewMode.EEL_WITH_GRAPH # eel, matplotlibなどを使うかどうか

if enums.ViewMode.EEL in view_mode:
    eel.init("view")
    eel.start("index.html", port=0, block=False, close_callback=eel_func.close)
    eel.sleep(eel_start_delay)

if enums.ViewMode.GRAPH in view_mode:
    plt = plot_func.init()

if data_mode == enums.DataMode.SERIAL:
    ser = serial_func.start(port, view_mode)
    if ser is None:
        raise
elif data_mode == enums.DataMode.TEST:
    k = import_data.set("test_data.txt")
    j = 0

if data_mode == enums.DataMode.SERIAL:
    data = serial_func.get_data(ser)
elif data_mode == enums.DataMode.TEST:
    data = import_data.get(data_length - 1, j, k)

if not 'data_length' in locals():
    data_length = len(data)
result = np_func.init(data, length, data_length)

while True:
    try:
        for i in range(0, length):
            if data_mode == enums.DataMode.SERIAL:
                data = serial_func.get_data(ser)
            elif data_mode == enums.DataMode.TEST:
                j += 1
                data = import_data.get(data_length - 1, j, k)

            print(data)
            if len(data) != data_length:
                continue
            
            result = np_func.set_data(data, *result, data_length)
            if enums.ViewMode.GRAPH in view_mode:
                plot_func.update(plt, *result, data_length)

        f = np_func.check(*result, data_length)
        if enums.ViewMode.EEL in view_mode:
            eel.render_data(f, data_length)

    except KeyboardInterrupt:
        if data_mode == enums.DataMode.SERIAL:
            ser.close()
        if enums.ViewMode.EEL in view_mode:
            eel.close_page()
        
        break
