import matplotlib.pyplot as plt

sleepTime = 0.0001  # １フレーム表示する時間[s]

def init():
    plt.ion()
    plt.figure()
    plt.ylim(0, 1023)
    plt.xlabel("time[s]")
    plt.ylabel("Voltage[V]")

    return plt

def update(plt, t, ys, tInt, data_length):
    # グラフ処理
    plt.cla()
    color = ["blue","green","red","black", "yellow", "pink", "purple"]
    for i in range(0, data_length - 1):
        plt.plot(t, ys[i], color=color[i], label=str(i))
    plt.xlim(min(t), max(t))
    plt.draw() # グラフを画面に表示開始
    plt.pause(sleepTime)

    return plt
