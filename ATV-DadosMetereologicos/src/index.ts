import { Meteo } from './models/Meteo';
import * as fs from 'fs';
import * as path from 'path';

// --- 1. LEITURA DO ARQUIVO EXTERNO ---
function readCsvFile(filename: string): string {
    // Caminho: sobe um nível (..) da pasta 'src' para a raiz onde deve estar o arquivo
    const filePath = path.join(__dirname, '..', filename);
    
    try {
        console.log(`Lendo arquivo de: ${filePath}`);
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error(`\nERRO: Não foi possível ler o arquivo "${filename}".`);
        console.error('Verifique se ele está na raiz do projeto e se o nome está correto.\n');
        process.exit(1); // Encerra o programa com erro
    }
}

// --- 2. FUNÇÕES AUXILIARES ---

// Converte formato numérico brasileiro "1018,88" para float "1018.88"
function parseBrFloat(val: string): number {
    if (!val) return 0;
    // Remove espaços, troca vírgula por ponto e converte
    return parseFloat(val.trim().replace(',', '.'));
}

function loadData(csvContent: string): Meteo[] {
    const lines = csvContent.split('\n');
    const data: Meteo[] = [];

    // Ignora a primeira linha (cabeçalho) e linhas vazias
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const cols = line.split(';');
        
        // Validação básica de colunas (Data;Hora;Temp...)
        if (cols.length < 5) continue; 

        try {
            const record = new Meteo(
                cols[0],                // Date
                cols[1],                // Time
                parseBrFloat(cols[2]),  // Temp_C
                parseBrFloat(cols[3]),  // Hum
                parseBrFloat(cols[4]),  // Press_Bar
                parseBrFloat(cols[5]),  // TempCabine
                parseBrFloat(cols[6]),  // Charge
                parseBrFloat(cols[7]),  // SR_Wm2
                parseBrFloat(cols[8]),  // WindPeak
                parseBrFloat(cols[9]),  // WindInst
                parseBrFloat(cols[10]), // WindAvg
                parseBrFloat(cols[11]), // DirInst
                parseBrFloat(cols[12])  // DirAvg
            );
            data.push(record);
        } catch (err) {
            // Ignora linhas com erro de parse
        }
    }
    return data;
}

// --- 3. EXECUÇÃO ---

const CSV_FILENAME = 'dados.csv'; 

const rawContent = readCsvFile(CSV_FILENAME);
const dados = loadData(rawContent);

console.log(`Registros carregados com sucesso: ${dados.length}\n`);

if (dados.length === 0) {
    console.log("Atenção: Nenhum dado foi processado.");
} else {
    // --- Item C: Top 5 Temperaturas ---
    console.log('--- C. Top 5 Dias Mais Quentes ---');
    const sortedByTemp = [...dados].sort((a, b) => b.tempC - a.tempC);
    const tempCorte = sortedByTemp[4] ? sortedByTemp[4].tempC : 0;
    
    const topTemperaturas = sortedByTemp
        .filter(d => d.tempC >= tempCorte)
        .sort((a, b) => {
            // 1º Critério: Maior temperatura vem primeiro
            if (b.tempC !== a.tempC) {
                return b.tempC - a.tempC;
            }
            // 2º Critério (Empate): Data mais antiga vem primeiro
            return a.date.getTime() - b.date.getTime();
        });

    topTemperaturas.forEach((d, i) => {
        console.log(`${i+1}. Data: ${d.dateStr} | Hora: ${d.time} | Temp: ${d.tempC}°C`);
    });

    // --- Item D: Média de todas as temperaturas ---
    console.log('\n--- D. Média Geral de Temperatura ---');
    const somaTemp = dados.reduce((acc, curr) => acc + curr.tempC, 0);
    const mediaTemp = somaTemp / dados.length;
    console.log(`Média: ${mediaTemp.toFixed(2)}°C`);

    // --- Item E: Média geral das médias de vento ---
    console.log('\n--- E. Média Geral de Vento (WindSpeed_Avg) ---');
    const somaVento = dados.reduce((acc, curr) => acc + curr.windSpeedAvg, 0);
    const mediaVento = somaVento / dados.length;
    console.log(`Média: ${mediaVento.toFixed(2)} m/s`);

    // --- Item F: Top 3 Pressões Atmosféricas ---
    console.log('\n--- F. Top 3 Maiores Pressões Atmosféricas ---');
    const sortedByPress = [...dados].sort((a, b) => b.pressure - a.pressure);
    const pressCorte = sortedByPress[2] ? sortedByPress[2].pressure : 0;
    
    const topPressoes = sortedByPress
        .filter(d => d.pressure >= pressCorte)
        .sort((a, b) => {
            // 1º Critério: Maior pressão vem primeiro
            if (b.pressure !== a.pressure) {
                return b.pressure - a.pressure;
            }
            // 2º Critério (Empate): Data mais antiga vem primeiro
            return a.date.getTime() - b.date.getTime();
        });

    topPressoes.forEach((d, i) => {
        console.log(`${i+1}. Data: ${d.dateStr} | Hora: ${d.time} | Pressão: ${d.pressure} bar`);
    });

    // --- Item G: Média geral de umidade ---
    console.log('\n--- G. Média Geral de Umidade ---');
    const somaHum = dados.reduce((acc, curr) => acc + curr.humidity, 0);
    const mediaHum = somaHum / dados.length;
    console.log(`Média: ${mediaHum.toFixed(2)}%`);
}