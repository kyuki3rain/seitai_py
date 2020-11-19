import numpy as np

def init(data, length, data_length):
    t = np.zeros(length)
    ys = np.zeros((data_length - 1, length))
    tInt = float(data[0])

    return  t, ys, tInt

def set_data(data, t, ys, tInt, data_length):
    t = np.append(t, (float(data[0])-tInt)/10**6)
    t = np.delete(t, 0)
    for i in range(1, data_length):
        y = np.append(ys[i - 1], float(data[i]))
        y = np.delete(y, 0)
        ys[i - 1] = y

    return t, ys, tInt

def check(t, ys, tInt, data_length):
    f = []
    for i in range(0, data_length - 1):
        f.append(np.mean(ys[i]))
    
    return f