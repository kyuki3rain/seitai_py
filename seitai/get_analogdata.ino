#define DATA_LENGTH 1

int data[DATA_LENGTH];
bool dig_data[DATA_LENGTH];
int analogPins[] = { A0, A1, A2, A3, A4, A5, A6 }
int digitalPins[] = { 9, 10, 11, 12, 13, 14, 15 }
unsigned long time;
int i = 0;

void setup() {
    Serial.begin(9600);
    pinMode(bool_pin, INPUT);
}

int get_analog_data(int pin){
  int data;
  data = analogRead(pin);
  // data = random(0, 1023);
  return data;
}

int get_bool(int pin){
  bool f = digitalRead(pin);
  Serial.print(" ");
  Serial.print(f);
}

void loop() {
    time = micros();
    for(i = 0; i < DATA_LENGTH; i++){
      data[i] = get_analog_data(analogPins[i]);
      // dig_data[i] = get_bool(digitalPins[i]); // サンプルデータ取得時のみコメントアウト
    }
    Serial.print(time);
    for(i = 0; i < DATA_LENGTH; i++){
      Serial.print(" ");
      Serial.print(data[i]);
    }
    // for(i = 0; i < DATA_LENGTH; i++){ // サンプルデータ取得時のみコメントアウト
    //   Serial.print(" ");
    //   Serial.print(dig_data[i]);
    // }
    Serial.print("\n");
    delay(100);
}
