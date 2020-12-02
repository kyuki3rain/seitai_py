import main
import eel # pylint: disable=import-outside-toplevel
import eel_func # pylint: disable=import-outside-toplevel

eel.init("view")
eel.start("index.html", port=0, block=False, close_callback=eel_func.close)
eel.sleep(2)