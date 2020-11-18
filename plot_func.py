import matplotlib.pyplot as plt

sleepTime = 0.0001  # １フレーム表示する時間[s]

def init():
    plt.ion()
    plt.figure()
    plt.ylim(0, 5)
    plt.xlabel("time[s]")
    plt.ylabel("Voltage[V]")

    return plt

def update(plt, t, y, tInt):
    # グラフ処理
    plt.cla()
    plt.plot(t, y)           
    plt.xlim(min(t), max(t))
    plt.draw() # グラフを画面に表示開始
    plt.pause(sleepTime)

    return plt
