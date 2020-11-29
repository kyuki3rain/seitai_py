import sys

import np_func
import enums

start_args = {
    "size" : 50, # 描画に反映するまでに処理するデータの数（今はnumpyのデータサイズと共通）
    "eel_start_delay" : 2, # 描画処理の起動待機時間（Viewがバグってたら増やすといいかも？）
    "port" : None, # シリアル通信するportの名前(Noneにすると勝手に選ぶ、候補複数ならVIEWで選択）
    "data_length" : None, # 入力データの長さ（時間は含めない、SerialモードでNoneなら入力データから自動設定）
    "data_mode" : enums.DataMode.SERIAL, # データにシリアル通信を用いるかテストデータを用いるか
    "view_mode" : enums.ViewMode.ALL, # eel, matplotlibなどを使うかどうか。いろいろ設定できるので詳しくはenums.pyを参照
    "create_file_name" : "create.txt", # ViewMode.CREATE_DATAモードで出力するファイル名
    "import_file_name" : "import.txt", # DataMode.TESTモードで読み込むファイル名
    "check_function" : np_func.check, # 判定で用いる関数（t, ys, data_length, bools(has_boolの場合のみ)を引数にとる関数）
    "has_bool" : False # 機械学習などの用途で正誤判定が必要な場合のためにデータを取っておくフラグ。動作未確認！
}

def app(**kwargs):
    start_args.update(kwargs)
    view_mode = start_args['view_mode']
    data_mode = start_args['data_mode']
    data_length = start_args['data_length']
    has_bool = start_args['has_bool']

    if data_mode == enums.DataMode.TEST and data_length is None:
        print("Please specify data_length!")
        return

    if enums.ViewMode.EEL in view_mode:
        import eel # pylint: disable=import-outside-toplevel
        import eel_func # pylint: disable=import-outside-toplevel
        eel.init("view")
        eel.start("index.html", port=0, block=False, close_callback=eel_func.close)
        eel.sleep(start_args['eel_start_delay'])

    if enums.ViewMode.GRAPH in view_mode:
        import plot_func # pylint: disable=import-outside-toplevel
        plot_func.init()

    if enums.ViewMode.CREATE_DATA in view_mode:
        import create_data # pylint: disable=import-outside-toplevel
        f = create_data.init(start_args['create_file_name'])

    if data_mode == enums.DataMode.SERIAL:
        import serial_func # pylint: disable=import-outside-toplevel
        ser = serial_func.start(start_args['port'], view_mode)
        if ser is None:
            sys.exit()
    elif data_mode == enums.DataMode.TEST:
        import import_data # pylint: disable=import-outside-toplevel
        init_data = import_data.init(start_args['import_file_name'])
        j = 0

    if data_mode == enums.DataMode.SERIAL:
        data = serial_func.get_data(ser)
        if data_length is None:
            data_length = (len(data) - 1) / 2 if has_bool else len(data) - 1
        while len(data) == 0:
            print(data)
            data = serial_func.get_data(ser)
    elif data_mode == enums.DataMode.TEST:
        data = import_data.get(data_length, j, init_data, has_bool)
        j += 1

    t, ys, tInt = np_func.init(data, start_args['size'], data_length)
    old_result = None

    if has_bool:
        bools = np_func.bool_init(data_length, start_args['size'])
        bools = np_func.set_bool_data(bools, data, data_length)
        data = data[:(data_length + 1)]
    while True:
        try:
            if data_mode == enums.DataMode.SERIAL:
                data = serial_func.get_data(ser)
            elif data_mode == enums.DataMode.TEST:
                data = import_data.get(data_length, j, init_data, has_bool)
                j += 1

            if has_bool:
                bools = np_func.set_bool_data(bools, data, data_length)
                data = data[:(data_length + 1)]

            if enums.ViewMode.TERMINAL in view_mode:
                print(data)
            if enums.ViewMode.CREATE_DATA in view_mode:
                create_data.write(f, data)
            if len(data) != data_length + 1:
                continue

            t, ys = np_func.set_data(data, t, ys, tInt, data_length)
            if enums.ViewMode.GRAPH in view_mode:
                plot_func.update(t, ys, data_length)
            if not enums.ViewMode.CREATE_DATA in view_mode:
                if has_bool:
                    result, draw = start_args['check_function'](t, ys, data_length, bools)
                else:
                    result, draw = start_args['check_function'](t, ys, data_length)
                if enums.ViewMode.TERMINAL in view_mode:
                    print("check result is ")
                    print(result)

            if not enums.ViewMode.CREATE_DATA in view_mode:
                if enums.ViewMode.EEL in view_mode:
                    if old_result is not None:
                        if not np_func.equal(result, old_result):
                            eel.render_data(result, data_length) # pylint: disable=no-member
                            print("draw")
                    elif draw:
                        eel.render_data(result, data_length) # pylint: disable=no-member

            old_result = result

        except KeyboardInterrupt:
            # FIX ME: 一発で抜けてくれない。matplotlibのtkinterが悪そう。
            if data_mode == enums.DataMode.SERIAL:
                ser.close()
            if enums.ViewMode.EEL in view_mode:
                eel.close_page() # pylint: disable=no-member
            if enums.ViewMode.CREATE_DATA in view_mode:
                f.close()

            break

if __name__ == "__main__":
    app(data_mode=enums.DataMode.SERIAL, data_length=1)
