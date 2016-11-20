const int Lin = 10, Rin = 12, Lout = 11, Rout = 13;
int threshold=20;
long Rduration, Lduration, Rinches, Linches;

void setup() {
 
pinMode(7, OUTPUT);  //define 13 pin as output
}

void loop() {
  
readUltra();
digitalWrite(13, HIGH);   // laser

}

void readUltra(){

  pinMode(Rout, OUTPUT);
  digitalWrite(Rout, LOW);
  delayMicroseconds(2);
  digitalWrite(Rout, HIGH);
  delayMicroseconds(5);
  digitalWrite(Rout, LOW);
 pinMode(Rin, INPUT);

  Rduration = pulseIn(Rin, HIGH);
  
  pinMode(Lout, OUTPUT);
  digitalWrite(Lout, LOW);
  delayMicroseconds(2);
  digitalWrite(Lout, HIGH);
  delayMicroseconds(5);
  digitalWrite(Lout, LOW);
 pinMode(Lin, INPUT);

  Lduration = pulseIn(Lin, HIGH);


  Rinches = Rduration / 74 / 2 ;
  Linches = Lduration / 74 / 2;
}
