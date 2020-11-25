from enum import Enum, Flag, auto

class DataMode(Enum):
    SERIAL = auto()
    TEST = auto()

class ViewMode(Flag):
    EEL = auto()
    TERMINAL = auto()
    GRAPH = auto()
    SIMPLE = auto()
    CREATE_DATA = auto()
    ALL = EEL | TERMINAL | GRAPH
    EEL_AND_TERMINAL = EEL | TERMINAL
    EEL_WITH_GRAPH = EEL | GRAPH
    TERMINAL_WITH_GRAPH = TERMINAL | GRAPH
    CREATE_DATA_WITH_TERMINAL = CREATE_DATA | TERMINAL
