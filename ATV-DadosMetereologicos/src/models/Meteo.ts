export class Meteo {
    date: Date;             // Objeto Date para ordenação correta
    dateStr: string;        // String original para exibição
    time: string;
    tempC: number;          // Temp_C
    humidity: number;       // Hum_%
    pressure: number;       // Press_Bar
    tempCabineC: number;    // TempCabine_C
    charge: number;         // Charge
    srWm2: number;          // SR_Wm2
    windPeakMs: number;     // WindPeak_ms
    windSpeedInst: number;  // WindSpeed_Inst
    windSpeedAvg: number;   // WindSpeed_Avg
    windDirInst: number;    // WindDir_Inst
    windDirAvg: number;     // WindDir_Avg

    constructor(
        date: string,
        time: string,
        tempC: number,
        humidity: number,
        pressure: number,
        tempCabineC: number,
        charge: number,
        srWm2: number,
        windPeakMs: number,
        windSpeedInst: number,
        windSpeedAvg: number,
        windDirInst: number,
        windDirAvg: number
    ) {
        this.dateStr = date;
        this.time = time;
        this.tempC = tempC;
        this.humidity = humidity;
        this.pressure = pressure;
        this.tempCabineC = tempCabineC;
        this.charge = charge;
        this.srWm2 = srWm2;
        this.windPeakMs = windPeakMs;
        this.windSpeedInst = windSpeedInst;
        this.windSpeedAvg = windSpeedAvg;
        this.windDirInst = windDirInst;
        this.windDirAvg = windDirAvg;

        // Converter string DD/MM/YYYY para Objeto Date do JavaScript
        // Importante: O Mês em JS começa em 0 (Janeiro = 0)
        const parts = date.split('/');
        if (parts.length === 3) {
            this.date = new Date(
                parseInt(parts[2]),      // Ano
                parseInt(parts[1]) - 1,  // Mês
                parseInt(parts[0])       // Dia
            );
        } else {
            this.date = new Date();
        }
    }
}