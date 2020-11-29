import numpy as np

def bool_init(data_length, size):
    bools = np.zeros((data_length, size))
    return bools

def init(data, size, data_length):
    t = np.zeros(size)
    ys = np.zeros((data_length, size))
    tInt = float(data[0])

    return  t, ys, tInt

def set_bool_data(bools, data, data_length):
    for i in range(0, data_length):
        p = float(data[data_length + i + 1])
        bd = np.append(bools[i], p)
        bd = np.delete(bd, 0)
        bools[i] = bd
    return bools

def set_data(data, t, ys, tInt, data_length):
    t = np.append(t, (float(data[0])-tInt)/10**6)
    t = np.delete(t, 0)
    for i in range(0, data_length):
        p = float(data[i + 1])
        y = np.append(ys[i], p)
        y = np.delete(y, 0)
        ys[i] = y

    return t, ys

def equal(a, b):
    return np.array_equal(a, b)

def copy(a):
    return np.copy(a)

def check(t, ys, data_length, bools=None):
    print("time is ", t)
    print("ys is ", ys)
    print("length is ", data_length)
    print("bools is ", bools)

    f = np.array([])
    for i in range(0, data_length):
        np.append(f, np.mean(ys[i]))

    return f, None
