#include <Servo.h>

Servo myservo;  // create servo object to control a servo

int val;    // variable to read the value from the analog pin

void setup() {
  myservo.attach(12);  // attaches the servo on pin 9 to the servo object
}

void loop() {
  val = 60;    // scale it to use it with the servo (value between 0 and 180)
  myservo.write(val);   
  delay(500); 
  val =   120;
  myservo.write(val);
  delay(500);
}
