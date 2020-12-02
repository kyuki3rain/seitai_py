import eel
import main
import eel_func
import serial_func
import enums

eel.init("view")
eel.start("index.html", port=0, block=False, close_callback=eel_func.close)
eel.sleep(2)

@eel.expose
def start_serial():
    port = serial_func.select_port(enums.ViewMode.EEL)
    main.app(
        data_mode=enums.DataMode.TEST,
        view_mode=enums.ViewMode.ALL,
        import_file_name="data/arm2.txt",
        data_length=2,
        eel=eel
    )
