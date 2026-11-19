# Day 24 · The Grand Christmas Invention!

![A finished cardboard invention with a button and glowing lights](../images/experiments/day-24.svg){ .activity-illustration }

**Field:** Engineering · Programming · Electronics  
**Time:** 40–60 minutes (Thursday 24 December 2026)  
**Age group:** 6–9  
**Progression:** We have learned about circuits, switches, Arduino code and light signals. Today we combine them in a **Christmas Signal Station**: press a button and two LEDs blink **your child's name** in Morse code.

## Introduction

Can you build an invention that sends a message when someone presses a button? Mount two LEDs in a cardboard Christmas scene, connect a pushbutton and Arduino, then upload a program that blinks the child's name when the button is pressed.

By the end of this mission, the child can:

- Combine an input, a program and light outputs in one invention.
- Build a cardboard display around a low-voltage circuit without enclosing the electronics.
- Explain how the button starts a coded light message.

**The big question:** How do the button, program and LEDs work together to send a message?

## Shopping list

Reuse the Arduino Uno and most circuit parts from Days 17–20.

| Item | Amount needed | Notes |
| --- | --- | --- |
| Green or other colour 5 mm LED | 1 | Second signal light; reuse the red LED from Day 17 as the first. |
| 220-ohm resistor | 1 | One resistor in series with each external LED. Reuse Day 17's resistor for its LED. |
| Recycled cardboard panel | 1, about 10 × 15 cm | Use the Day 23 prototype or clean packaging. |
| Printed Day 24 mission card | 1 folded card | Ordinary paper is fine. |

**Household items supplied separately:** Arduino Uno, USB data cable and computer with Arduino IDE; mini breadboard, pushbutton and jumper wires from Day 20; red LED and 220-ohm resistor from Day 17; cardboard, pencil, tape and adult-handled scissors. Do not use the AA battery holder for this Arduino circuit.

## What's inside the 7 × 7 × 7 cm box?

- [ ] **One second LED** in a different colour.
- [ ] **One 220-ohm resistor** for the second LED.
- [ ] **One folded Day 24 mission card** (below).

**Packing:** Place the LED and resistor in a small parts packet with the folded card. Bring the Arduino, button, breadboard, saved LED parts, USB cable and cardboard separately; the Uno does not fit in the advent box.

## Child's mission card

<div class="mission-card" markdown="1">
<div class="mission-card__translation" lang="en" data-language-label="English" markdown="1">

!!! example "🎄 DAY 24 — THE GRAND CHRISTMAS INVENTION!"
    **Your mission:** Build a Christmas Signal Station that sends **your name** when you press its button!

    **You need:** Your Arduino, button, breadboard, two LEDs, two resistors, jumper wires, cardboard and a grown-up.

    **1. Plan!** Use your Day 23 design. Where will the lights shine? Can someone reach the button?

    **2. Build!** Ask your grown-up to connect the button to pin 2 and GND, and the LEDs to pins 8 and 9 through resistors. Keep the Arduino and breadboard outside the cardboard cover.

    **3. Program!** Upload the name program. Press the button. Watch the lights send each letter in turn.

    **4. Improve!** Can your receiver read the message? Adjust the display or the flash timing with your grown-up.

    ⭐ **Inventor's question:** How do the button and program work together to spell your name?

</div>

<div class="mission-card__translation" lang="sv" data-language-label="Svenska" markdown="1">

!!! example "🎄 DAG 24 — DEN STORA JULUPPFINNINGEN!"
    **Ditt uppdrag:** Bygg en julig signalstation som skickar **ditt namn** när du trycker på knappen!

    **Du behöver:** Arduino-kortet, knappen, kopplingsplattan, två LED-lampor, två motstånd, sladdar, kartong och en vuxen.

    **1. Planera!** Använd din design från dag 23. Vart ska lamporna lysa? Kan någon nå knappen?

    **2. Bygg!** Be en vuxen koppla knappen till pinne 2 och GND, och LED-lamporna till pinnarna 8 och 9 genom motstånd. Ha Arduino-kortet och kopplingsplattan utanför kartonghöljet.

    **3. Programmera!** Ladda upp namn-programmet. Tryck på knappen. Se lamporna blinka varje bokstav i turordning.

    **4. Förbättra!** Kan mottagaren läsa meddelandet? Ändra displayen eller blinktiden tillsammans med en vuxen.

    ⭐ **Uppfinnarens fråga:** Hur samarbetar knappen och programmet för att stava ditt namn?

</div>
</div>

## Adult instructions

### Preparation (5–10 minutes before the activity)

1. Bring out the Arduino Uno, USB data cable, computer, breadboard and pushbutton from Day 20, and the red LED/resistor assembly from Day 17. Keep the AA battery holder disconnected and out of the Arduino circuit.
2. Connect the second LED in series with its **own 220-ohm resistor**. An adult should check each resistor-to-LED connection before power is applied.
3. Build the circuit with the Uno unplugged:
   - Connect **GND** from the Uno to the breadboard's ground rail.
   - Connect the pushbutton across the breadboard's centre gap, with one side to **digital pin 2** and the other to **GND**.
   - Connect the first LED's resistor side to **digital pin 8** and its short leg to **GND**.
   - Connect the second LED's resistor side to **digital pin 9** and its short leg to **GND**.
