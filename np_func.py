import numpy as np

t = np.zeros(100)
y = np.zeros(100)
tInt = 0

def init(data):
    t = np.zeros(100)
    y = np.zeros(100)
    tInt = float(data[0])

    return  t, y, tInt

def set_data(data, t, y, tInt):
    t = np.append(t, (float(data[0])-tInt)/10**6)
    t = np.delete(t, 0)
    y = np.append(y, float(data[1])*5/1023)
    y = np.delete(y, 0)

    return t, y, tInt

def check(t, y, tInt):
    return np.average(y)