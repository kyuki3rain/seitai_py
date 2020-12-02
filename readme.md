Google Chromeが必須

１．Python3系がコマンドから動かせるようにする
任意のpythonを入れる
環境変数を入れる
pip install pyenv-win --target "$HOME\.pyenv"

brew install pyenv


２．ライブラリインストール
- numpy
- eel
- matplotlib
- pyserial

conda install -c bioconda python-eel

python -m pipenv install numpy matplotlib eel pyserial
でインストール

３．実行
python app.pyで実行できる気がする



https://qiita.com/inoory/items/f431c581332c8d500a3b
https://qiita.com/macinjoke/items/13aa9ba64cf9b688e74a
https://qiita.com/hausen6/items/b1b54f7325745ae43e47