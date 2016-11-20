#define sensorPin A0
float proxValue = 0;
float const SCALAR = 1;

void setup() {
  Serial.begin(115200);
  pinMode(sensorPin, INPUT);
  Serial.println("Starting");
  Serial.println("Now printing distance in cm");
}

void loop() {
  proxValue = analogRead(A0);
  if (proxValue >= 280 && proxValue <= 512) {
    Serial.print(analogToCM(proxValue));
    Serial.println("cm");
  delay(1000);
  }
}

float analogToCM(float read) {
  return 2850 / (proxValue - 229.5);
}
