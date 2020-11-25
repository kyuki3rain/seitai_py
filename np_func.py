import numpy as np

def init(data, size, data_length):
    t = np.zeros(size)
    ys = np.zeros((data_length, size))
    tInt = float(data[0])

    return  t, ys, tInt

def set_data(data, t, ys, tInt, data_length):
    t = np.append(t, (float(data[0])-tInt)/10**6)
    t = np.delete(t, 0)
    for i in range(0, data_length):
        y = np.append(ys[i], float(data[i + 1]))
        y = np.delete(y, 0)
        ys[i] = y

    return t, ys

def check(_t, ys, data_length, _bools=None):
    f = []
    for i in range(0, data_length):
        f.append(np.mean(ys[i]))

    return f
