function convertTemperature() {

    const input = document.getElementById("temperature").value.trim();
    const unit = document.getElementById("unit").value;

    const error = document.getElementById("error");

    const celsius = document.getElementById("celsius");
    const fahrenheit = document.getElementById("fahrenheit");
    const kelvin = document.getElementById("kelvin");

    error.textContent = "";

    if (input === "") {

        error.textContent = "Please enter a temperature.";

        reset();

        return;
    }

    if (isNaN(input)) {

        error.textContent = "Only numeric values are allowed.";

        reset();

        return;
    }

    let value = parseFloat(input);

    let c;

    if (unit === "c") {

        if (value < -273.15) {

            error.textContent = "Temperature cannot be below absolute zero (-273.15°C).";

            reset();

            return;
        }

        c = value;
    }

    else if (unit === "f") {

        if (value < -459.67) {

            error.textContent = "Temperature cannot be below absolute zero (-459.67°F).";

            reset();

            return;
        }

        c = (value - 32) * 5 / 9;
    }

    else {

        if (value < 0) {

            error.textContent = "Temperature cannot be below absolute zero (0 K).";

            reset();

            return;
        }

        c = value - 273.15;
    }

    const f = (c * 9 / 5) + 32;
    const k = c + 273.15;

    celsius.textContent = `${c.toFixed(2)} °C`;
    fahrenheit.textContent = `${f.toFixed(2)} °F`;
    kelvin.textContent = `${k.toFixed(2)} K`;

}

function reset() {

    document.getElementById("celsius").textContent = "--";
    document.getElementById("fahrenheit").textContent = "--";
    document.getElementById("kelvin").textContent = "--";

}