4. Set `NAME` in the program to your child's name using ASCII letters A–Z. Uppercase and lowercase both work; other characters are ignored.
5. Test the program before mounting the LEDs in the cardboard. An adult cuts any LED holes. Leave the Arduino, breadboard and connections uncovered and accessible on a stable surface.

### How to help (40–60 minutes total)

| Time | What to do |
| --- | --- |
| 0–5 min | Revisit the Day 23 plan and Day 22 Morse pattern. Agree on where the display and button will go. |
| 5–15 min | With USB disconnected, build and check the button and two LED circuits. Confirm that each LED has its own 220-ohm resistor and both share GND. |
| 15–25 min | Connect the Uno to the computer by USB, open the sketch below and upload it. The adult checks the board, port and wiring. |
| 25–40 min | Press the button to send your child's name. Let the child observe and decode the pattern. Mount the LEDs in the cardboard and position the button so it can be reached. |
| 40–55 min | Test the finished display from the receiver's position. Adjust the light openings or flash timing if needed. |
| 55–60 min | Disconnect USB, collect loose parts and celebrate the working signal station. |

```cpp
const int buttonPin = 2;
const int firstLedPin = 8;
const int secondLedPin = 9;
const int dotTime = 200;

const char *morse_table[] = {
  ".-", // A
  "-...", // B
  "-.-.", // C
  "-..", // D
  ".", // E
  "..-.", // F
  "--.", // G
  "....", // H
  "..", // I
  ".---", // J
  "-.-", // K
  ".-..", // L
  "--", // M
  "-.", // N
  "---", // O
  ".--.", // P
  "--.-", // Q
  ".-.", // R
  "...", // S
  "-", // T
  "..-", // U
  "...-", // V
  ".--", // W
  "-..-", // X
  "-.--", // Y
  "--.." // Z
};

const char *NAME = "";

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(firstLedPin, OUTPUT);
  pinMode(secondLedPin, OUTPUT);
}

void loop() {
  if (digitalRead(buttonPin) == LOW) {
    sendName();
    while (digitalRead(buttonPin) == LOW) {
    }
    delay(50);
  }
}

void flashSignal(int onTime) {
  digitalWrite(firstLedPin, HIGH);
  digitalWrite(secondLedPin, HIGH);
  delay(onTime);
  digitalWrite(firstLedPin, LOW);
  digitalWrite(secondLedPin, LOW);
  delay(dotTime);
}

void sendMorseLetter(const char* code) {
  for (int symbolIndex = 0; code[symbolIndex] != '\0'; symbolIndex++) {
    if (code[symbolIndex] == '.') {
      flashSignal(dotTime);
    } else {
      flashSignal(dotTime * 3);
    }
  }
}

void sendName() {
  char letter = 0;
  int letter_idx = 0;

  while ((letter = NAME[letter_idx++]) != '\0') {
    // toUpper
    if (letter >= 'a' && letter <= 'z') {
      letter -= 'a' - 'A';
    }
    // Alphabetical only
    if (letter < 'A' || letter > 'Z') {
      continue;
    }
    letter -= 'A';
    sendMorseLetter(morse_table[letter]);
    delay(dotTime * 2);
  }
  delay(dotTime * 6);
}
```

**Keep it a fair test:** Test the circuit before placing it in the display. If a light fails, change one connection at a time with USB unplugged. Keep the flash timing the same while testing the display's visibility.

### Safety

- An adult should check all wiring with USB disconnected. Use only the Arduino's USB connection; do not connect the AA holder, mains electricity or an external power supply.
- Every external LED must have its own **220-ohm resistor in series**. Never connect an LED directly between an Arduino pin and GND.
- Keep drinks and wet materials away from the computer, board and breadboard. Disconnect USB before moving wires or changing the circuit.
- Do not cover or enclose the Arduino, breadboard or USB connection in cardboard. Keep small parts, scissors and tape away from younger children and pets.
- Point the signal toward a nearby wall or receiver, never into eyes or toward roads. This is a learning project, not an emergency signal device.

### Why it works

The pushbutton is an input connected to pin 2. With `INPUT_PULLUP`, the input reads `HIGH` when the button is open and `LOW` when the button connects the pin to GND. When the program detects `LOW`, it calls `sendName()`.

The two LEDs are outputs on pins 8 and 9. The program turns them on together for a short duration (a dot) or a longer duration (a dash), with pauses between flashes and letters. The 220-ohm resistors limit current through each LED. The cardboard scene holds the display, while the Arduino and breadboard remain open and accessible.

### Troubleshooting and optional extension

- **Neither LED lights:** Disconnect USB. Check GND, button wiring, LED polarity and pin numbers. Confirm each LED is in series with its own 220-ohm resistor.
- **One LED stays off:** With USB disconnected, check that its short leg reaches GND and its resistor connects toward the correct output pin.
- **The message repeats while the button is held:** The sketch waits for the button to be released after one message. Check the button is connected between pin 2 and GND and straddles the breadboard gap.
- **The button does not start the message:** Check the pin 2 and GND connections and confirm the code uses `INPUT_PULLUP` and tests for `LOW`.
- **The cardboard hides the lights or presses the button:** Move the LEDs and button to accessible positions. Keep the electronics outside the display.
- **Extra challenge for older children:** Change `NAME` to another word using the Day 22 Morse key. Predict the light pattern.

**Next experiment:** The calendar's final invention is complete. Keep the signal station as a reminder that small observations and ideas can grow into something you build.

[← Back to the calendar](../index.md) · [← Day 23: Design Your Christmas Invention](day-23.md)