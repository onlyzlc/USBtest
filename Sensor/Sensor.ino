#define LED 13
#define PIN_ECHO 2
#define PIN_TRIG 4

void setup() {
  Serial.begin(9600);
  // Serial.print("ok\n");

  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  pinMode(LED, OUTPUT);
  // Turn it off for now.
  digitalWrite(LED, LOW);


  //输出引脚设置为低电平
  digitalWrite(PIN_TRIG,LOW);
}

int incomingByte = 0;
// int distance = 0;
void loop() {
  // Check if there's a serial message waiting.
  if (Serial.available() > 0) {
    // If there is, read the incoming byte.
    incomingByte = Serial.read();
    if (incomingByte == 'o') {
      digitalWrite(LED, HIGH);
      Serial.println(collection());
    } else{
      digitalWrite(LED, LOW);
    }
    // Serial.println(incomingByte);
  }

}

int collection(){
  //等待2两秒
  delay(2000);   

  //输出方波信号
  digitalWrite(PIN_TRIG,HIGH);
  delay(20);
  digitalWrite(PIN_TRIG,LOW);

  //计算距离
  //计算时长:读取高电平脉冲时长
  int duration = pulseIn(PIN_ECHO, HIGH);
  int distance = duration * 340.4 / 2000;

  return distance;
}
