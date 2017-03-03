#include <SPI.h>
#include <RFID.h>

#define PIN_LED7 7
#define PIN_LED8 8
RFID RFID(10,9);

int UID[5];

void setup()
{
  Serial.begin(9600);
  SPI.begin();
  RFID.init();
  pinMode(PIN_LED7, OUTPUT);
  pinMode(PIN_LED8, OUTPUT);

}

void loop()
{
    
    if(RFID.isCard())
    {     
          // Serial.println(PIN_LED7);
          // Serial.println(PIN_LED8);
          //Serial.println("Carte RFID detectee.");
          if (RFID.readCardSerial())
          {
            //Serial.print("L'UID est: ");
            UID[0]=RFID.serNum[0];
            
            if(UID[0]==8)
            {
              if(digitalRead(PIN_LED8) == HIGH)
              {
                digitalWrite(PIN_LED8, LOW);
                Serial.print(80,DEC);
                delay(2000);
              }
              else
              {
                digitalWrite(PIN_LED8, HIGH);
                Serial.print(81,DEC);
                delay(2000);
              }
              //Serial.print(UID[0],DEC);
            }
            if(UID[0]==195)
            {
              if(digitalRead(PIN_LED7) == HIGH)
              {
                digitalWrite(PIN_LED7, LOW);
                Serial.print(70,DEC);
                delay(2000);
              }
              else
              {
                digitalWrite(PIN_LED7, HIGH);
                Serial.print(71,DEC);
                delay(2000);
              }
              // Serial.print(UID[0],DEC);
            }
            /*for(int i=0;i<=4;i++)
            {
              UID[i]=RFID.serNum[i];
              Serial.print(UID[i],DEC);
              if(i<4)
              {
                Serial.print(".");
              }
            }*/
            Serial.println("");
          }
          RFID.halt();
    }
  /*digitalWrite(PIN_LED7, LOW);
  digitalWrite(PIN_LED8, LOW);*/
  
}

// L'UID est: 195.74.7.237.99.
// L'UID du smartphone commence par 8.

