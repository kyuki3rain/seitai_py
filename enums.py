from enum import Enum, Flag, auto

class DataMode(Enum):
    SERIAL = auto()
    TEST = auto()

class ViewMode(Flag):
    EEL = auto()
    TERMINAL = auto()
    GRAPH = auto()
    EEL_WITH_GRAPH = EEL | GRAPH
    TERMINAL_WITH_GRAPH = TERMINAL | GRAPH