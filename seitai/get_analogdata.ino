int analogPin=A0;
int data1 = 0;
int data2 = 0;
int data3 = 0;
int data4 = 0;
int data5 = 0;
unsigned long time;
unsigned int val0;

void setup() {
    Serial.begin(9600);
}

int get_data(int pin){
  int data;
//  data = analogRead(pin);
  data = random(0, 1023);
  return data;
}

void loop() {
    time = micros();
    data1 = get_data(A0);
//    data2 = get_data(A1);
//    data3 = get_data(A2);
//    data4 = get_data(A3);
//    data5 = get_data(A4);
    Serial.print(time);
    Serial.print(" ");
    Serial.print(data1);
//    Serial.print(" ");
//    Serial.print(data2);
//    Serial.print(" ");
//    Serial.print(data3);
//    Serial.print(" ");
//    Serial.print(data4);
//    Serial.print(" ");
//    Serial.print(data5);
    Serial.print("\n");
    delay(100);
}
