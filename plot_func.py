import matplotlib.pyplot as plt

sleepTime = 0.0001  # １フレーム表示する時間[s]
color = ["blue", "green", "red", "black", "yellow", "pink", "purple"]

def init(): # FIX ME: 今は全く意味をなしてない
    plt.ion()
    plt.figure()
    plt.ylim(0, 1023)
    plt.xlabel("time[s]")
    plt.ylabel("Voltage[V]")

def update(t, ys, data_length):
    # グラフ処理
    for i in range(0, data_length):
        plt.plot(t, ys[i], color=color[i], label=str(i))
    plt.xlim(min(t), max(t))
    plt.draw() # グラフを画面に表示開始
    plt.pause(sleepTime)
    plt.cla()

    return plt
